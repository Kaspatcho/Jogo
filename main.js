let player
let shots = []
let enemies = []
let enemyCount = 18
let running = true
let playerWin = false

function setup(){
    createCanvas(600, 600)
    player = new Circle(30, height - 50, "#f0f")
    for(let i=0; i < enemyCount; i++) enemies.push(new Enemy(random(width - 50), random(height - 50), "#f00"))
}

function draw(){
    if(running){
        background(0)
        hitCircles()
        player.draw()
        player.move()
        enemies.map(enemy => enemy.draw())
        shots.map((shot, index) => {
            shot.draw();
            shot.move();
            if(shot.come) shots.splice(index, 1)
        })
        checkWinner()
    } else if(!playerWin){
        push()
        fill(255)
        text("Você perdeu!", width/2, height/2)
        pop()
    } else{
        push()
        fill("#0f0")
        text("Você venceu!", width/2, height/2)
        pop()
    }
}

function mousePressed(){
    player.shot(mouseX, mouseY)
}

function keyPressed({key}){
    notiFyAll(key.toLowerCase(), true)
}

function keyReleased({key}){
    notiFyAll(key.toLowerCase(), false)
}

function hitCircles(){
    shots.map((shot, shotIndex) => {
        enemies.map((enemy, enemyIndex) => {
            if(shot.hit(enemy)){
                enemies.splice(enemyIndex, 1)
                shots.splice(shotIndex, 1)
            }
        })
        if(shot.hit(player)) running = false;
    })
}

function checkWinner(){
    if(enemies.length <= 0) {playerWin = true; running = false}
}

function tryToKillPlayer(){
    enemies.map(enemy => enemy.tryToKillTarget(player))
}

function notiFyAll(key, pressed){
    setPlayerDirection(key, pressed);
}

function setPlayerDirection(key, pressed){
    const dir = {
        "w" : () => player.setDir(undefined, (pressed) ? -1 : 0),
        "s" : () => player.setDir(undefined, (pressed) ? 1 : 0),
        "d" : () => player.setDir((pressed) ? 1 : 0, undefined),
        "a" : () => player.setDir((pressed) ? -1 : 0, undefined)
    }
    if(Object.keys(dir).includes(key)) dir[key]()
}


setInterval(tryToKillPlayer, 700)
