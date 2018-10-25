var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var innerWidth = window.innerWidth,
    innerHeight = window.innerHeight,
    array = [],
    mouse = {
        x: innerWidth/2,
        y: innerHeight/2
    },
    colorArray = ['#FFFA87','#FF625A','#FFAA6E','#C1C2E9','#3E98A8'];

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.minRadius = radius;
    this.radian = Math.random()* Math.PI *2;
    this.distanceFromCenter = getRandomNumber(80,200);
    this.lastMouseLocation = {x:x, y:y}; 

    this.draw = (lastLocation) => {
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastLocation.x,lastLocation.y);
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.update = () => {

        const lastLocation = {x:this.x, y:this.y};

        this.radian+=0.08;

        //drag effect on mouse move
        this.lastMouseLocation.x += (mouse.x - this.lastMouseLocation.x) * 0.02;
        this.lastMouseLocation.y += (mouse.y - this.lastMouseLocation.y) * 0.02;

        //for circular motion
        this.x = this.lastMouseLocation.x + Math.cos(this.radian)*this.distanceFromCenter;
        this.y = this.lastMouseLocation.y + Math.sin(this.radian)*this.distanceFromCenter;

        this.draw(lastLocation);
    }
}

function createCircles(){
    for (let i = 1; i <= 50; i++) {
        var x = (innerWidth/2),
            y = (innerHeight/2),
            radius = (Math.random()*2)+1;
        array.push(new Circle(x, y, radius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    //creating mouse trail
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < array.length; i++) {
        array[i].update();
    }
}

//to capture location of mouse pointer
window.addEventListener('mousemove', (event)=>{
    mouse.x= event.x;
    mouse.y= event.y;
})

//to resize the canvas
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
    array=[];
    createCircles();
})


createCircles();
animate();