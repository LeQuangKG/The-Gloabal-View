/*
    0 : Latin American 79 
    1 : North American 91
    2 : Western Europe 43
    3 : Eastern Europe 43
    4 : Southern Europe 33
    5 : Middle East 33
    6 : Affica 33
    7 : South Asia 16
    8 : Asia Pacific 0
    9 : Oceania 0
*/
var rotate;
var pos = [79,93,45,45,33,33,33,16,0,0];
var img = [];
var popup = null;
var closeBut = null;
var have = false;
var pic;
var black;
var text1, text2, text4,text6, text7;
var croller;
var beg=-80, end=0;
var show ;

function LoadImg(){
    for(i=0; i<10; i++){
        img[i] = new Image();
        img[i].src = i+'.png';
    }
}

function CreateScroll(){
    Croll(beg,end,1,div)
}

function AddPopup(n){
    if(n==1) {
        croller.appendChild(text1);
        new iScroll(croller);
        show.style.opacity = 1;
    }
    else if(n==2){
        croller.appendChild(text2);
        new iScroll(croller);
        show.style.opacity = 1;
    }
    else if(n==4){
        croller.appendChild(text4);
        new iScroll(croller);
        show.style.opacity = 1;
    }
    else if(n==6){
        croller.appendChild(text6);
        new iScroll(croller);
        show.style.opacity = 1;
    }
    else if(n==7){
        croller.appendChild(text7);
        new iScroll(croller);
        show.style.opacity = 1;
    }
    else {
        croller.innerHTML = '';
        show.style.opacity = 0;
    }
    popup.src = img[n].src;
    document.body.appendChild(black);
    document.body.appendChild(popup);
    document.body.appendChild(closeBut);
    document.body.appendChild(croller);
    
    setTimeout(function(){
        popup.style.opacity = 1;
        closeBut.style.opacity = 1;
        croller.style.opacity = 1;
        
    },50);
    have = true;
}


function ClosePopup(){
    if(have==true){
        popup.style.opacity = 0;
        closeBut.style.opacity = 0;
        croller.style.opacity = 0;
        setTimeout(function(){
            document.body.removeChild(popup);
            document.body.removeChild(closeBut);
            document.body.removeChild(black);
            document.body.appendChild(croller);
            //document.body.appendChild(show);
        },200);
        show.style.opacity = 0;
        croller.innerHTML = '';
        have = false;
    }
    
}