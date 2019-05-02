const assert = require('assert');
const User = require('../models/user');

//Describe tests
describe("saving records", ()=>{
  //Create tests
  it("saves a record to the database", (done)=>{
    let user = new User({
      name: 'Test'
    });
    user.save().then(()=>{
      assert(!user.isNew);
      done();
    });
  });
  //Next test...
  
});
