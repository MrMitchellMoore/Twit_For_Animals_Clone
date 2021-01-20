const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'Meower! 😀',
  });
});

app.post('/mews', (req, res) => {
  console.log(req.body);
});

// fire up server
app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log('Listening on port 5000');
});
