// 'use strict';

var myES6 = function() {
	'use strict';

	var exports = {};

	exports.title = function() {
		var el = document.querySelector('h1');
		el.innerHTML = 'This is for all!';
	};

	return exports;
}();

myES6.title();
