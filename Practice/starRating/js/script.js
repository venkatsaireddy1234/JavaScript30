class StarRating{
    constructor(containerId){
        this.container = document.querySelector(containerId);
        this.stars = this.container.querySelectorAll(".star");
        this.count = 0;
        this.events()
    }
    events(){
        this.container.addEventListener("click",(e)=>{this.onStarClick(e)});
        this.container.addEventListener("mouseover",(e)=>{this.onStarHover(e)});
        this.container.addEventListener("mouseleave",() => this.onStarLeave());
    }
    onStarClick(e){
        const classEle = e.target.classList[0];
        if(classEle != "star") return;
        const starNumber = e.target.dataset.index
        this.count = starNumber;
        this.fillStars(starNumber);
        this.updateRatings(starNumber);
    }
    fillStars(count){
        for(let i =0; i<5; i++){
            this.stars[i].classList.remove('star-filled');
        }
        for(let i =0; i<count; i++){
            this.stars[i].classList.add('star-filled');
        }
    }
    updateRatings(count){
        document.getElementById("count").innerText = `Rating count : ${count}`;
    }

    onStarHover(e){
        const currentStar = e.target.dataset.index;
        this.fillStars(currentStar);

    }
    onStarLeave(){
        this.fillStars(this.count);
    }
}
new StarRating("#star-container");


