class Util{
	constructor(){

	}

	getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    var marginTop = canvas.style.marginTop;
	    var border = canvas.style.borderWidth;

	    var x = evt.clientX - rect.left;
	    var y = evt.clientY - rect.top - marginTop
    

	    return new Point(x, y);	    
	}

	random(min, max){        
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getDistance(i, f){
		return Math.abs(Math.sqrt(Math.pow((f.x-i.x), 2) + Math.pow((f.y-i.y), 2)));
	}

	getAngle(p1, p2){

		//p2 always greater than p1
		var d1 = this.getDistance(p1, new Point(0, canvas.height));
		var d2 = this.getDistance(p2, new Point(0, canvas.height));
		if(d1 > d2){
			var tmp = p1;
			p1 = p2;
			p2 = tmp;
		}

        return ((Math.atan2(p2.y - p1.y, p2.x - p1.x)));
    }

	getAngleFormat(p1, p2){
        return (180-(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI));
    }

    checkInEllipse(x, y, h, k, rx, ry){
    	
    		var a = (Math.pow((x-h), 2)/(rx*rx));
	    	var b = (Math.pow((y-k), 2)/(ry*ry));

	    	return((a+b)<1);
    	

    }



}