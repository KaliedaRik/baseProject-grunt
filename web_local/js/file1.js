var myJS = (function() {
	var exports = {};

	exports.hello = function() {
		var el = document.getElementById('div1');
		el.innerHTML = 'Hello, London!';
	};

	return exports;
}());

myJS.hello();
