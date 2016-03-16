var Sequelize = require('sequelize'),
    restify = require('restify'),
    odata = require('../lib');

var sequelize = new Sequelize("accounts", "user", "password", {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

var accountModel = sequelize.import('./models/account');
var contactModel = sequelize.import('./models/contact');

accountModel.hasMany(contactModel);

var app = restify.createServer();

app.use(restify.queryParser());
app.use(restify.bodyParser());

odata.initialize({
  app: app,
  sequelize: sequelize
});

var accountResource = odata.resource({
  model: accountModel
});

var contactResource = odata.resource({
  model: contactModel
});

sequelize
  .sync({ force: true })
  .then(function() {
    app.listen(process.env.PORT || 5556, function() {
      var port = app.address().port;

      console.log('listening on %s', port);
    });
  });
