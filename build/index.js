"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;
var app = (0, _express["default"])();
app.listen(PORT);
console.log('Server running on port: ', PORT);