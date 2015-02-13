/* This num get from real test on device */
var _normal = 10;
var _medium = 20;
var _fast = 30;

/*
	@Funtion name: Croll
	@Use : to croll div from begin to end
	@Para :
		begin : begin position
		end : end position
		direction : 0 if croll left and right
					1 if croll up and down
		div : the div object will be crolled
*/

function Croll(begin,end,direction,div){
	var my = this;
	this.begin = begin;
	this.end = end;
	this.direction = direction;
	this.div = div;
	this.isMouse = false;
	this.x; this.y; this.dx1; this.dx2; this.dy1; this.dy2; this.d;
	
	this.inti = function(){
		div.addEventListener("touchstart",my.MouseDown,false);
		div.addEventListener("touchmove",my.MouseMove,false);
		div.addEventListener("touchend",my.MouseUp,false);
		div.addEventListener("mousedown",my.MouseDown,false);
		div.addEventListener("mousemove",my.MouseMove,false);
		div.addEventListener("mouseup",my.MouseUp,false);
	};
	
	this.MouseDown = function(e){
		var evt = (e?e:(window.event));
		my.isMouse = true;
		if(evt.clientX) {
			my.x = evt.clientX;
			my.y = evt.clientY;
		}
		else{
			my.x = evt.changedTouches[0].clientX;
			my.y = evt.changedTouches[0].clientY;
		}
		my.dx1 = null;
		my.dx2=null;
		my.dy1=null;
		my.dy2=null;
	};
	// 
	this.MouseMove = function(e){
		if(my.isMouse == true){
			var evt = (e?e:(window.event));
			var x,y;
			evt.preventDefault();
			// Move left right
			if(my.direction == 0){
				if(evt.clientX) x = evt.clientX;
				else x = evt.changedTouches[0].clientX;
				my.MoveLeftRight(x);
				my.x = x;
			}
			// Move up down
			else{
				if(evt.clientY) y = evt.clientY;
				else y = evt.changedTouches[0].clientY;
				my.MoveUpDown(y);
				my.y = y;
			}
		}
	};
	
	this.MouseUp = function(){
		my.isMouse = false;
		// Move left right
		//if(my.direction == 0 ) my.ExMoveLeftRight(my.dx1,my.dx2);
		// Move up down 
		y.ExMoveUpDown(my.dy1,my.dy2);
	};
	
	this.CheckLimit = function(d){
		if(d < my.begin) return my.begin;
		if(d > my.end) return my.end;
		if((d <= my.end)&&(d >= my.begin)) return d;
		else return ;
	};
	
	this.MoveLeftRight = function(x){
		my.dx1 = my.dx2;
		my.dx2 = x - my.x;
		if(!my.dx1) my.dx1 = my.dx2;
		my.d = my.div.offsetLeft + my.dx2;
		my.d = my.CheckLimit(my.d);
		my.div.style.webkitTransitionDuration = '0ms';
		my.div.style.left = my.d + 'px';
	};
	
	this.MoveUpDown = function(y){
		my.dy1 = my.dy2;
		my.dy2 = y - my.y;
		my.d = my.div.offsetTop + my.dy2;
		my.d = my.CheckLimit(my.d);
		my.div.style.top = my.d + 'px';
	};
	
	this.ExMoveLeftRight = function(x1,x2){
		var d = x2-x1;
		var d1 = Math.abs(d);
		if(d1<=20) my.d = d*20;
		if((d1>20)&&(d1<=30)) my.d = d*30;
		if(d1>30) my.d = d*40;
		x1 = Math.abs(x1);
		x2 = Math.abs(x2);
		if(x2>x1){
			my.d = my.div.offsetLeft + my.d;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.left = my.d + 'px';
		}
		else{
			my.d = my.div.offsetLeft + x2;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.left = my.d + 'px';
		}
	};
	
	this.ExMoveUpDown = function(y1,y2){
		var d = y2-y1;
		var d1 = Math.abs(d);
		if(d1<10) my.d = d*10;
		if((d1>10)&&(d1<=20)) my.d = d*20;
		if((d1>20)&&(d1<=30)) my.d = d*30;
		if(d1>30) my.d = d*40;
		y1 = Math.abs(y1);
		y2 = Math.abs(y2);
		if(y2>y1){
			my.d = my.div.offsetTop + my.d;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.top = my.d + 'px';
		}
		else{
			my.d = my.div.offsetTop + y2;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.top = my.d + 'px';
		}
	};
	
	this.inti();
	
}