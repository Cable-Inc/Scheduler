import { ApolloError } from "apollo-server-errors";
import { firestore } from "firebase-admin";
import { add, collection, field, get, update } from "typesaurus";
import { useFirestore } from "../useFirestore";

export interface ICalendar {
  created: firestore.Timestamp;
  users: User[];
}

export interface User {
  username: string;
  times: { start: string; end: string }[];
}

useFirestore();
const calendarCollection = collection<ICalendar>("calendars");

export const CalendarModel = {
  createCalendar: async (): Promise<string> => {
    const ref = await add(calendarCollection, { created: firestore.Timestamp.now(), users: [] });
    return ref.id;
  },
  getCalendar: async (id: string): Promise<ICalendar> => {
    const ref = await get(calendarCollection, id);
    if (!ref) {
      throw new ApolloError("Calendar does not exist.");
    }
    return ref?.data;
  },
  addUserIfNotExists: async (id: string, username: string): Promise<ICalendar> => {
    const calendar = await CalendarModel.getCalendar(id);
    const users = calendar.users;
    if (users.find((u) => u.username === username)) {
      return calendar;
    }
    users.push({
      username,
      times: [],
    });
    await update(calendarCollection, id, [field("users", users)]);
    return calendar;
  },
  updateUser: async (id: string, username: string, newTimes: [string, string][]): Promise<ICalendar> => {
    const calendar = await CalendarModel.addUserIfNotExists(id, username);
    const userArray = calendar.users;
    const userToUpdate = userArray.find((u) => u.username === username);
    if (!userToUpdate) {
      throw new ApolloError("User does not exist");
    }

    const transformedTimes = newTimes.map((t) => ({ start: t[0], end: t[1] }));
    userToUpdate.times = transformedTimes;

    await update(calendarCollection, id, [field("users", userArray)]);
    return calendar;
  },
};

export default CalendarModel;
