
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const router = require('./routes');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', router);

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
