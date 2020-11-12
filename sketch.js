
var monkey , monkey_running;

var ground;

var banana ,bananaImage, obstacle, obstacleImage;

//var bananaGroup, obstaclesGroup;

var score;

var survivalTime = 0;

var game = "play";

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400,400);

  monkey = createSprite(40,340);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(220,380,500,12);
  ground.velocityX = -2;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  
  if(game === "play"){
    textSize(15);
    survivalTime = Math.ceil(frameCount/30);
    if(survivalTime === 1){
      text("Survival time: 1 second",130,30);
    }
    else if(survivalTime > 1) {
      text("Survival time: "+survivalTime+" seconds",130,30);
    }

    if(ground.x < ground.width/3) {
      ground.x = 220;
    }

    if(keyDown("space") && monkey.y > 330) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(obstaclesGroup.isTouching(monkey)) {
      game = "over";
    }
    food();
    obstacles();
  }
  
  if(game === "over") {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
  }

  monkey.collide(ground);
  
  
    drawSprites();
}

function food() {
  if(frameCount%80 === 0) {
    banana = createSprite(400,200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 90;
    banana.y = Math.round(random(103,270));
    
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount%250 === 0) {
    obstacle = createSprite(400,345);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 90;
    
    obstaclesGroup.add(obstacle);
  }
}