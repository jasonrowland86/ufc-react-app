const assert = require('assert');
const User = require('../models/user');

//Describe tests
describe("deleting records", ()=>{

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
  it("deletes one record from the database", (done)=>{
    User.findOneAndRemove({name: 'Test'}).then(()=>{
      User.findOne({name: 'Test'}).then((result)=>{
        assert(result === null);
        done();
      });
    });
  });
  //Next test...

});
