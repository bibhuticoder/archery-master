"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ut = new Util();

var Target = function () {
	function Target(parent, ctx) {
		_classCallCheck(this, Target);

		this.parent = parent;
		this.ctx = ctx;
		this.pos = new Point(300, 400);
		this.ellipses = [], this.deadArrows = [], this.state = "rest";
		this.speed = 10;
		this.moveDestination = 0;
	}

	_createClass(Target, [{
		key: "draw",
		value: function draw() {

			this.ellipses = [{ "h": this.pos.x, "k": this.pos.y, "rx": 14, "ry": 40, "color": "whitesmoke" }, { "h": this.pos.x - 4, "k": this.pos.y, "rx": 10, "ry": 33, "color": "#80bfff" }, { "h": this.pos.x - 7, "k": this.pos.y, "rx": 7, "ry": 21, "color": "#ff1a1a" }, { "h": this.pos.x - 10, "k": this.pos.y, "rx": 4, "ry": 11, "color": "yellow" }];

			//ellipses
			for (var i = 0; i < this.ellipses.length; i++) {
				this.ctx.beginPath();
				this.ctx.shadowBlur = 0;
				this.ctx.fillStyle = this.ellipses[i].color;
				this.ctx.ellipse(this.ellipses[i].h, this.ellipses[i].k, this.ellipses[i].rx, this.ellipses[i].ry, 0, 0, 2 * Math.PI);
				this.ctx.fill();
			}

			//deadArrows
			for (var i = 0; i < this.deadArrows.length; i++) {
				var a = this.deadArrows[i];

				//arrowline
				this.ctx.beginPath();
				this.ctx.lineWidth = 1;
				this.ctx.shadowBlur = 1;
				this.ctx.strokeStyle = "whitesmoke";
				this.ctx.moveTo(a.backPoint.x, a.backPoint.y);
				this.ctx.lineTo(a.forePoint.x, a.forePoint.y);
				this.ctx.stroke();
				this.ctx.shadowBlur = 0;

				//arrowHead
				var headlen = 4;
				this.ctx.beginPath();
				this.ctx.moveTo(a.forePoint.x, a.forePoint.y);
				this.ctx.fillStyle = "dimgray";
				this.ctx.lineTo(a.forePoint.x - headlen * Math.cos(a.angle - Math.PI / 9), a.forePoint.y - headlen * Math.sin(a.angle - Math.PI / 9));
				this.ctx.lineTo(a.forePoint.x - headlen * Math.cos(a.angle + Math.PI / 9), a.forePoint.y - headlen * Math.sin(a.angle + Math.PI / 9));
				this.ctx.moveTo(a.forePoint.x, a.forePoint.y);
				this.ctx.fill();
				this.ctx.closePath();

				//arrowRoot
				var rootLen = 12;
				var rootWid = 4;
				this.ctx.save();
				this.ctx.beginPath();
				this.ctx.translate(a.backPoint.x, a.backPoint.y);
				this.ctx.rotate(Math.atan2(a.forePoint.y - a.backPoint.y, a.forePoint.x - a.backPoint.x));
				this.ctx.fillStyle = "#ff4d4d";
				this.ctx.moveTo(0, 0);
				this.ctx.lineTo(-rootWid, -rootWid);
				this.ctx.lineTo(-rootLen, -rootWid);
				this.ctx.lineTo(-2 * rootLen / 3, 0);
				this.ctx.lineTo(-rootLen, rootWid);
				this.ctx.lineTo(-rootWid, rootWid);
				this.ctx.fill();
				this.ctx.closePath();
				this.ctx.restore();
			}

			if (this.state === "moving") {

				if (this.pos.x < this.moveDestination.x) {
					this.state = "moving";
					this.pos.x += this.speed;
					for (var i = 0; i < this.deadArrows.length; i++) {
						this.deadArrows[i].pos.x += this.speed;
						this.deadArrows[i].forePoint.x += this.speed;
						this.deadArrows[i].backPoint.x += this.speed;
					}
				}
				if (this.pos.x > this.moveDestination.x) {
					this.pos.x -= this.speed;
					this.state = "moving";
					for (var i = 0; i < this.deadArrows.length; i++) {
						this.deadArrows[i].pos.x -= this.speed;
						this.deadArrows[i].forePoint.x -= this.speed;
						this.deadArrows[i].backPoint.x -= this.speed;
					}
				}
				if (this.pos.y > this.moveDestination.y) {
					this.pos.y -= this.speed;
					this.state = "moving";
					for (var i = 0; i < this.deadArrows.length; i++) {
						this.deadArrows[i].pos.y -= this.speed;
						this.deadArrows[i].forePoint.y -= this.speed;
						this.deadArrows[i].backPoint.y -= this.speed;
					}
				}
				if (this.pos.y < this.moveDestination.y) {
					this.pos.y += this.speed;
					this.state = "moving";
					for (var i = 0; i < this.deadArrows.length; i++) {
						this.deadArrows[i].pos.y += this.speed;
						this.deadArrows[i].forePoint.y += this.speed;
						this.deadArrows[i].backPoint.y += this.speed;
					}
				}
			}
		}
	}, {
		key: "addArrow",
		value: function addArrow(arrow) {
			this.deadArrows.push({
				"forePoint": new Point(arrow.forePoint.x, arrow.forePoint.y),
				"backPoint": new Point(arrow.backPoint.x, arrow.backPoint.y),
				"pos": new Point(arrow.pos.x, arrow.pos.y),
				"angle": arrow.angle
			});
		}
	}, {
		key: "move",
		value: function move() {

			this.state = "moving";
			var leftBound = this.parent.canvas.width / 3; //last of 3 parts
			var rightBound = 5 * this.parent.canvas.width / 6; //last of 6 parts
			var upBound = this.parent.canvas.height / 8; // first of 8 parts
			var downBound = 7 * this.parent.canvas.height / 8; // last of 8 parts
			this.moveDestination = new Point(ut.random(leftBound, rightBound), ut.random(upBound, downBound));
			console.log(this.moveDestination);
		}
	}]);

	return Target;
}();