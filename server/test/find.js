const assert = require('assert');
const User = require('../models/user');

//Describe tests
describe("finding records", ()=>{

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
  it("finds one record from the database", (done)=>{
    User.findOne({name: 'Test'}).then((result)=>{
      assert(result.name === 'Test');
    });
    done();
  });
  //Next test...
  it("finds one record by id from the database", (done)=>{
    User.findOne({_id: user._id}).then((result)=>{
      assert(result._id.toString() === user._id.toString());
    });
    done();
  });
});
