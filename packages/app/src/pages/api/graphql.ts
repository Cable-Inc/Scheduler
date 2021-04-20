import { ApolloServer } from "apollo-server-micro";
import { buildSchemaSync, buildTypeDefsAndResolvers } from "type-graphql";
import "reflect-metadata";
import TestResolver from "../../graphql/resolvers/TestResolver";
import CalendarResolver from "../../graphql/resolvers/CalendarResolver";

export const appSchema = buildSchemaSync({
  validate: false,
  resolvers: [TestResolver, CalendarResolver],
});

const apolloServer = new ApolloServer({
  playground: true,
  schema: appSchema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
