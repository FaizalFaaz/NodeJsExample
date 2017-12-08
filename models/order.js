

var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: " address please"
  },
  phone: {
    type: String,
    required: "phone number is mandatory"
  },
  product: {
    type: String,
    required: "prodct is "
  },
  user: {
    type: String,
    required: "prodct is "
  }
});
module.exports = mongoose.model('Order', OrderSchema)
