import _ from 'lodash';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} from 'graphql';

// dummy data
const booksData = [
  { id: '1', name: 'Understanding Space. Introduction to Aeronautics', genre: 'Aerospace', authorId: '1' },
  { id: '2', name: 'Introduction to Rocket Science & Engineering', genre: 'Aerospace', authorId: '2' },
  { id: '3', name: 'Space Mission Engineeirng. The New SMAD', genre: 'Aerospace', authorId: '3' },
];

const authorsData = [
  { id: '1', name: 'Jerry Jon Sellers', age: 45 },
  { id: '2', name: 'Travis S. Taylor', age: 52 },
  { id: '3', name: 'James R. Wertz', age: 47 },
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
    age: { type: GraphQLInt }
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
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
