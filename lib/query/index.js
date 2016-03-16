var parameterParsers = [require('./select')];

module.exports = {
  parse: function (params) {
    var query = {};
    
    parameterParsers.forEach(function (parser) {
      var param = params[parser.param];
      if (param)
        parser.parse(query, param);
    });

    return query;
  }
}