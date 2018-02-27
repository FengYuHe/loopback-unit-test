'use strict';

module.exports = function(Foo) {
  Foo.createFoo = function (name) {
    name = format(name);
    return Foo.create({name});
  };
};

function format (name) {
  return 'm_' + name;
}
