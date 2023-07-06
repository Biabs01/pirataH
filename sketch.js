const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var cannon;
var angle;
var cannonBall;
var balls = [];
var ground;
var boat;

function preload(){
  backgroundImg = loadImage("assets/background.gif");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI/4;

  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 130, 100, angle);
  ground = new Ground(0, height - 1, width * 2, 1);
  boat = new Boat(width, height - 100, 200, 200, -100);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, width, height);

  tower.display();
  cannon.display();
  ground.display();
  boat.display();

  Body.setVelocity(boat.body, {x: -0.9, y:0});
  
  for (var i = 0; i < balls.length; i++){
    showCannonBall(balls[i], i);
  }

  Engine.update(engine);
}

function showCannonBall(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyPressed(){
  if (keyCode == 32){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function keyReleased(){
  if (keyCode == 32){
    balls[balls.length - 1].shoot();
  }
}

