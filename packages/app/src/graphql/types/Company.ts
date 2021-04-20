import { Field, ObjectType, Int } from "type-graphql";
import { ICompany } from "../../db/Companies.store.example";

@ObjectType()
export class Company implements ICompany {
  @Field((type) => String)
  name!: string;

  @Field((type) => Int)
  employee_count!: number;
}
