import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express, {Application} from 'express';
import {ApolloServer} from 'apollo-server-express'
import { connectDatabase } from './database';
import {typeDefs, resolvers } from "./graphql"
import { Console } from 'console';




const mount = async (app: Application) => {
const db = await connectDatabase();
const server = new ApolloServer({typeDefs, resolvers, context: () => ({ db }), plugins: [ApolloServerPluginLandingPageGraphQLPlayground],});

server.start().then(() => {server.applyMiddleware({ app, path: '/api' })
    app.listen(process.env.PORT);
    console.log(`[app]: http://localhost:${process.env.PORT}`)});
    
    const listings = await db.listings.find({}).toArray(); 
    console.log(listings);
    
};

mount(express());
