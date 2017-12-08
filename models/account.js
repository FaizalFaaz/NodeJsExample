
var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({})

accountSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', accountSchema);
