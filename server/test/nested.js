const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../models/user');

//Describe tests
describe("nested records", ()=>{

  beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
      done();
    })
  });
  //Create tests
  it("creates user with sub-document", (done)=>{
    let user = new User({
      name: 'Test',
      picks: [{name: 'Silva'}]
    });
    user.save().then(()=>{
      User.findOne({name: 'Test'}).then((result)=>{
        assert(result.picks.length);
        done();
      });
    });
  });
  //Next test...
  it("adds pick", (done)=>{

    let user = new User({
      name: 'Test',
      picks: [{name: 'Silva'}]
    });
    user.save().then(()=>{
      User.findOne({name: 'Test'}).then((result)=>{
        result.picks.push({name: 'Yoel'});
        result.save().then(()=>{
          User.findOne({name: 'Test'}).then(()=>{
            assert(result.picks.length === 2);
            done();
          });
        });
      });
    });
  });

});
