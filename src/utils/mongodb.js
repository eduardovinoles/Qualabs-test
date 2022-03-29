
const uri = "mongodb+srv://eduardovinoles:eevr1212@gymapp.0xc82.mongodb.net/gymBack?retryWrites=true&w=majority";


var mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  })
  module.exports = db

