const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Oy ' + port);
});
