import { graphql } from "graphql";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import CalendarResolver from "../../graphql/resolvers/CalendarResolver";
import TestResolver from "../../graphql/resolvers/TestResolver";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (arg0: NextApiRequest, arg1: NextApiResponse, arg2: (result: any) => void) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const appSchema = buildSchemaSync({
  validate: false,
  resolvers: [TestResolver, CalendarResolver],
});

const gqlServer: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors);

  const query = req.body.query;
  const params = req.body.variables;
  const response = await graphql(appSchema, query, null, null, params);
  return res.status(200).json(response);
};

export default gqlServer;

// const apolloServer = new ApolloServer({
//   playground: true,
//   schema: appSchema,
// })

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default apolloServer.createHandler({ path: "/api/graphql" });
