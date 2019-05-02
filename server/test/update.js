const assert = require('assert');
const User = require('../models/user');

//Describe tests
describe("updating records", ()=>{

  let user;

  beforeEach((done)=>{
    user = new User({
      name: 'Test'
    });
    user.save().then(()=>{
      assert(!user.isNew);
      done();
    });
  })
  //Create tests
  it("updates one record from the database", (done)=>{
    User.findOneAndUpdate({name: 'Test'}, {name: 'New Name'}).then(()=>{
      User.findOne({_id: user._id}).then((result)=>{
        assert(result.name === 'New Name');
      });
      done();
    });
  });
  //Next test...

});
