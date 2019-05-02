const User = require('../models/user');
const db = require('../db');
const bcrypt = require('bcryptjs');

const UserController = {};

UserController.index = (req, res)=>{
  User.findOne({name: req.user.name}).then((result)=>{
    console.log("User Controller: ", result);
    // res.json({user: req.user});
    res.json({user: result});
  });
}

UserController.all = (req, res)=>{
  User.find({}).then((result)=>{
    console.log(result);
    console.log("req: ", req.user);
    res.json({message: "From server", result: result});
  });
}

UserController.create = (req, res, next)=>{
  console.log("req: ", req.body);
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  let user = new User({
    name: req.body.username,
    password: hash
  });
  user.save().then( user =>{
    console.log("User created ", user);
    // res.send();
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
      // res.json({user: user});
      console.log("logged in ", user);
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

UserController.addFighter = (req, res) => {
  console.log("ADD FIGHTER");
  console.log("req.user: ", req.user);
  console.log("req.fighterName: ", req.body.fighter_name);
  console.log("req.fighter_id: ", req.body.fighter_id);
  console.log("req.event_id: ", req.body.event_id);
  console.log("req.previousPick_ID: ", req.body.previousPick_ID);
  let pick = {
    name: req.body.fighter_name,
    fighterID: req.body.fighter_id,
    eventID: req.body.event_id
  }
  let previousPick = req.body.previousPick_ID;
  //Find user and update users picks
  User.findOne({name: req.user.name}).then((result)=>{
    console.log("User to update: ", result);
    let user = result;
    User.update(
      { _id: result._id },
      { $push: {picks: pick} }
    ).then((result) => {
      console.log("Added: ", result);
      //If the opponent of the pick exists delete it
      if (previousPick) {
        console.log("previous pick: ", previousPick);
        User.update(
          { _id: user._id },
          { $pull: { picks: { _id: previousPick } } }
        ).then(() => {
          console.log('Deleted Previous Pick');
        })
      }
    })
  });
}

// UserController.update = (req, res)=>{
//
// }

UserController.getPicks = (req, res)=>{
  User.findOne({name: req.user.name}).then((result)=>{
    console.log("Picks: ", result.picks);
    // res.json({user: req.user});
    res.json({picks: result.picks, user: result});
  });
}

UserController.deletePick = (req, res)=>{
  console.log(req.params.id);
  User.findOne({name: req.user.name}).then((result)=>{
    console.log("Delete Pick From User: ", result);
    // res.json({user: req.user});
    User.update(
      { _id: result._id },
      { $pull: { picks: { _id: req.params.id } } }
    ).then(() => {
      console.log('Deleted Pick');
    })
  });
}

UserController.delete = (req, res)=>{
  User.findOneAndRemove({_id: req.params.id}).then((result)=>{
      console.log(result);
      // res.json({message: result.name});
    });
}

module.exports = UserController;
