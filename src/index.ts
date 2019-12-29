import express from 'express';
import morgan from 'morgan';

const app = express();

app.get('/', (req, res) => {
  res.send('hi, jocob!');
});

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
