const mongoose = require('mongoose');
const deptSchema = new mongoose.Schema({

    department: {
        type: String,
        required: [true, 'Please tell us your department!']
    }
}, {
    timestamps: true
});

const deptModel = mongoose.model('Department', deptSchema);
module.exports = deptModel;