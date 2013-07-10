"use strict";
var ObjectValidator, ValidatorBuilder,
  __slice = [].slice;

ObjectValidator = require("./object_validator");

ValidatorBuilder = (function() {
  ValidatorBuilder.prototype._attr = null;

  ValidatorBuilder.prototype._condition = null;

  ValidatorBuilder.prototype._validator = null;

  function ValidatorBuilder(object) {
    this._validator = new ObjectValidator(object);
  }

  ValidatorBuilder.prototype.validates = function(attr) {
    this._attr = attr;
    this._condition = null;
    return this;
  };

  ValidatorBuilder.prototype.when = function(condition) {
    this._condition = condition;
    return this;
  };

  ValidatorBuilder.prototype.using = function(predicate, message) {
    var condition, originalPredicate;
    if (this._condition) {
      condition = this._condition;
      originalPredicate = predicate;
      predicate = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (condition.apply(null, args)) {
          return originalPredicate.apply(null, args);
        } else {
          return true;
        }
      };
    }
    this._validator.addValidation(this._attr, predicate, message);
    return this;
  };

  ValidatorBuilder.prototype.build = function() {
    return this._validator;
  };

  ValidatorBuilder.registerHelper = function(name, fn) {
    this.prototype[name] = function(message) {
      return this.using(fn, message);
    };
    return null;
  };

  return ValidatorBuilder;

})();

module.exports = ValidatorBuilder;
