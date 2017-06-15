"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Space = function () {
	function Space(canvas, ctx) {
		_classCallCheck(this, Space);

		this.canvas = canvas;
		this.ctx = ctx;
		this.mouseDown;
		this.cursor;
		this.mouseDownPos;
		this.target;
		this.arrow;
		this.powerbar;
		this.score = 0;
	}

	_createClass(Space, [{
		key: "init",
		value: function init() {
			this.mouseDown = false;
			this.cursor = new Point(0, 0);
			this.mouseDownPos = new Point(0, 0);
			this.target = new Target(this, this.ctx);
			this.arrow = new Arrow(this, this.ctx);
			this.powerbar = new Powerbar(this.ctx);
			this.target.move();
		}
	}, {
		key: "draw",
		value: function draw() {

			this.ctx.shadowBlur = 1;
			this.ctx.shadowColor = "#373737";

			// target
			if (this.mouseDown) {
				this.ctx.beginPath();
				this.ctx.shadowBlur = 0;
				this.ctx.lineWidth = 1;
				this.ctx.strokeStyle = "black";
				this.ctx.setLineDash([2, 5]);
				this.ctx.moveTo(this.cursor.x, this.cursor.y);
				this.ctx.lineTo(this.mouseDownPos.x, this.mouseDownPos.y);
				this.ctx.stroke();
				this.ctx.setLineDash([1, 0]);
			}

			//powerbar
			this.powerbar.draw(this.arrow.power);

			//target
			this.target.draw();

			//score
			this.ctx.fillStyle = "white";
			this.ctx.shadowBlur = 1;
			this.ctx.font = "80px sans-serif";
			this.ctx.fillText(this.score, this.canvas.width / 2, 80);

			//arrow
			this.arrow.checkCollission(this.target);
			this.arrow.draw();
			this.arrow.checkBoundary(canvas);
		}
	}, {
		key: "reset",
		value: function reset() {
			this.target.move();
			this.score = 0;
			this.arrow.reset();
			this.target.deadArrows = [];
		}
	}]);

	return Space;
}();