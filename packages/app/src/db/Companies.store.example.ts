import { collection, query, where } from "typesaurus";
import { useFirestore } from "./useFirestore";

export interface ICompany {
  name: string;
  employee_count: number;
}

useFirestore();
const companyCollection = collection<ICompany>("companies");

async function getUser(companyName: string): Promise<ICompany | null> {
  const result = await query(companyCollection, [where("name", "==", companyName)]);
  if (result.length == 0) {
    console.log("No such document!");
    return null;
  }
  return result[0].data;
}

export const CompanyModel = {
  getUser,
};

export default CompanyModel;
