/* Warning: file regenerated automatically on each file save */

var myJS = (function() {

	var exports = {};

	exports.hello = function() {
		var el = document.getElementById('div1');
		el.innerHTML = 'Hello, World';
	};

	return exports;
}());

myJS.hello();

// 'use strict';

var myES6 = function() {
	'use strict';

	var exports = {};

	exports.title = function() {
		var el = document.querySelector('h1');
		el.innerHTML = 'This is for everyone!';
	};

	return exports;
}();

myES6.title();
