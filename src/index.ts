import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * @description Start Server
 */
app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
