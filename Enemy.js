class Enemy extends Circle{
    constructor(x, y, color){
        super(x, y, color);
    }

    tryToKillTarget(target){
        this.shot(target.x, target.y)
    }
}