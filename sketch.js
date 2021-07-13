var dog,sadDog,happyDog;
var foodObj;
var foodStock;
var fedTime,lastfed,feed,addFood;





function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  foodObj = new Food()
foodStock = database.ref("food")
foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

feed = createButton("Add Food");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood = createButton("feed the dog");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
foodObj.display();


fedTime=database.ref("feedTime");
fedTime.on("value",function(data){
lastfed = data.val();
})

fill(255,255,254)
textSize(15);
if(lastfed>=12){
    text("Last Feed:"+lastfed%12+"PM",350,30);
  } else if(lastfed==0){
   text("Last Feed: 12 AM",350,30);
  } else {
     text("Last Feed:"+lastfed+"AM",350,30)
}
drawSprites()
}

//function to read food Stock
function readStock(data){

  foodStock=data.val();
foodObj.updateFoodStock(foodStock)
}

//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDog)
foodObj.updateFoodStock(foodObj.getFoodstock()*0);
database.ref("/").update({
Food:foodObj.getFoodstock(),
FeedTime:hour()
})
}


//function to add food in stock
function addFoods(){
foodStock++;
database.ref("/").update({
food:foodStock
})
}








