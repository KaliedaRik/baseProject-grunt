var myJS = (function() {

	var exports = {};

	exports.hello = function() {
		var el = document.getElementById('div1');
		el.innerHTML = 'Hello, World!';
	};

	return exports;
}());

myJS.hello();
