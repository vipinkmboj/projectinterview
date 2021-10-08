var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true//, useFindAndModify: false,
    //useCreateIndex: true
});

var productDataSchema = new mongoose.Schema({

  
    Username: {
        type: String,
        required: true
       
    },    
ProductCategory : {
    type: String,
   
},
ProductName: {
    type: String,
    
},
ProductDetail: {
    type: String,
    
},
ProductExpiry: {
    type: String,
    
},


ProductPrice: {
    type: String
    // required: true
},

Date: {
    type: Date,
    default: Date.now
}
});

var productDataModel = mongoose.model('ProductsData', productDataSchema);
module.exports = productDataModel;