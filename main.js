var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// //네모 그리는 법
// ctx.fillStyle = 'green';
// ctx.fillRect(10,10,100,100); //왼쪽 위에서 부터 10,10 좌표에다가 100X100 사이즈의 네모를 그림
//등장 캐릭터의 속성부터 object 자료에 정리해두면 편리함

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y ,this.width, this.height);
    }
}

class Cactus{
    constructor(){
        this.x = 500;   //왼쪽에서부터 500px
        this.y = 200;   //위에서부터 200px
        this.width = 50;
        this.height = 50;
    }
        draw(){
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);     
    }
}

//1초에 60번 코드 실행하기 자동으로 우측으로 이동 
//모니터 fps에 따라 다름
var timer = 0;
var cactus여러개 = [];

function frame(){
    requestAnimationFrame(frame);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //잔상 지우기 
    //장애물은 2~3초마다
    //장애물 여러개 관리 
   if(timer % 120 === 0){ 
    var cactus = new Cactus();
    cactus여러개.push(cactus);
    }
    cactus여러개.forEach((a)=>{
        a.x--;
        a.draw();
    })
    
    dino.draw()
}
frame();