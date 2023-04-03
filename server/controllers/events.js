import Event from "../models/eventModel.js";
 
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getEventById = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(events[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createEvent = async (req, res) => {
    try {
        await Event.create(req.body);
        res.json({
            "message": "Events Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateEvent = async (req, res) => {
    try {
        await Event.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Event Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteEvent = async (req, res) => {
    try {
        await Event.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Event Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}