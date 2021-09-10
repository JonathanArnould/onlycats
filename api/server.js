import express from 'express';
import expressGraphQl from 'express-graphql';
import graphqQl from 'graphql';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'

import * as catResolver from './resolvers/cats-resolvers.js'

const schema = graphqQl.buildSchema(`
  type Coordinates {
    longitude: Float!
    latitude: Float!
  }
  
  input InputCoordinates {
    longitude: Float!
    latitude: Float!
  }

  input CatInput {
    name: String!
    breed: String!
    category: String!
    city: String!
    file: String!
    coordinates: InputCoordinates!
    description: String!
  }

  input CatFavorite {
    id: String!
  }

  type Cat {
    _id: ID!
    url: String!
    name: String!
    city: String!
    breed: String!
    category: String!
    isFavorite: Boolean!
    coordinates: Coordinates!
    createdAt: String!
    description: String!
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
app.use(bodyParser.json({
  limit: '50mb'
}));

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



