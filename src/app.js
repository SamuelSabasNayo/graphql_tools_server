import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import config from './config/config';
import schema from './schema/schema';

// express app
const app = express();

const { PORT, URL } = config;

// connect to mongodb
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB.');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error at mongo: ${err}.`);
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`)
});
