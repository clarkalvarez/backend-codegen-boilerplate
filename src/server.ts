import { loadFiles } from "@graphql-tools/load-files";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { DocumentNode } from "graphql";

// import resolvers
import { resolvers } from "./resolvers";

// import schema
const startup = async () => {
  const typeDefs = (await loadFiles(
    "src/**/*.schema.graphql"
  )) as DocumentNode[];

  // instantiate the apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,

    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  // start the graphql server
  server
    .listen()
    .then(({ url }) => {
      // console.log(`Server ready at ${url}`);
    })
    .catch((e) => {
      throw new Error(e);
    });
};

startup();
