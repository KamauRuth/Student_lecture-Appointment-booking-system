const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

const dbConfig = require('./config/dbconfig.js');
const userRouter = require('./Routes/user.js');
const cors_options = {
    origin: ['http://localhost:5173', 'http://localhost:3000', "*"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  };

const app = express();


app.use(bodyParser.json());
app.use(cors(cors_options));
app.use('/api/Users', userRouter);

const port = process.env.PORT || 5000;


app.listen(port, () =>  console.log(`Server is listening port ${port}`));



