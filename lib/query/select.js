module.exports = {
  param: '$select',

  validate: function () {},

  parse: function (query, $select) {
    var select = $select.split(',').map(function (n) { return n.trim() });

    if (select.length > 0)
      query.attributes = select;
  }
}