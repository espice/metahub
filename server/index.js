import dotenv from 'dotenv';
dotenv.config();
import OAuthServer from 'express-oauth-server';
import express from 'express';
import mongoose from 'mongoose';
const authRouter = require('./routes/auth');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB.......'))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  next();
});

app.use('/auth', authRouter);

app.use(express.json());


// kar raha hun
app.oauth = new OAuthServer({
  model: {}, // See https://github.com/oauthjs/node-oauth2-server for specification
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(app.oauth.authorize());

app.get('/', (req, res) => {
  res.send('Hare Krishna');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
