module.exports = Controller = function (options) {
  options = options || {};

  this.endpoint = options.endpoint;
  this.model = options.model;
  this.app = options.app;
  this.resource = options.resource;

  var self = this;
  this.app[this.method](this.endpoint, function (req, res) {
    self.run(req, res);
  });
}