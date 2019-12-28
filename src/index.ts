import Koa, { Context } from 'koa';

const app = new Koa();

app.use((ctx: Context) => {
  ctx.body = 'hello, Jacob!!';
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
