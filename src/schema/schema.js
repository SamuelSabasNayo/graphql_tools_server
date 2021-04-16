import _ from 'lodash';
import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

// dummy data
const booksData = [
  { id: '1', name: 'Name of the Wind', genre: 'Fantasy' },
  { id: '2', name: 'Final Empire', genre: 'Fantasy' },
  { id: '3', name: 'The Long Earth', genre: 'Sci-Fi' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db / other source
        return _.find(booksData, { id: args.id });
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
