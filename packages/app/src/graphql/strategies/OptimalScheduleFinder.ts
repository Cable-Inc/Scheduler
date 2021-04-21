import { TimeEntry, User } from "../types/Calendar";
import { addDays, addMinutes, differenceInMinutes, formatISO9075 } from "date-fns";

const START_REFERENCE = new Date("2019-2-4 00:00");

export default class OptimalScheduleFinder {
  private users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  solve(): TimeEntry[] {
    const solution: TimeEntry[] = [];

    const { overlaps, max } = this.findOverlaps();

    for (let dayIdx = 0; dayIdx < overlaps.length; dayIdx++) {
      const day = overlaps[dayIdx];
      let isInterval = false;
      let startDate: Date = new Date();
      for (let slotIdx = 0; slotIdx < day.length; slotIdx++) {
        const slot = day[slotIdx];
        const isMax = slot === max;
        if (isInterval) {
          // in an interval, and still will be
          if (isMax && slotIdx + 1 !== day.length) continue;
          // the max interval is over
          isInterval = false;
          const endDate = this.dateFromIndex(dayIdx, slotIdx);
          solution.push({ start: this.timeFormat(startDate), end: this.timeFormat(endDate) });
          continue;
        }
        // not an interval
        if (isMax) {
          // begin an interval
          isInterval = true;
          startDate = this.dateFromIndex(dayIdx, slotIdx);
          continue;
        }
      }
    }
    return solution;
  }

  private dateFromIndex(day: number, slot: number): Date {
    const date = new Date(START_REFERENCE);
    const addedDays = addDays(date, day);
    const addedMins = addMinutes(addedDays, slot * 30);
    return addedMins;
  }

  private timeFormat(date: Date) {
    return formatISO9075(date);
  }

  private findOverlaps(): { overlaps: number[][]; max: number } {
    const overlaps = this.allocateSolutionSpace();
    const userParts = this.users.map((u) => this.normalize(u));
    let max = 0;
    for (let day = 0; day < overlaps.length; day++) {
      for (let slot = 0; slot < overlaps[0].length; slot++) {
        const sum = userParts.reduce((a, u) => a + u[day][slot], 0);
        overlaps[day][slot] = sum;
        max = Math.max(max, sum);
      }
    }
    return { overlaps, max };
  }

  private normalize(user: User): number[][] {
    const form = this.allocateSolutionSpace();
    const times = user.times.map((t) => [new Date(t.start), new Date(t.end)]);
    for (const [start, end] of times) {
      const startMin = this.minuteDeltaFromRef(start);
      const endMin = this.minuteDeltaFromRef(end);

      const startFill = startMin / 30;
      const endFill = endMin / 30;

      const startIndices = this.lin2sub(startFill);
      const endIndices = this.lin2sub(endFill);

      const dayArray = form[startIndices[0]];
      for (let i = startIndices[1]; i < endIndices[1]; i++) {
        dayArray[i] = 1;
      }
    }
    return form;
  }

  private lin2sub(linearIndex: number): [number, number] {
    const day = ~~(linearIndex / 48);
    const slot = linearIndex % 48;
    return [day, slot];
  }

  private minuteDeltaFromRef(date: Date): number {
    const delta = differenceInMinutes(date, START_REFERENCE);
    return delta;
  }

  private allocateSolutionSpace(): number[][] {
    const format = [];
    for (let i = 0; i < 7; ++i) {
      const subarray = [];
      for (let j = 0; j < 48; ++j) {
        subarray.push(0);
      }
      format.push(subarray);
    }
    return format;
  }
}
