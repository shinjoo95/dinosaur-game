var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


// 네모 그리는 법
// ctx.fillStyle = 'green';
// ctx.fillRect(10,10,100,100); //왼쪽 위에서 부터 10,10 좌표에다가 100X100 사이즈의 네모를 그림
// var img2 = new Image();
// img2.src = 'dinosaur.png';
//등장 캐릭터의 속성부터 object 자료에 정리해두면 편리함
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y ,this.width, this.height);
        // ctx.drawImage(img2, this.x, this.y)
    },
    jump(){
        this.y -= 1;
    }, 
    fall(){
        if(this.y < 200){
            this.y += 1
        }
    }
}

var img1 = new Image();
img1.src = 'cactus.png';

//장애물 object
class Cactus{
    constructor(){
        this.x = 600;   //왼쪽에서부터 600px
        this.y = 200;   //위에서부터 200px
        this.width = 50;
        this.height = 50;
    }
        draw(){
            ctx.fillStyle = 'red';
            // ctx.fillRect(this.x, this.y, this.width, this.height); //히트박스
            ctx.drawImage(img1, this.x, this.y)    
    }
}

//1초에 60번 코드 실행하기 자동으로 우측으로 이동 
//모니터 fps에 따라 다름
var timer = 0;
cactus여러개 = [];
var jumptimer = 0;
var animate;

function frame(){
    animate = requestAnimationFrame(frame);   //1초에 60번 실행하여 애니메이션을 만들수 있는 기본 함수 

    ctx.clearRect(0, 0, canvas.width, canvas.height); //잔상 지우기 
    
    //장애물은 2~3초마다
    //장애물 여러개 관리 
   if(timer % 180 === 0){           //180프레임 마다 장애물을 소환하여 array에 보관
    var cactus = new Cactus();
    cactus여러개.push(cactus);
    }
    timer++;

    cactus여러개.forEach((a, i , o)=>{     //반복문을 돌려 왼쪽으로 이동 
        //왼쪽이동을 마친 장애물 제거 
        if(a.x < 0){         //장애물의 x좌표가 0이하면 제거 
            o.splice(i,1);
        }
    })

    cactus여러개.forEach((a)=>{ 
        a.x-=2;
        a.draw();
        충돌(dino, a);       //dino와 모든 장애물을 충돌 체크해야되기 때문에 반복문에 삽입 
    })

    if(jump == true){       //스페이스바 눌렀을 시 점프 실행 
        dino.jump();
        jumptimer++;
    }else if(jump == false){      //점프중이 아니면 내려오기 
       jumptimer = 0;
       dino.fall();
        }
    if(jumptimer > 100){    //100프레임이 지나면 점프 그만해주세요
        jump = false;
    }
    
    dino.draw()
}

//겜시작
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var cactus = new Cactus
frame();


//충돌 확인
function 충돌(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);  //장애물의 왼쪽, dino의 오른쪽 x축 빼기
    var y축차이 = cactus.y - (dino.y + dino.height); //장애물의 위쪽, dino의 아래쪽 y축
   
    if (x축차이 < 0 && y축차이 < 0){        //옆, 위 모두 감지
        ctx.clearRect(0,0, canvas.width, canvas.height)
        cancelAnimationFrame(animate);        //충돌시 게임 정지 

    }
}   


var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jump = true;
    }
})

