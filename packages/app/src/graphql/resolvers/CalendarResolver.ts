import "reflect-metadata";
import { Arg, Args, ArgsType, Field, ID, Mutation, Query, Resolver } from "type-graphql";
import CalendarModel, { ICalendar } from "../../db/stores/Calendar.store";
import OptimalScheduleFinder from "../strategies/OptimalScheduleFinder";
import { Calendar, TimeEntry } from "../types/Calendar";

@ArgsType()
class NewCalendarUserArgs {
  @Field((type) => String, { nullable: false })
  id!: string;

  @Field((type) => String, { nullable: false })
  username!: string;
}

@ArgsType()
class UpdateUserArgs {
  @Field((type) => String, { nullable: false })
  id!: string;

  @Field((type) => String, { nullable: false })
  username!: string;

  @Field((type) => [[String]], { nullable: false })
  times!: [string, string][];
}

@Resolver(Calendar)
export default class CalendarResolver {
  @Mutation(() => ID)
  async newCalendar(): Promise<string> {
    const id = await CalendarModel.createCalendar();
    return id;
  }

  @Mutation(() => Calendar)
  async newCalendarUser(@Args(() => NewCalendarUserArgs) args: NewCalendarUserArgs): Promise<ICalendar> {
    return await CalendarModel.addUserIfNotExists(args.id, args.username);
  }

  @Mutation(() => Calendar)
  async updateCalendarUser(@Args(() => UpdateUserArgs) { id, times, username }: UpdateUserArgs): Promise<ICalendar> {
    return await CalendarModel.updateUser(id, username, times);
  }

  @Query((Type) => Calendar)
  async getCalendar(@Arg("id", () => String, { nullable: false }) id: string): Promise<ICalendar> {
    const calendar = await CalendarModel.getCalendar(id);
    return calendar;
  }

  @Query((Type) => [TimeEntry])
  async getOptimalTime(@Arg("id", () => String) id: string): Promise<TimeEntry[]> {
    const calendar = await CalendarModel.getCalendar(id);
    const users = calendar.users;
    const scheduleFinder = new OptimalScheduleFinder(users);
    const schedules = scheduleFinder.solve();

    return schedules;
  }

  @Query((Type) => [String])
  async getCalendarContributors(@Arg("id", () => String) id: string): Promise<string[]> {
    const calendar = await CalendarModel.getCalendar(id);
    const users = calendar.users;
    return users.map((u) => u.username);
  }
}
