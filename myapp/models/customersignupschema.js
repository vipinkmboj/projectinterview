var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true//, useFindAndModify: false,
    //useCreateIndex: true
});

var customerSchema = new mongoose.Schema({

FullName : {
    type: String,
    required: true
},
Email: {
    type: String,
    required: true
},
Mobilenumber : {
    type: String,
    required: true,
    index: {
        unique: true
    }
},
Username: {
    type: String,
    required: true,
    index: {
        unique: true
    }
},


Password: {
    type: String
    // required: true
},

Date: {
    type: Date,
    default: Date.now
}
});

var customerModel = mongoose.model('customers', customerSchema);
module.exports = customerModel;