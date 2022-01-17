const router = require('express').Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
let Turkey = require('../models/turkey.model');

const title = 'Turkey';

// get all items
router
    .route('/')
    .get((req, res, next) => {
        Turkey.find().then((data) => res.json(data));
    });

// get item 
router
    .route('/:id')
    .get((req, res, next) => {
        Turkey.find({ name: req.params.id }).then((data) => res.json(data));
    });

module.exports = router;
