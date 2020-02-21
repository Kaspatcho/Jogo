class Circle{
    constructor(x, y, color){
        this.x = x
        this.y = y
        this.r = 40
        this.color = color
        this.dir = {x: 0, y: 0}
        this.vel = 4
    }
    draw(){
        push()
        fill(this.color)
        ellipse(this.x, this.y, this.r)
        translate(this.x, this.y)
        pop()
    }
    shot(x, y){
        shots.push(new Bullet(this.x, this.y, this))
        let index = shots.findIndex(value => value.x === this.x && value.y === this.y)
        shots[index].goTo(x, y)
    }

    move(){
        this.x = constrain(this.x + this.dir.x * this.vel, this.r/2, width - this.r/2)
        this.y = constrain(this.y + this.dir.y * this.vel, this.r/2, height - this.r/2)
    }

    setDir(x=undefined, y=undefined){
        this.dir = {x: (x != undefined) ? x : this.dir.x, y: (y != undefined) ? y : this.dir.y}
    }
}
