require('dotenv').config();
const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

// db setup
const db = monk(process.env.DB_STRING);
db.then(() => {
  console.log('Connected correctly to server');
});
const mews = db.get(process.env.MEWS);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isValidMew(mew) {
  return mew.name && mew.name.toString().trim() !== ''
  && mew.content && mew.content.toString().trim() !== '';
}

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'Meower! 😀',
  });
});

app.get('/mews', (req, res) => {
  mews
    .find()
    .then((allMews) => {
      res.json(allMews);
    });
});

app.post('/mews', (req, res) => {
  if (isValidMew(req.body)) {
    // somestuff
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: Date(),
    };
    mews
      .insert(mew)
      .then((createdMew) => {
        res.json(createdMew);
      });
  } else {
    res.status(422);
    console.log('name and content required');
  }
});

// fire up server
app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log('Listening on port 5000');
});
