var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Employee = require('../models/user.model');

var employeeRouter = express.Router();
employeeRouter.use(bodyParser.json());

/* GET users listing. */
employeeRouter.route('/')
  .get(function (req, res, next) {
    Employee.find({}, function (err, employee) {
      res.json(employee);
    })
  });

employeeRouter.route('/employee')
  .post(function (req, res, next) {
    Employee.find({}, function (err, users) {
      var employee = new Employee({
        Name: req.body.Name,
        Email: req.body.Email,
        Gender: req.body.Gender,
        DateofBirth: req.body.DateofBirth,
        Department: req.body.Department,
        Age: req.body.Age
      })
      employee.save(function (err) {
        if (!err) {
          Employee.find({}, function (err, users) {
            res.status(200).json(employee);
          });
        }
      })

    })
  });

employeeRouter.route('/employee/:id')
  .delete(function (req, res) {
    Employee.findByIdAndRemove(req.params.id, function (err, offer) {
      if (err) {
        throw err;
      }
      Employee.find({}, function (err, users) {
        console.log(users);
        res.status(200).json(users);
        res.end();
      })
    })
  });

employeeRouter.route('/employee/:id')
  .put(function (req, res) {
    Employee.findById(req.params.id, function (err, user) {
      if (err) {
        return handleError(err);
        console.log(err);
      }
      user.Name = req.body.Name;
      user.Email = req.body.Email;
      user.DateofBirth = req.body.DateofBirth;
      user.Department = req.body.Department;
      user.Gender = req.body.Gender;
      user.Age = req.body.Age;
      user.save(function (err, updateduser) {
        if (err) return handleError(err);
        console.log(err);

        Employee.find({}, function (err, users) {
          res.statusCode = 200;
          console.log(users);
          res.status(200).json(users);
          res.end();
        });
      });
    })
  });

employeeRouter.route('/employee/:id')
  .get(function (req, res) {
    console.log(req.params.id);
    Employee.findOne({_id :req.params.id}, function (err, user) {
      res.status(200).json(user);
    })
  });
module.exports = employeeRouter;
