var earth, earthImg;
var spaceImg, gameOverImg;

var asteroid1, asteroid1Img;
var asteroid2, asteroid2Img;
var asteroid3, asteroid3Img;
var asteroid4, asteroid4Img;
var asteroids1Grp, asteroids2Grp;

var player, playerImg;

var missile, missileImg;
var missileGrp;

var bgMusic;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload () { 
  spaceImg = loadImage("Space.png");
  earthImg = loadImage("Earth.png");
  gameOverImg = loadImage("Game Over.png");

  asteroid1Img = loadImage("Asteroid 1.png");
  asteroid2Img = loadImage("Asteroid 2.png");
  asteroid3Img = loadImage("Asteroid 3.png");
  asteroid4Img = loadImage("Asteroid 4.png");

  playerImg = loadImage("player.png");

  missileImg = loadImage("Missile.png");
}

function setup () {
  createCanvas(1600,700);

  earth = createSprite(1400,200,20,200);
  earth.addImage(earthImg);
  earth.scale = 0.9;

  player = createSprite(1100,500,20,200);
  player.addImage(playerImg);
  player.scale = 0.5;

  asteroids1Grp = createGroup();
  asteroids2Grp = createGroup(); 
  missileGrp = createGroup();
}

function draw () {
  background(spaceImg); 
  
  if(gameState === PLAY){
    asteroids1();
    asteroids2();

    if (keyDown("UP_ARROW")) {
      player.y = player.y - 8;
    }
    if (keyDown("DOWN_ARROW")) {
      player.y = player.y + 8;
    }

    if (asteroids1Grp.collide(player)) {
      asteroids1Grp.destroyEach();
    }
    if (asteroids2Grp.collide(player)) {
      asteroids2Grp.destroyEach();
    }    

    if(asteroids1Grp.collide(missile)) {
      asteroids1Grp.destroyEach();
      missile.lifetime = 0;
    }

    if(asteroids2Grp.collide(missile)) {
      asteroids2Grp.destroyEach();
      missile.lifetime = 0;
    }

    if(earth.collide(asteroids1Grp)) {
      gameState = END;
    }
    if(earth.collide(asteroids2Grp)) {
      gameState = END;
    }

    if(keyDown(32)) {
      createMissile();
    }
  }

  if(gameState === END){
    earth.destroy();
    player.destroy();
    asteroids1Grp.destroyEach(); 
    asteroids2Grp.destroyEach();  
    asteroids1Grp.setVelocityXEach(0);  
    asteroids2Grp.setVelocityXEach(0);
    missileGrp.destroyEach();
    background(gameOverImg);
  }

  drawSprites();
}

function asteroids1 () {
  if(World.frameCount % 130 === 0) {
    asteroid1 = createSprite(-20,200,20,200);
    asteroid1.scale = 0.4;
    r = Math.round(random(1,2));
    if (r == 1) {
      asteroid1.addImage(asteroid1Img);  
    } 
    else if (r == 2) {
      asteroid1.addImage(asteroid2Img);  
    }
    asteroid1.y = Math.round(random(10,600));  
    asteroid1.velocityX = 9;
    asteroid1.Lifetime  = 100;  
    asteroids1Grp.add(asteroid1);    
  }
}

function asteroids2 () {
  if(World.frameCount % 130 === 0) {
    asteroid2 = createSprite(-20,500,20,200);
    asteroid2.scale = 0.17;
    r = Math.round(random(3,4));
    if (r == 3) {
      asteroid2.addImage(asteroid3Img);  
    } 
    else if (r == 4) {
      asteroid2.addImage(asteroid4Img);  
    }  
    asteroid2.y = Math.round(random(30,450));  
    asteroid2.velocityX = 10;
    asteroid2.Lifetime  = 50;  
    asteroids2Grp.add(asteroid2);    
  }
}

function createMissile() {
  missile = createSprite(1100,-20,50,50);
  missile.y = player.y+30;
  missile.addImage(missileImg);
  missile.scale = 0.3;
  missile.velocityX = -8;
  missile.lifetime = 150;
  missileGrp.add(missile);
}
