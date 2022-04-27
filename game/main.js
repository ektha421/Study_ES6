const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}


class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

const cactus = new Cactus();

cactus.draw();

let timer = 0;
let cactusArr = [];
let isJumping = false;
let jumpTimer = 0;
let animation;

function frame(){
    //초에 60번 애니메이션
    animation = requestAnimationFrame(frame);
    timer++; 

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(timer % 200 === 0){
    const cactus = new Cactus();
        cactusArr.push(cactus);
        cactus.draw();
    }

    cactusArr.forEach((v,i,o) => {
        //x좌표가 0미만이면 제거
        if(v.x < 0){
            o.splice(i,1);
        }
        collision(dino,v);
        v.x --;
        v.draw();
    });

     if(isJumping == true){
        dino.y-=1;
        jumpTimer++;
     }

     if(isJumping == false){
         if(dino.y < 200){
            dino.y++;       
         }
     }

     if(jumpTimer > 100){
         isJumping = false;
         jumpTimer = 0;
     }

    dino.draw();
}

frame();


//충돌 확인
function collision(dino, cactus){
    let x = cactus.x - (dino.x + dino.width);
    let y = cactus.y - (dino.y + dino.height);
    if(x < 0 && y < 0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

 
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        isJumping = true;
    }
})