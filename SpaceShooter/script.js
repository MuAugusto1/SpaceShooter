const yourship = document.querySelector('.player');
const area = document.querySelector('#main-area');
const alienImg = ['img/monster-1.png','img/monster-2.png','img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;

function fly(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    } else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

function moveUp(){
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if(topPosition === '0px')
        return
    else{
        let position = parseInt(topPosition);
        position -= 30;
        yourship.style.top = `${position}px`;
    }
}

function moveDown(){
    let topPosition = getComputedStyle(yourship).getPropertyValue('top');
    if(topPosition === '550px')
        return
    else{
        let position = parseInt(topPosition);
        position += 30;
        yourship.style.top = `${position}px`;
    }
}

function fireLaser(){
    let laser = createLaser();
    area.appendChild(laser);
    moveLaser(laser);
}

function createLaser(){
    let Xpos = parseInt(window.getComputedStyle(yourship).getPropertyValue('left'));
    let Ypos = parseInt(window.getComputedStyle(yourship).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left =`${Xpos}px`;
    newLaser.style.top  = `${Ypos - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserTime= setInterval(()=>{
        let xPosition = parseInt(laser.style.left); 
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach(alien4=>{
            if(colision(laser,alien4)){
                alien4.src = 'img/explosion.png';
                alien4.classList.remove('alien');
                alien4.classList.add('dead');
            }
        });
        
        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPosition+8}px`;
        }
    },10)
}

function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = alienImg[Math.floor(Math.random()*alienImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-t');
    newAlien.style.left = '400px'
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 40}px`;
    area.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien){
    let alienTime = setInterval(()=>{
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        
        if(xPosition <= 40){
            if(Array.from(alien.classList).includes('dead')){
                alien.remove();
            }else{
                gameOver();
            }
        }else{
            alien.style.left = `${xPosition-4}px`;
        }
    },15)
}

function colision(laser,alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left); 
    let laserBottom = laserTop-20;
    let alienTop = parseInt(alien.style.top);
    let AlienLeft = parseInt(alien.style.left); 
    let AlienBottom = alienTop-40;
    if(laserLeft != 340 && laserLeft + 40 >= AlienLeft){
        if(laserTop <= alienTop && laserTop >= AlienBottom){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', fly);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

function gameOver() {
    window.removeEventListener('keydown', fly);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over! O_o');
        yourship.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}

