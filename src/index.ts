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

// process.env
const prod = process.env.NODE_ENV === 'production';

// whiteList
const whiteList = ['http://localhost:9000', '127.0.0.1:9000']; // NOTE: 실제 서버에 올릴 계획이 생긴다면 반드시 수정(현재는 없음)

/**
 * @description graphQL 스키마 정의
 */
const schema = buildSchemaSync({
  resolvers: [userResolver],
  dateScalarMode: 'isoDate',
  validate: false,
});

console.log(process.env.JWT_SECRET);

/**
 * @description Set App
 */
app.set('port', process.env.PORT || 3000);

/**
 * @description Add Midleware and Config
 */
if (prod) {
  app.use(morgan('common'));
  app.use(cors()); // NOTE: 실제 배포 계획시 꼭 수정
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: whiteList,
      credentials: true,
    }),
  );
}

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

// 테스트용
app.get('/', (req, res) => {
  res.send('hi, jocob!');
});
app.get('/test', (req, res) => {
  // res.send('test success');
  console.log('req:', req);
  res.status(200).send('성공이라구');
});

/**
 * @description Start Server
 */
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
