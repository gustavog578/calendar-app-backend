/*
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldsValidate } = require("../middlewares/fields-validator");
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

// Petitions must pass by middleware
router.use( validateJWT );

// get events
router.get('/', getEvents );

router.post('/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start date is mandatory').custom( isDate ),
        check('end', 'End date is mandatory').custom( isDate ),
        fieldsValidate
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;