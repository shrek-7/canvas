var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx = canvas.getContext('2d');

var x = 100,
    y = 100,
    vx = 5,
    vy = 5,
    radius = 70,
    innerWidth = window.innerWidth,
    innerHeight = window.innerHeight,
    array = [],
    k = -1,
    mouseClick = {
        x: undefined,
        y: undefined
    },
    mouse = {
        x: undefined,
        y: undefined
    },
    maxRadius=20,
    colorArray = ['#F01A30','#F04A58','#FFF7FA','#71DDE3','#0396A6'];

function Circle(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.minRadius = radius;

    this.draw = () => {
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle=this.color;
        ctx.fill();
    }

    this.update = () => {
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
            this.vx = -this.vx;
        }
        if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;

        if((mouse.x - this.x < 30 && mouse.x - this.x > -30) && (mouse.y - this.y < 30 && mouse.y - this.y > -30)){
            if(this.radius < maxRadius){
                this.radius++;
            }
        }else if(this.radius > this.minRadius){
            this.radius--;
        }

        /* for moving particles away from mouse click.

        // if((mouseClick.x - this.x < 200 && mouseClick.x - this.x > -200) && (mouseClick.y - this.y < 200 && mouseClick.y - this.y > -200)){
        //     if(mouseClick.x - this.x > 0){
        //         this.x-=1;
        //     }else{
        //         this.x+=1;
        //     }

        //     if(mouseClick.y - this.y > 0){
        //         this.y-=1;
        //     }else{
        //         this.y+=1;
        //     }  
        // }

        */
        this.draw();
    }
}

function createCirclesOnMouseMove(xPos, yPos) {
    var vx = (Math.random() - 0.5) * 1 * k,
            vy = (Math.random() - 0.5) * 1 * k,
            radius = (Math.random()*3 + 1);
            k = k * -1;
    array.push(new Circle(xPos, yPos, vx, vy, radius));
}

function createCircles(){
    for (let i = 1; i < 800; i++) {
        var x = ((Math.random() * innerWidth) - radius * 2) + radius,
            y = (Math.random() * innerHeight) - radius * 4,
            vx = (Math.random() - 0.5) * 1 * k,
            vy = (Math.random() - 0.5) * 1 * k,
            radius = (Math.random()*3 + 1);

        k = k * -1;
        array.push(new Circle(x, y, vx, vy, radius))
    }
}



// console.log(array);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 1; i < array.length; i++) {
        array[i].update();
    }
}

//to capture location of mouse pointer
window.addEventListener('mousemove', (event)=>{
    mouse.x= event.x;
    mouse.y= event.y;
    if(array.length<800){
        createCirclesOnMouseMove(event.x,event.y);
    }
    
})

window.addEventListener('click', (event)=>{
    array.length = 0;
})

// to capture click event.
// window.addEventListener('click', (event)=>{
//     mouseClick.x = event.x;
//     mouseClick.y = event.y;
//     setTimeout(function(){ mouseClick.x=undefined;mouseClick.y=undefined }, 1000);
// })

//to resize the canvas
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    innerHeight = window.innerHeight;
    innerWidth = window.innerWidth;
    array=[];
    createCircles();
})


// createCircles();
animate();