var myES6 = (function() {
  'use strict';

	var exports = {};

	exports.title = function() {
		let el = document.querySelector('h1');
		el.innerHTML = 'This is for everyone!';
	};

	return exports;
}());

myES6.title();









