"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Powerbar = function () {
	function Powerbar(ctx) {
		_classCallCheck(this, Powerbar);

		this.ctx = ctx;
		this.pos = new Point(20, canvas.height - 20);
		this.max = 100;
		this.padding = 2;
		this.width = 100;
		this.height = 10;
		this.background = "whitesmoke";
		this.foreground = "gray";
		this.border = "black";
	}

	_createClass(Powerbar, [{
		key: "draw",
		value: function draw(power) {

			this.ctx.shadowBlur = 1;
			this.ctx.shadowColor = "#373737";

			//background
			this.ctx.beginPath();
			this.ctx.fillStyle = this.background;
			this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
			this.ctx.fill();

			//foreground
			if (power > 0) {
				this.ctx.fillStyle = this.foreground;
				this.ctx.fillRect(this.pos.x + this.padding, this.pos.y + this.padding, this.width / this.max * power - 2 * this.padding, this.height - 2 * this.padding);
				this.ctx.fill();
			}
		}
	}]);

	return Powerbar;
}();