const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleArray = []

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x : undefined,                  //not null => blank canvas when starts
    y : undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 10; i++){
        particleArray.push(new Particle());   
    }                                  
})
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 2; i++){
        particleArray.push(new Particle());   
    }
})


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;    
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;              //random no between 1 and 6
        this.speedX = Math.random() * 3 - 1.5;          //random between -1.5 and 1.5 direction and speed/ positive no? moves only to the right left right moves
        this.speedY = Math.random() * 3 - 1.5;          //up and down...
    }   
    update() {                                           // change x an y coordinates 
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;           //shrink down as they move around
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;                                             
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI * 2);                          //x, y => center point , radius, start angle..
        //ctx.stroke()
         ctx.fill();                                                    //fill the circle with a color
    }                                          

}

// function init () {
//     for(let i = 0; i < 100; i++){
//         particleArray.push(new Particle())
//     }
// }
// init();


function handleParticles () {
    for (let i = 0; i < particleArray.length; i++){
        console.log(particleArray[i]);
        particleArray[i].update();
        particleArray[i].draw();
        
        for (let j = 0; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            console.log(dx,dy);
            const distance = Math.sqrt(dx * dx + dy * dy) ;          //Pitagoras!!
            if (distance < 100) {
                ctx.beginPath() ;
                ctx.strokeStyle = 'yellow';                                    //start drawing a line
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[i].x, particleArray[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particleArray[i].size <= 0.3){
            particleArray.splice(i,1)                           //remove one particular element
            i--;                                                //adjust index in for loop
        }
    }
}


function animate (){
    ctx.clearRect(0,0, canvas.width, canvas.height);     //clear old ?
    handleParticles();
    requestAnimationFrame(animate);                                   //calls function only once creating a loop
}
animate()                                               //animation folows an mouse on screen



