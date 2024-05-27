const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

const dbConfig = require('./config/dbconfig.js');
const userRouter = require('./Routes/user.js');
const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json);
app.use('/api/Users', userRouter);

const port = process.env.PORT || 5000;


app.listen(port, () =>  console.log(`Server is listening port ${port}`));



