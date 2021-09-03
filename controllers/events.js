const { response } =  require('express');
const { eventNames } = require('../models/Event');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events =  await Event
                        .find()
                        .populate('user', 'name');


    res.json({
        ok:true,
        events
    })
}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);
    
    try {
        event.user = req.uid;    
        const eventSaved = await event.save();
        
        res.json({
            ok:true,
            event: eventSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Contact with the administrator'
        })
    }

    /*res.json({
        ok:true,
        msg: 'CreateEvent'
    })*/
}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId )
      
        if ( !event ){
            return res.status(404).json({
                ok:false,
                msg: 'Event does not exists'
            })
        }
        // can update, only same user.
        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg: 'Not enough privileges for this action'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        
        await Event.findByIdAndUpdate( eventId, newEvent, { new: true });

        return res.json({
            ok:true
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Contact with the administrator'
        })
    }

  
}

const deleteEvent = async(req, res = response) => {


    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId )
      
        if ( !event ){
            return res.status(404).json({
                ok:false,
                msg: 'Event does not exists'
            })
        }
        // can update, only same user.
        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg: 'Not enough privileges for this action'
            })
        }

        // new: true -> return the last document updated.
        // without option return previous document for do some check
        const eventDeleted = await Event.findByIdAndDelete( eventId );

        return res.json({
            ok:true,
            event: eventDeleted
        })


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Contact with the administrator'
        })
    }

  
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}