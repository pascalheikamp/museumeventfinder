import mongoose, {Schema} from "mongoose";
// const mongoosePaginate = require('mongoose-paginate');
const eventScheme = new mongoose.Schema({
    id: Number,
    museum_name: "The Getty Center",
    event_name: "Baroque Art Celebration",
    description: "Join us for a celebration of Baroque art with special exhibits and performances.",
    date: "2024-09-25",
    start_time: "1:00 PM",
    end_time: "7:00 PM",
    ticket_price: 20.00,
    location: "1200 Getty Center Dr, Los Angeles, CA",
    contact_email: "info@getty.edu",
    event_url: "https://www.getty.edu/events/baroque-art-celebration"
});

// musicScheme.plugin(mongoosePaginate);

const Event = mongoose.model('Event', eventScheme);

export default Event;
