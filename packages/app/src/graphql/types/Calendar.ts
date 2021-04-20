import { Field, ObjectType, Int } from "type-graphql";
import { ICompany } from "../../db/Companies.store.example";
import { ICalendar } from "../../db/stores/Calendar.store";

@ObjectType()
export class Calendar implements ICalendar {
  @Field((type) => [User])
  users!: { username: string; times: { start: string; end: string }[] }[];

  created!: FirebaseFirestore.Timestamp;

  @Field((type) => [TimeEntry])
  calculated?: TimeEntry[];
}

@ObjectType()
export class User {
  @Field((type) => String, { nullable: false })
  username!: string;

  @Field((type) => [TimeEntry], { nullable: false })
  times!: TimeEntry[];
}

@ObjectType()
export class TimeEntry {
  @Field((type) => String, { nullable: false })
  start!: string;
  @Field((type) => String, { nullable: false })
  end!: string;
}
