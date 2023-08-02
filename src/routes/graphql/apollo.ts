import http from 'node:http';
import { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { ENV_PROD } from '../../constants';

import path from 'path';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';

export const typeDefs = readFileSync(
  path.resolve(__dirname, './typeDefs.gql'),
  {
    encoding: 'utf-8',
  },
);

export async function getApolloServer(app: Application) {
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.ENV !== ENV_PROD ? true : false,
  });
  await apolloServer.start();
  return apolloServer;
}
