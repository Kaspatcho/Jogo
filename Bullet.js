class Bullet{
    constructor(x, y, shooter){
        this.x = x
        this.y = y
        this.r = 7
        this.velocity = 5
        this.moving = {x: 0, y: 0}
        this.come = false
        this.shooter = shooter
    }
    draw(){
        push()
        fill(255, 255, 10)
        ellipse(this.x, this.y, this.r)
        pop()
    }
    goTo(x, y){
        this.moving = {x, y}
    }

    move(){
        let xDelta = this.moving.x - this.x
        let yDelta = this.moving.y - this.y
        let rotation = -Math.atan2(yDelta, xDelta)
    
        this.x += Math.cos(rotation) * this.velocity
        this.y -= Math.sin(rotation) * this.velocity

        this.come = collisionCircleCircle(this.x, this.y, this.r, this.moving.x, this.moving.y, 10)
    }

    hit(circle){
        return collisionCircleCircle(this.x, this.y, this.r, circle.x, circle.y, circle.r) && circle != this.shooter
    }
}

function collisionCircleCircle(x, y,d, x2, y2, d2) {
    if(dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
      return true
    }
    return false
}