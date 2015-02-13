/*
	Function make 360 view with seri picture
	@argument:
		div : div will append 360 view
		imgFolder : path of seri picture
		imgCount : total of puture
		style : style of 360 view
*/
function Move360(div,imgFolder,imgCount,style){
	var my = this;
	this.div = div;
	this.imgFolder = imgFolder;
	this.imgCount = imgCount;
	this.img = [];
	this.imgDiv;
	this.end = 0;
	this.style = style;
	this.x; this.dx, this.curX;
	this.timer = 0;
        this.current = 0;
	this.drag= false;
	this.flatform;
	this.delay = 10;
	this.clock = 0;
	this.auto = 0;
	this.limit = 0;
	this.curImg = 0;
	this.init = function(){		
		my.flatform = navigator.platform;
		my.LoadImg();
		my.imgDiv = document.createElement('img');
                my.imgDiv.src = my.img[0].src;
                my.imgDiv.className = my.style;
		my.imgDiv.useMap = 0;
                my.div.appendChild(my.imgDiv);
		if(my.flatform=='iPad'){
			my.imgDiv.addEventListener('touchstart', my.TouchStart, false);
			my.imgDiv.addEventListener('touchmove', my.TouchMove, false);
			my.imgDiv.addEventListener('touchend', my.TouchEnd, false);
			
		}
		else{
			my.div.addEventListener('mousedown', my.TouchStart, false);
			my.div.addEventListener('mousemove', my.TouchMove, false);
			my.div.addEventListener('mouseup', my.TouchEnd, false);		
		}
		my.auto = setTimeout(function(){my.AutoRotate()},1000,my);
	};
	
	this.LoadImg = function(){
		for(var i=0; i< my.imgCount; i++){
			my.img[i] = new Image();
			my.img[i].src = my.imgFolder+(i)+'.jpg';
                        
		}		
	};
	
	this.randomPic = function(){
		var c = -Math.ceil(my.current % my.imgCount);
		if (c < 0) c += (my.imgCount - 1);
		return c;
	};
	
	this.showImg = function(){
		var c = my.randomPic();
		my.imgDiv.src = my.img[c].src;
		my.imgDiv.useMap = c;
		my.curImg = c;
	};
	
	this.Rotale = function(){
		if(my.drag==true){
			my.dx = -my.curX + my.x;
			if(my.clock < new Date().getTime() - my.delay) {
				my.end = my.current + Math.ceil((my.imgCount - 1) * 15 * (my.dx /1024));				
				my.CallEffect();
				my.clock = new Date().getTime();
			}
			
		}
		my.x = my.curX;
	};
	
	this.AutoRotate = function(){
		my.current = my.current+1;
		if(my.current== my.imgCount) my.current = 0;
		my.imgDiv.src = my.img[my.current].src;
		my.imgDiv.useMap = my.current;
		my.curImg = my.current;
		my.auto = setTimeout(my.AutoRotate,50,my);
	};
	
	this.RotateLimit = function(n){
		if(my.current==my.end||my.current == my.end-1||my.current==my.end-2){
			clearInterval(my.limit);
			my.imgDiv.src = my.img[my.current].src;
			my.imgDiv.useMap = my.current;
			AddPopup(pic);
			my.limit = 0;
		}
		else{
			my.current = my.current+3;
			if(my.current>= my.imgCount) my.current = 0;
			my.imgDiv.src = my.img[my.current].src;
			my.imgDiv.useMap = my.current;
			//my.limit = setInterval(my.RotateLimit,100,my);
			
		}
	}
	
	this.DoEffect = function(){
		if(my.current != my.end){
			var next = my.end < my.current ? Math.floor((my.end - my.current) * 0.1) : Math.ceil((my.end - my.current) * 0.1);
			my.current += next;
			my.showImg();
		}
		else {
			//my.imgDiv.src = my.img[my.current].src;
			clearInterval(my.timer);
			my.timer = 0;
		}
	};
	
	this.CallEffect = function(){
		if (my.timer=== 0) {
			my.timer = setInterval(my.DoEffect, Math.round(1000 / 60),my);
			//my.DoEffect();
		}
	};
	
	this.RotateTo = function(n){
		clearTimeout(my.auto);
		clearInterval(my.timer);
		my.end = pos[n];
		pic = n;
		my.current = my.curImg;
		if(have == true){
			popup.style.opacity = 0;
			closeBut.style.opacity = 0;
			setTimeout(function(){
			    document.body.removeChild(popup);
			    document.body.removeChild(closeBut);
			},50);
		}
		else{
			AddPopup(pic);
		}
		//console.log(n);
		//my.CallEffect();
		//if(my.limit==0) {
			//my.limit = setInterval(my.RotateLimit,10,my);
		//}
		//my.RotateLimit();
	};

	this.TouchStart = function(e){
		e.preventDefault();
		clearTimeout(my.auto);
		if(my.flatform == 'iPad'){
			my.x = e.changedTouches[0].clientX;	
		}
		else{
			my.x = e.clientX;	
		}
		my.drag = true;
	
	};
	
	this.TouchMove = function(e){
		e.preventDefault();
		if(have==true||my.limit!=0) return;
		if(my.flatform=='iPad'){
			my.curX = e.changedTouches[0].clientX;
		}
		else{
			my.curX = e.clientX;		
		}
		my.Rotale();
	};
	
	this.TouchEnd = function(){
		my.drag = false;
	};
	
	this.init();
	 
}


