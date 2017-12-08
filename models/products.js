var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  

    productname: {
      type: String,
      required: " product name"
    },
    brand: {
      type: String,
      required: "brand over here"
    },
    price: {
      type: String,
      required: "Prize "
  }
});
module.exports = mongoose.model('Product', ProductSchema)
