class Api{
    url = "";
    data = null;
    constructor(newURL) {
      this.url = newURL;
    }
  
    async getData() {
      await fetch(this.url)
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          this.data = data.vids;
        });
      return this.data;
    }

}

class Switcher{
    cleaner;
    yubtub;
    app;
    constructor(app){
        this.yubtub = new Yubtub(this);
        this.cleaner = new Cleaner();
        this.app = app;
     
    }
   
}

class Cleaner{

}

class Yubtub{
    header;
    main;
    renderer;
    aside;
    switcher;
    htmlElement;

    constructor(switcher){
        this.renderer = new Renderer(this);

        this.htmlElement = document.createElement("section");
        this.htmlElement.classList.add("yubtub");

     
        this.header = new Header(this);
        this.main = new Main(this); 
          
        this.aside = new Aside(this);
        this.switcher = switcher;
       

        this.renderer.render(this.htmlElement,document.querySelector("body"));

    }

}

class Renderer{
    yubtub;
    constructor(yubtub) {
        this.yubtub = yubtub;
      
        
    }

    render(whatToRender, whereToRender){
        whereToRender.appendChild(whatToRender);
        //dit zorgt ervoor dat je html elementen kan renderen
    }

}

class Main{
    video;
    comments;
    yubtub;
    constructor(yubtub){
        this.yubtub = yubtub;
       
    

        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("article");

        this.divElement = document.createElement("div");
        this.divElement.classList.add("article__wrapper");

        this.figureElement = document.createElement("figure");
        this.figureElement.classList.add("article__figure");

        this.imgElement = document.createElement("img");
        this.imgElement.classList.add("article__img")
        this.imgElement.src = "./img/persoon.jpg";


        this.htmlpElement = document.createElement("h2");
        this.htmlpElement.classList.add("article__h2");

        this.htmliElementPijl = document.createElement("i");
        this.htmliElementPijl.classList = "article__starlogo fa-solid fa-star";

        this.htmliElementSter = document.createElement("i");
        this.htmliElementSter.classList = "article__pijl fa-solid fa-arrow-right";

        this.yubtub.renderer.render(this.imgElement, this.figureElement );
        this.yubtub.renderer.render(this.figureElement, this.divElement );
        this.yubtub.renderer.render(this.htmlpElement, this.htmlElement );
        this.yubtub.renderer.render(this.htmlElement, this.yubtub.htmlElement );
        this.yubtub.renderer.render(this.htmlpElement, this.divElement );
        this.yubtub.renderer.render(this.htmliElementPijl, this.divElement );
        this.yubtub.renderer.render(this.htmliElementSter, this.divElement );




        this.video = new Video(this);
        this.commments = new Comments(this);







    }

    renderText(data){
        this.htmlpElement.innerText = data[0]["title"];


    }



}

class Video{
    main;
    htmlElement;
    constructor(main) {
        
        this.main = main;

        this.divElement = document.createElement("div");
        this.divElement.classList = "video__wrapper";




        this.htmliElement = document.createElement("i");
        this.htmliElement.classList = "video__sterlogo fa-solid fa-star";
        

        this.htmlElement = document.createElement("iframe");
        this.htmlElement.classList = "video";


        // this.htmliElement.classList.add("fa-regular fa-star");

       
        this.main.yubtub.renderer.render(this.divElement, this.main.htmlElement);
        this.main.yubtub.renderer.render(this.htmlElement, this.divElement);
        this.main.yubtub.renderer.render(this.htmliElement, this.divElement);
        this.main.yubtub.renderer.render(this.main.divElement, this.divElement);
        // de wrapper van de main zit in de wrapper van de video



       
        
    }

    renderVideo(data){
        this.htmlElement.src =data[0]["video"];

    }



}

class Aside{
    nextvideo;
    yubtub;
    constructor(yubtub){
     
        this.yubtub = yubtub;

        this.htmlElement = document.createElement("article");
        this.htmlElement.classList.add("aside");

        this.yubtub.renderer.render(this.htmlElement, this.yubtub.htmlElement);

        this.nextvideo = new Nextvideo(this);

    


        
        
    }

}

class Nextvideo{
    aside;
    constructor(aside) {
        this.aside = aside;


    this.ulElement = document.createElement("ul");
    this.ulElement.classList = "video__nextvideos";

    this.aside.yubtub.renderer.render(this.ulElement, this.aside.htmlElement);
        
    }

    makeVideosfromdata(data) {
        console.log(data);
      

        for (let i = 0; i < 4; i++) {

            this.liElement = document.createElement("li");
            this.liElement.classList = "video__nextvideo";
            this.ulElement.appendChild(this.liElement);
      
            this.videoElement = document.createElement("video");
            this.videoElement.classList = "video__nextvideoframe";
            this.videoElement.src = data[i]["video"];
            this.liElement.appendChild(this.videoElement);


            this.liElement.onclick = () => {
                this.aside.yubtub.main.video.htmlElement.src = data[i]["video"];
                this.aside.yubtub.main.htmlpElement.innerText = data[i]["title"];
              }
               
    



        }


    }

 

}

class Header{

    constructor(yubtub) {
        this.yubtub = yubtub;

        this.htmlElement = document.createElement("header");
        this.htmlElement.classList.add("header");
        this.htmlElementh2 = document.createElement("h2");
        this.htmlElementh2.classList.add("header__h2");
        this.htmlElementh2.innerText = "YubTub";

        this.yubtub.renderer.render(this.htmlElementh2, this.htmlElement);

        this.yubtub.renderer.render(this.htmlElement, this.yubtub.htmlElement );

        
    }

}

class Comments{
    comment;
    main;
    constructor(main){
        this.main = main;
        this.ulElement = document.createElement("ul");
        this.ulElement.classList.add("comments");
        this.comment = new Comment(this);
        



        this.main.yubtub.renderer.render(this.ulElement, this.main.htmlElement);


        
    }
    
  
}

class Comment{
   comments;
   constructor(comments){
    this.comments = comments;
    this.commentsArray = [];

    this.divElement = document.createElement("div");
    this.divElement.classList = "comments__commentwrapper";


    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("comments__comment");
    this.inputElement.placeholder = "Plaats hier je comment.... ";

    this.buttonElement = document.createElement("button");
    this.buttonElement.classList.add("comments__button");
    this.buttonElement.innerText = "Plaats";

    this.buttonElement.addEventListener("click", this.addComment.bind(this));



    this.comments.main.yubtub.renderer.render(this.divElement, this.comments.ulElement);
    this.comments.main.yubtub.renderer.render(this.inputElement, this.comments.ulElement);
    this.comments.main.yubtub.renderer.render(this.buttonElement, this.divElement);



  

    
    

  
       


   }

   addComment() {
    this.commentText = this.inputElement.value.trim();

    if (this.commentText !== "") {
      this.commentItem = document.createElement("li");
      this.commentItem.classList.add("comments__item")
      this.commentItem.innerText = this.commentText;
        this.comments.main.yubtub.renderer.render(this.commentItem, this.comments.ulElement);  


        this.figureElement = document.createElement("figure");
        this.figureElement.classList.add("comments__figure");
        this.comments.main.yubtub.renderer.render(this.figureElement, this.commentItem);

        this.imgElement = document.createElement("img");
        this.imgElement.classList.add("comments__img")
        this.imgElement.src = "./img/persoon.jpg";
        this.comments.main.yubtub.renderer.render(this.imgElement, this.figureElement);

        
      
        // this.figureElementCopy = this.figureElement.cloneNode(true);
        //xorgt voor kopieen van deze element en zijn kinderen elementen
      // this.comments.main.yubtub.renderer.render(this.figureElementCopy, this.commentItem);

     
      this.commentsArray.push(this.commentText);
      this.inputElement.placeholder = "Plaats hier je comment....";
    }

   






}

}

class App{
    switcher;
    Api;
    constructor(){
        this.switcher = new Switcher(this);
        this.api = new Api("./data/data.json");

        this.api.getData().then((data) => {
            this.switcher.yubtub.main.video.renderVideo(data);
            this.switcher.yubtub.main.renderText(data);
            this.switcher.yubtub.aside.nextvideo.makeVideosfromdata(data);

        });



    }
   

}




const app = new App;

console.log(app);