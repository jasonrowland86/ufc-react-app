const express = require('express');
const ufcRouter = express.Router();
const ufcController = require('../controllers/ufc-controller');

ufcRouter.get('/events', ufcController.events);
ufcRouter.get('/card/:id', ufcController.eventCard);
ufcRouter.get('/fighter/:name', ufcController.fighter);
ufcRouter.get('/fighters/:name', ufcController.fighters);
ufcRouter.get('/fighters', ufcController.fighters);
ufcRouter.post('/fighters', ufcController.fighters);

module.exports = ufcRouter;
