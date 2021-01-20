const express = require('express');
const cors = require('cors');

const app = express();

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

app.post('/mews', (req, res) => {
  if (isValidMew(req.body)) {
    // somestuff
    const mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
    };
    console.log(mew);
  } else {
    res.status(422);
    console.log('name and content required');
  }
});

// fire up server
app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log('Listening on port 5000');
});
