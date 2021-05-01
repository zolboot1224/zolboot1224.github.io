const canvas = document.getElementById("pong");
const ctx = canvas.getContext('2d');

// havtan
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// toglogchiin havtan
const user = {
    x : 0, 
    y : 250, 
    width : 15,
    height : 120,
    score : -1,
    color : "blue"
}

// goliin zuraas
const net = {
    x : 400,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// computeriin havtan
const com = {
    x : canvas.width - 15 , 
    y : canvas.height - 0, 
    width : 15,
    height : 120,
    score : 0,
    color : "red"
}
// bombog
const ball = {
    x : canvas.width,
    y : canvas.height,
    radius : 13,
    velocityX : 5,
    velocityY : 5,
    color : "white"
}



// bombog
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// mosue iin daguu hodloh
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

// bombog dahin ehleh
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
}

// dagaj hodloh
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// goliin zuraas 
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// text
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}




function update(){
    if( ball.x - ball.radius < 0 ){
        com.score++;
       
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();
    }
    
    // бөмбөгний хөдөлгөөн 
    ball.x += ball.velocityX;
    ball.y += ball.velocityY; 
    
    com.y += ((ball.y - (com.y + com.height/2)));
    

    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        
    }
    
    
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    

    if(collision(ball,player)){
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        

        ball.speed += 0.1;
    }
}


function render(){
    drawRect(0, 0, canvas.width, canvas.height, "green");
    drawText(user.score,canvas.width/4,canvas.height/5);
    drawText(com.score,3*canvas.width/4,canvas.height/5);
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
    update();
    render();
}

let framePerSecond = 100;

let loop = setInterval(game,1000/framePerSecond);

