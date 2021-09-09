import express from 'express';
import expressGraphQl from 'express-graphql';
import graphqQl from 'graphql';
import mongoose from 'mongoose';
import cors from 'cors';

import * as catResolver from './resolvers/cats-resolvers.js'

const schema = graphqQl.buildSchema(`
  type Coordinates {
    longitude: String!
    latitude: String!
  }

  input CatInput {
    name: String!
    file: String!
    address: String!
  }

  input CatFavorite {
    id: String!
  }

  type Cat {
    _id: ID!
    url: String!
    name: String!
    isFavorite: Boolean
    coordinates: Coordinates!
    createdAt: String!
  }

  type Query {
    getCats(limit: Int): [Cat!]
  }
  type Mutation {
    createCat(cat: CatInput): Cat
    addToFavorites(fav: CatFavorite): Cat
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);


const app = express();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.a4at6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(cors())
app.use('/graphql', expressGraphQl.graphqlHTTP({
  schema: schema,
  rootValue: catResolver,
  graphiql: true,
}));

async function startServer() {
  try {
    await mongoose.connect(uri, options)
    app.listen(4000, console.log('Running a GraphQL API server at http://localhost:4000/graphql'));

  } catch (error) {
    throw new Error(error)

  }
}

startServer()



