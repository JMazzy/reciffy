define('frontend/models/recipe-ingredient', ['exports', 'ember', 'fractional', 'ember-data'], function (exports, _ember, _fractional, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    recipe_id: _emberData['default'].attr('number'),
    ingredient_id: _emberData['default'].attr('number'),
    unit_id: _emberData['default'].attr('number'),
    quantity: _emberData['default'].attr('number'),
    created_at: _emberData['default'].attr('date'),
    updated_at: _emberData['default'].attr('date'),

    recipe: _emberData['default'].belongsTo('recipe'),
    ingredient: _emberData['default'].belongsTo('ingredient'),
    unit: _emberData['default'].belongsTo('unit'),

    fract_quant: _ember['default'].computed('quantity', function () {
      return new _fractional['default'](this.get('quantity')).toString();
    })
  });
});