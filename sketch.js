var boy, boyImg
var diamond, diamondImg, diamondGroup
var fire, fireImg, fireGroup
var path, pathImg
var gameOver, gameOverImg
var restart, restartImg
var wall, wallImg
var score = 0
var gameState = "play"
var diamondSound, fireSound

function preload(){
  boyImg = loadImage("Infinite Runner Game/Boy.png")
  diamondImg = loadImage("Infinite Runner Game/Diamond.png")
  fireImg = loadImage("Infinite Runner Game/Fire.png")
  pathImg = loadImage("Infinite Runner Game/Road.png")
  gameOverImg = loadImage("Infinite Runner Game/GameOver.png")
  restartImg = loadImage("Infinite Runner Game/Restart.png")
  wallImg = loadImage("Infinite Runner Game/Wall.png")
  diamondSound = loadSound("Sounds/Boy Touching Diamond.wav")
  fireSound = loadSound("Sounds/Boy Touching Fire.wav")
}

function setup() {
  createCanvas(1200,800);

  path = createSprite(600,400)
  path.addImage(pathImg)
  path.scale = 0.8

  boy = createSprite(600,600)
  boy.addImage(boyImg)
  boy.scale = 0.3

  gameOver = createSprite(600,400)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  restart = createSprite(600,600)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

  diamondGroup = new Group()
  fireGroup = new Group()
}

function draw() {
  background(0,0,0);  
  
  if(gameState === "play"){
    
    path.velocityY = 4

    if(keyDown(RIGHT_ARROW)){
      boy.x = boy.x + 5
    }
  
    if(keyDown(LEFT_ARROW)){
      boy.x = boy.x - 5
    }
  
    if(keyDown("space")){
      boy.velocityY = -10
    }
  
    boy.velocityY = boy.velocityY + 0.5
  
  
    if(path.y>500){
      path.y = path.y/2
    }
  
    if(boy.isTouching(diamondGroup)){
      score = score + 1
      diamondGroup.destroyEach();
      diamondSound.play()
  
    }
    if(boy.isTouching(fireGroup)){
      gameState = "end"
      fireSound.play()
    }

    firespawn();
  //brickspawn();
  diamondSpawn();
  }

  if(gameState === "end"){
    diamondGroup.setVelocityYEach(0)
    fireGroup.setVelocityYEach(0)
    fireGroup.destroyEach();
    diamondGroup.destroyEach();
    path.velocityY = 0
    boy.velocityY = 0
    gameOver.visible = true
    restart.visible = true
    if(mousePressedOver(restart)){
      reset();
    }
  }

  drawSprites();

  fill("White")
  textSize(23)
  text("Score: " + score, 100,100)
}

function firespawn(){
  if(frameCount % 90 === 0){
    fire = createSprite(Math.round(random(100 , 1100)), 0)
    fire.addImage(fireImg)
    fire.velocityY = 4
    fire.scale = 0.2
    fireGroup.add(fire)
  }
}

function diamondSpawn(){
  if(frameCount % 60 === 0){
    diamond = createSprite(Math.round(random(100,1100)),0)
    diamond.addImage(diamondImg)
    diamond.velocityY = 4
    diamond.scale = 0.3
    diamondGroup.add(diamond)

  }}

  function reset(){
    gameState = "play"
    score = 0
    gameOver.visible = false
    restart.visible = false
  }


/*function brickspawn(){
  if(frameCount % 90 === 0){
    wall = createSprite(Math.round(random(100,1100)),0)
    wall.addImage(wallImg)
    wall.velocityY = 4
  }
}
*/