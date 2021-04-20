import { printSchema } from "graphql";
import { appSchema } from "../src/pages/api/graphql";
import { writeFileSync } from "fs";

const schema = printSchema(appSchema);
writeFileSync("./src/graphql/schema.gql", schema);
