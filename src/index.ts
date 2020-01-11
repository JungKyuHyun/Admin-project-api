import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { buildSchemaSync } from 'type-graphql';
import { userResolver } from './graphql';
import graphqlHTTP from 'express-graphql';

dotenv.config();
const app = express();

/**
 * @description 스키마 정의
 */
const schema = buildSchemaSync({
  resolvers: [userResolver],
  dateScalarMode: 'isoDate',
  validate: false,
});

app.get('/', (req, res) => {
  res.send('hi, jocob!');
});
console.log(process.env.JWT_SECRET);

/**
 * @description Set App
 */
app.set('port', process.env.PORT || 3000);

/**
 * @description Add Midleware
 */
app.use(morgan('dev'));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * @description Route handler
 */
app.post(
  '/api',
  graphqlHTTP({
    schema: schema,
    graphiql: false,
  }),
);

app.get(
  '/api',
  graphqlHTTP({
    schema: schema,
    graphiql: false,
  }),
);

/**
 * @description Start Server
 */
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
