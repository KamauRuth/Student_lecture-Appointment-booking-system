const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

const dbConfig = require('./config/dbconfig.js');



const userRouter = require('./Routes/user.js');
const adminRouter = require('./Routes/admin.js');
const lecturerRouter = require('./Routes/lecturer.js');
const cors_options = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  };

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(cors_options));
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter)
app.use('/api/lecturer', lecturerRouter);
const port = process.env.PORT || 5000;
// Endpoint to get appointment report
app.get('/report', async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: "$reason", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ];

    const results = await Appointment.aggregate(pipeline);
    res.json(results);
  } catch (error) {
    res.status(500).send('Error generating report');
  }
});


app.listen(port, () =>  console.log(`Server is listening port ${port}`));