const ufcController = {};
const async = require('async');
require('isomorphic-fetch');

const sherdog = require('sherdog');
const fighterURLS = require('../fighterURLS');

ufcController.events = (req, res) => {
  fetch('http://ufc-data-api.ufc.com/api/v3/us/events')
  .then(response => response.json())
  .then(response => {
    console.log('Got Events');
    res.json({events: response});
  })
}

ufcController.eventCard = (req, res) => {
  let returnData = {};

  async.parallel([
    (done) => {
      fetch(`http://ufc-data-api.ufc.com/api/v3/us/events/${req.params.id}/fights`)
      .then(response => response.json())
      .then(response => {
        console.log('Got Card');
        returnData.card = response;
        done();
      });
    },
    (done) => {
      fetch(`http://ufc-data-api.ufc.com/api/v3/us/events/`)
      .then(response => response.json())
      .then(response => {
        console.log('Got Event');
        console.log("params: ", req.params.id);
        let matchedEvent = response.filter(r => r.id == req.params.id);
        console.log(matchedEvent);
        returnData.event = matchedEvent[0];
        done();
      });
    }
  ], (err => {
    res.json({
      card: returnData.card,
      card_event: returnData.event
    });
  }));
}

ufcController.fighters = (req, res) => {
  fetch('http://ufc-data-api.ufc.com/api/v3/us/fighters')
    .then(console.log(res.data))
    .then(response => response.json())
    .then(response => {
        if (req.method === "GET") {
          res.json(response);
        } else if (req.method === "POST") {
          let fighter1 = response.filter(r =>
            `${r.first_name}` + ' ' + `${r.last_name}` === req.body.fighter1 )
            console.log('fighter1:', fighter1[0].first_name, fighter1[0].last_name);
          let fighter2 = response.filter(r =>
          `${r.first_name}` + ' ' + `${r.last_name}` === req.body.fighter2 )
            console.log('fighter2:', fighter2[0].first_name, fighter2[0].last_name);

          res.json({fighter1: fighter1, fighter2: fighter2});
        }
    }).catch(err => {
      res.json("Fighter not found");
    })
}

ufcController.fighter = (req, res) => {
  console.log("param: ", req.params.name);
  let fighterName = fighterURLS.filter(u => u.includes(req.params.name));
  let url = `http://www.sherdog.com${fighterName}`
  sherdog.getFighter(url, function(data) {
    res.json(data);
  })
}

// ufcController.eventCard = (req, res) => {
//   fetch(`http://ufc-data-api.ufc.com/api/v3/us/events/${req.params.id}/fights`)
//   .then(response => response.json())
//   .then(response => {
//     console.log("Event ID: ", req.params.id);
//     if (!response[0].fighter1_first_name) {
//       console.log("no fighter name");
//       console.log(response);
//       let fighters = response.map(r => {
//         // console.log("map", r.id);
//         let fighter_id = r.id;
//         fetch('http://ufc-data-api.ufc.com/api/v3/us/fighters')
//           .then(resp => resp.json())
//           .then(resp => {
//             let fighter = resp.map(re => {
//               // console.log("second-fetch: ", re.id);
//
//               //Trying to match fighter ids...
//               // console.log(re.id);
//               // console.log(fighter_id);
//               if (re.id == fighter_id) {
//                 console.log('match');
//               }
//             })
//           })
//       })
//
//       // fighter = res.filter(r => r.id == fighter_id);
//       res.json(null);
//     } else {
//       console.log('Got Card: ', response);
//       res.json(response);
//     }
//   })
// }

module.exports = ufcController;
