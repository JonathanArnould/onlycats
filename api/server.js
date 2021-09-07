import axios from 'axios'
import express from 'express';
import expressGraphQl from 'express-graphql';
import graphqQl from 'graphql';
import catNames from 'cat-names'


const schema = graphqQl.buildSchema(`
  type Object {
    id: String
    url: String
    name: String
  }
  type Query {
    getRandomCats(limit: Int): [Object]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  getRandomCats: async ({ limit }) => {
    const res = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
      {
        headers: {
          "x-api-key": "76fe1047-72a2-474e-abce-ef00142c50d2",
        },
      }
    );
    console.log(res.data)
    const randomCatNames = catNames.all
    const shuffleCatNames = randomCatNames.sort((a, b) => 0.5 - Math.random());
    return res.data.map((cat, index) => ({ ...cat, name: shuffleCatNames[index] }));
  }
};

const app = express();

app.use('/graphql', expressGraphQl.graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');