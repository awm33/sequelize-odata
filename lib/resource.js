var _ = require('lodash'),
    controllers = require('./controllers');

module.exports = Resource = function (options) {
  var self = this;

  _.defaults(options, {
    //actions: ['post', 'read', 'list', 'put', 'patch', 'delete'],
    actions: ['list'],
    excludeAttributes: []
  });

  this.app = options.app;
  this.sequelize = options.sequelize;
  this.model = options.model;

  if (!!options.readOnlyAttributes) this.readOnlyAttributes = options.readOnlyAttributes;

  this.attributes = (!options.excludeAttributes.length) ?
    Object.keys(this.model.rawAttributes) :
    Object.keys(this.model.rawAttributes).filter(function(attr) {
      return options.excludeAttributes.indexOf(attr) === -1;
    });

  this.actions = options.actions;
  this.endpoints = {
    plural: options.endpoints[0],
    singular: options.endpoints[1] || options.endpoints[0]
  };

  this.controllers = {};
  this.actions.forEach(function(action) {
    var Controller = controllers[action];
    var endpoint = this.endpoints[Controller.prototype.plurality];

    this.controllers[action] = new Controller({
      endpoint: endpoint,
      app: options.app,
      model: this.model,
      resource: this
    });

  }.bind(this));
}
