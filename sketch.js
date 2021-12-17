var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,400);
  ghost.addImage(ghostImg);
  ghost.scale= 0.3;

  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);

  spookySound.loop();
  
  if(gameState=== "play"){

     // tower reset 
  if(tower.y > 400){
    tower.y = 300
  }

  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 5;
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 5;
  }

  if(keyDown("space")){
    ghost.velocityY = -6;
  
  }

   //gravity
   ghost.velocityY= ghost.velocityY+ 0.8;

   if(climbersGroup.isTouching(ghost)){

     ghost.velocityY= 0;   
   }

   if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>=600){

     ghost.destroy();
     gameState= "end";
       }

   spawnDoor();
   drawSprites();
  }
   if(gameState=== "end"){
     stroke("blue");
     fill("purple");
     textSize(29);
     text("Game Over",200,200);
   }
   
}

function spawnDoor(){

  if (frameCount % 200 === 0) {
    door = createSprite(300,-50);
    door.addImage(doorImg);

    climber = createSprite(300,0,50,50);
    climber.addImage(climberImg);
    
    invisibleBlock= createSprite(300,5);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;   
    
    door.x = Math.round(random(150,450));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.velocityY= 2;
    climber.velocityY = 2;
    invisibleBlock.velocityY= 2;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;

    ghost.depth = climber.depth;
    ghost.depth = ghost.depth +1;

    door.lifetime = 350;
    climber.lifetime = 350;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug= true;
    
  }
}