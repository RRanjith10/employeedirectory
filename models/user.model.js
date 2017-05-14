var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
  Name: { type: String},
  Email: { type: String},
  DateofBirth: { type: Date},
  Department:{ type: String},
  Gender:{ type: String},
  Age:{ type: String}
});

var employeeDetails = mongoose.model('employees', Employee);
module.exports = employeeDetails;
