const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    genre: String
});
module.exports=mongoose.model("Movie",movieSchema);