import { ApolloServer } from "@apollo/server";
import { UserModule } from "./user/index.js";

export async function createAppoloGqlServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql 

        type Query {
            ${UserModule.queries}
           
        }
      
        type Mutation {
            ${UserModule.mutations}
            
        }
        `,

    resolvers: {
      //resolver for query
      Query: {
        ...UserModule.resolvers.queries,
      },

      //resolver for mutation

      Mutation: {
        ...UserModule.resolvers.mutations,
      },
    },

  });

  await server.start();

  return server;
}
