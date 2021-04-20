import "reflect-metadata";
import { Arg, ArgsType, Field, Query, Resolver } from "type-graphql";
import { Company } from "../types/Company";
import CompanyModel, { ICompany } from "../../db/Companies.store.example";

@Resolver()
export default class TestResolver {
  @Query(() => String)
  async ping(): Promise<string> {
    return "GraphQL Server Pinged 🚀!";
  }

  @Query(() => Number)
  async randomNumber(): Promise<number> {
    return ~~(Math.random() * 10);
  }

  @Query((returns) => Company, { nullable: true })
  async getCompanyFromName(@Arg("companyName", () => String) companyName: string): Promise<ICompany | null> {
    const company = await CompanyModel.getUser(companyName);
    return company;
  }
}
