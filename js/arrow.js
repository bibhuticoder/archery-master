"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arrow = function () {
	function Arrow(parent, ctx) {
		_classCallCheck(this, Arrow);

		this.parent = parent;
		this.ctx = ctx;
		this.X = 100;
		this.Y = 425;
		this.pos = new Point(this.X, this.Y);
		this.forePoint = new Point(0, 0);
		this.backPoint = new Point(0, 0);
		this.velocity = new Point(18, -8); //arbitary point
		this.state = "rest"; // up - down
		this.GRAVITY = 0.4;
		this.A = 0.01;
		this.power = 0;
		this.angle = 0;
	}

	_createClass(Arrow, [{
		key: "draw",
		value: function draw(ctx) {

			//draw arrow
			if (this.state !== "dead") {

				var distance = 30;
				this.angle = Math.atan(this.velocity.y / this.velocity.x);

				if (this.angle === 0) {
					this.backPoint = new Point(this.pos.x - distance / 4, this.pos.y);
					this.forePoint = new Point(this.pos.x + distance * 2, this.pos.y);
				}

				//according to (power/5)
				this.backPoint = new Point(this.pos.x - distance / 4 * Math.cos(this.angle) - this.power / 5 * Math.cos(this.angle), this.pos.y - distance / 4 * Math.sin(this.angle) - this.power / 5 * Math.sin(this.angle));
				this.forePoint = new Point(this.pos.x + 2 * distance * Math.cos(this.angle) - this.power / 5 * Math.cos(this.angle), this.pos.y + 2 * distance * Math.sin(this.angle) - this.power / 5 * Math.sin(this.angle));
			}

			if (this.state === "flying") {
				this.pos.x += this.velocity.x;
				this.pos.y += this.velocity.y;
				this.velocity.x += this.A;
				this.velocity.y += this.GRAVITY;
			}

			//bow
			if (this.state === "rest") {
				var bowLength = 35;
				var bowHeight = 25;
				var x = 100,
				    y = 425;
				//100, 475


				var start = new Point(x - bowLength * Math.cos(this.angle - Math.PI / 2), y - bowLength * Math.sin(this.angle - Math.PI / 2));
				var end = new Point(x + bowLength * Math.cos(this.angle - Math.PI / 2), y + bowLength * Math.sin(this.angle - Math.PI / 2));
				var mid = new Point((start.x + end.x) / 2, (start.y + end.y) / 2);

				var offset = 30;
				var cp1 = new Point(start.x + offset * Math.cos(this.angle), start.y + offset * Math.sin(this.angle));
				var cp2 = new Point(end.x + offset * Math.cos(this.angle), end.y + offset * Math.sin(this.angle));

				// this.ctx.beginPath();
				// this.ctx.fillStyle = "red";
				// this.ctx.arc(cp1.x, cp1.y, 5, 0, 2*Math.PI);
				// this.ctx.arc(cp2.x, cp2.y, 5, 0, 2*Math.PI);				
				// this.ctx.fill();


				var fMid = new Point(mid.x + offset * Math.cos(this.angle), mid.y);

				// console.log(start);

				//bow curve
				this.ctx.beginPath();
				this.ctx.strokeStyle = "black";
				this.ctx.lineWidth = 5;
				this.ctx.moveTo(start.x, start.y);
				this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
				//this.ctx.lineTo(end.x, end.y);
				//this.ctx.bezierCurveTo(x, start.y-bowHeight, bowLength, start.y-bowHeight, end.x, end.y);
				this.ctx.stroke();

				// //mid circles
				// this.ctx.beginPath();
				// this.ctx.fillStyle = "black";
				// this.ctx.arc(mid.x, mid.y, 5, 0, 2*Math.PI);			
				// this.ctx.fill();

				//end circles
				this.ctx.beginPath();
				this.ctx.fillStyle = "black";
				this.ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
				this.ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);
				this.ctx.fill();

				//string
				this.ctx.beginPath();
				this.ctx.strokeStyle = "gray";
				this.ctx.lineWidth = 1;
				this.ctx.moveTo(start.x, start.y);
				this.ctx.lineTo(this.backPoint.x, this.backPoint.y);
				this.ctx.lineTo(end.x, end.y);
				this.ctx.stroke();
			}

			//arrowline
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.shadowBlur = 1;
			this.ctx.strokeStyle = "whitesmoke";
			this.ctx.moveTo(this.backPoint.x, this.backPoint.y);
			this.ctx.lineTo(this.pos.x, this.pos.y);
			this.ctx.lineTo(this.forePoint.x, this.forePoint.y);
			this.ctx.stroke();
			this.ctx.shadowBlur = 0;

			//arrowHead
			var headlen = 10;
			this.ctx.beginPath();
			this.ctx.moveTo(this.forePoint.x, this.forePoint.y);
			this.ctx.fillStyle = "gray";
			this.shadowBlur = 1;
			this.ctx.lineTo(this.forePoint.x - headlen * Math.cos(this.angle - Math.PI / 9), this.forePoint.y - headlen * Math.sin(this.angle - Math.PI / 9));
			this.ctx.lineTo(this.forePoint.x - headlen * Math.cos(this.angle + Math.PI / 9), this.forePoint.y - headlen * Math.sin(this.angle + Math.PI / 9));
			this.ctx.moveTo(this.forePoint.x, this.forePoint.y);
			this.ctx.fill();
			this.ctx.closePath();

			//root
			var rootLen = 12;
			var rootWid = 4;
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.translate(this.backPoint.x, this.backPoint.y);
			this.ctx.rotate(Math.atan2(this.forePoint.y - this.backPoint.y, this.forePoint.x - this.backPoint.x));
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
	}, {
		key: "checkBoundary",
		value: function checkBoundary(canvas) {

			//top
			if (this.forePoint.y < 0) {
				this.state = "dead";
			}

			//bottom
			else if (this.forePoint.y > canvas.height) {
					this.state = "dead";
				}

				//right
				else if (this.forePoint.x > canvas.width) {
						this.state = "dead";
					}

					//left
					else if (this.forePoint.x < 0) {
							this.state = "dead";
						}

			if (this.state === "dead") {
				home("restart", this.parent.score);
				this.parent.reset();
			}
		}
	}, {
		key: "reset",
		value: function reset() {
			this.pos.x = this.X;
			this.pos.y = this.Y;
			this.state = "rest";
		}
	}, {
		key: "checkCollission",
		value: function checkCollission(target) {

			if (this.state === "flying") {
				var arr = target.ellipses;
				var zone;
				if (ut.checkInEllipse(this.forePoint.x, this.forePoint.y, arr[0].h, arr[0].k, arr[0].rx, arr[0].ry)) {
					zone = "white";
					if (ut.checkInEllipse(this.forePoint.x, this.forePoint.y, arr[1].h, arr[1].k, arr[1].rx, arr[1].ry)) {
						zone = "blue";
						if (ut.checkInEllipse(this.forePoint.x, this.forePoint.y, arr[2].h, arr[2].k, arr[2].rx, arr[2].ry)) {
							zone = "red";
							if (ut.checkInEllipse(this.forePoint.x, this.forePoint.y, arr[3].h, arr[3].k, arr[3].rx, arr[3].ry)) {
								zone = "yellow";
							}
						}
					}

					this.state = "dead";
					if (zone === "white") this.parent.score += 1;else if (zone === "blue") this.parent.score += 2;else if (zone === "red") this.parent.score += 3;else if (zone === "yellow") this.parent.score += 4;

					var self = this;
					self.parent.target.addArrow(self); //add it immediately to hide delay
					self.reset();
					setTimeout(function () {
						self.parent.target.move();
					}, 200);
				}
			}
		}
	}, {
		key: "launch",
		value: function launch(angle, power) {
			this.state = "flying";
			console.log(angle);
		}
	}]);

	return Arrow;
}();