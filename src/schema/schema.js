import _ from 'lodash';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} from 'graphql';

// dummy data
const booksData = [
  { id: '1', name: 'Understanding Space. Introduction to Aeronautics', genre: 'Aerospace', authorId: '1' },
  { id: '2', name: 'Introduction to Rocket Science & Engineering', genre: 'Rocketry', authorId: '2' },
  { id: '3', name: 'Space Mission Engineering. The New SMAD', genre: 'Aerospace', authorId: '3' },
  { id: '4', name: 'Introduction to the Space Environment', genre: 'Space Environment', authorId: '5' },
  { id: '5', name: 'Rocket Propulsion Elements', genre: 'Rocketry', authorId: '4' },
  { id: '6', name: 'Applied Space Systems Engineering (Space Technology)', genre: 'Space Systems', authorId: '1' },
  { id: '7', name: 'Aerospace Science: The Exploration of Space with Cd', genre: 'Space Science', authorId: '1' },
  { id: '8', name: 'One Day on Mars', genre: 'Space Environment', authorId: '2' },
  { id: '9', name: 'Space Environmental Hazards: A Guide to Building Better Spacecraft', genre: 'Space Environment', authorId: '5' }
];

const authorsData = [
  { id: '1', name: 'Jerry Jon Sellers', age: 45 },
  { id: '2', name: 'Travis S. Taylor', age: 52 },
  { id: '3', name: 'James R. Wertz', age: 47 },
  { id: '4', name: 'George Paul Sutton', age: 61 },
  { id: '5', name: 'Thomas F.Tascione', age: 55 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authorsData, { id: parent.authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(booksData, { authorId: parent.id })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        // code to get data from db / other source
        return _.find(booksData, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return _.find(authorsData, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return booksData
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authorsData
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
