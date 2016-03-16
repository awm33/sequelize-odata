var inflection = require('inflection'),
    Resource = require('./resource');

module.exports = {
  initialize: function (options) {
    options = options || {};

    if (!options.app)
      throw new Error('Please specify an app');

    if (!options.sequelize)
      throw new Error('Please specify a sequelize instance');

    this.app = options.app;
    this.sequelize = options.sequelize;

    this.base = options.base || '';

    return this;
  },

  resource: function (options) {
    if (!options.model)
      throw new Error('Please specify a valid model');

    if (!options.endpoints || !options.endpoints.length) {
      options.endpoints = [];
      var plural = inflection.pluralize(options.model.name);
      options.endpoints.push('/' + plural);
      options.endpoints.push('/' + plural + '/:id');
    }

    var endpoints = [];
    options.endpoints.forEach(function(e) {
      var endpoint = this.base + e;
      endpoints.push(endpoint);
    }.bind(this));

    var resource = new Resource({
      app: this.app,
      sequelize: this.sequelize,
      model: options.model,
      endpoints: endpoints,
      actions: options.actions,
      excludeAttributes: options.excludeAttributes,
      readOnlyAttributes: options.readOnlyAttributes
    });

    return resource;
  }
}
