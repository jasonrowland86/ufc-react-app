const mongoose = require('mongoose');

//Connect to db bfore tests run
before((done)=>{
  //Connect to mongodb
  mongoose.connect('mongodb://localhost/fightpick');

  mongoose.connection.once('open', function() {
    console.log("Connected!");
    done();
  }).on('error', function(error){
    console.log("Connection error:", error);
  });
});

//Drop the collection before each test
beforeEach((done)=>{
  //Drop collection
  console.log('Clearing collection');
  mongoose.connection.collections.users.drop(()=>{
    done();
  });
});
