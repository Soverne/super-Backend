var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NameSchema   = new Schema({
    parameter: String
});

module.exports = mongoose.model('Name', NameSchema);