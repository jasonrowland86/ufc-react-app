const mongoose = require('mongoose');

//Connect to mongodb
mongoose.connect('mongodb://localhost/fightpick');

mongoose.connection.once('open', function() {
  console.log("Connected!");
}).on('error', function(error){
  console.log("Connection error:", error);
});
