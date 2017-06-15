"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
	function Util() {
		_classCallCheck(this, Util);
	}

	_createClass(Util, [{
		key: "getMousePos",
		value: function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			var marginTop = canvas.style.marginTop;
			var border = canvas.style.borderWidth;

			var x = evt.clientX - rect.left;
			var y = evt.clientY - rect.top - marginTop;

			return new Point(x, y);
		}
	}, {
		key: "random",
		value: function random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}, {
		key: "getDistance",
		value: function getDistance(i, f) {
			return Math.abs(Math.sqrt(Math.pow(f.x - i.x, 2) + Math.pow(f.y - i.y, 2)));
		}
	}, {
		key: "getAngle",
		value: function getAngle(p1, p2) {

			//p2 always greater than p1
			var d1 = this.getDistance(p1, new Point(0, canvas.height));
			var d2 = this.getDistance(p2, new Point(0, canvas.height));
			if (d1 > d2) {
				var tmp = p1;
				p1 = p2;
				p2 = tmp;
			}

			return Math.atan2(p2.y - p1.y, p2.x - p1.x);
		}
	}, {
		key: "getAngleFormat",
		value: function getAngleFormat(p1, p2) {
			return 180 - Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
		}
	}, {
		key: "checkInEllipse",
		value: function checkInEllipse(x, y, h, k, rx, ry) {

			var a = Math.pow(x - h, 2) / (rx * rx);
			var b = Math.pow(y - k, 2) / (ry * ry);

			return a + b < 1;
		}
	}]);

	return Util;
}();