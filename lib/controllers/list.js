var util = require('util'),
    Base = require('./base'),
    Query = require('../query');

module.exports = List = function(args) {
  List.super_.call(this, args);
};

util.inherits(List, Base);

List.prototype.action = 'list';
List.prototype.method = 'get';
List.prototype.plurality = 'plural';

List.prototype.fetch = function(req, res) {
  var query = Query.parse(req.params);

  // TODO: if $count use findAndCountAll
  // TODO: move success and fail to base
  // TODO: move response formatting to base, possiblly it's own file/folder
  return model
    .findAll(query)
    .then(function (rows) {
      res.json({
        value: rows
      });
    },
    function (err) {
      console.log(err);
    });
}
