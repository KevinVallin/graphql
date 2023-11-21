// CombinedFile.js

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const graphql = require("graphql");

const app = express();
const PORT = 6969;

const schema = require("./Schemas/index");
const GameType = require("./Schemas/typeDefs/GameType");
const EditorType = require("./Schemas/typeDefs/EditorType");
const StudioType = require("./Schemas/typeDefs/StudioType");
const gameData = require("./your_game_data.json"); // Replace with your actual game data file

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = graphql;

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    games: {
      type: GameType,
      args: {
        page: { type: GraphQLInt },
        genre: { type: GraphQLString },
        platform: { type: GraphQLString },
        studio: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Add logic to fetch games based on the provided arguments
        // You might want to filter your gameData array here
      },
    },
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Add logic to fetch a specific game based on the provided ID
        // You might want to find the game in your gameData array here
      },
    },
    editors: {
      type: EditorsType,
      args: { page: { type: GraphQLInt } },
      resolve(parent, args) {
        // Add logic to fetch editors based on the provided arguments
        // You might want to filter your editorData array here
      },
    },
    editor: {
      type: EditorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Add logic to fetch a specific editor based on the provided ID
        // You might want to find the editor in your editorData array here
      },
    },
    studios: {
      type: StudiosType,
      args: { page: { type: GraphQLInt } },
      resolve(parent, args) {
        // Add logic to fetch studios based on the provided arguments
        // You might want to filter your studioData array here
      },
    },
    studio: {
      type: StudioType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Add logic to fetch a specific studio based on the provided ID
        // You might want to find the studio in your studioData array here
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add mutation fields for creating, updating, or deleting games, editors, and studios
  },
});

const combinedSchema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.listen(PORT, () => {
  console.log("Server running");
});
