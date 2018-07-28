const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  name: {}
});

module.exports = Posts = mongoose.model("posts", PostsSchema);
