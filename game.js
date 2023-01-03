
var gamePattern=[];
var level=0;
$(document).keypress(function()
{if(level===0){nextSequence();}});
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
function nextSequence()
{level+=1;

  $("h1").text("Level "+level);
  var randnum=Math.floor(Math.random()*4);
  var randcol=buttonColours[randnum];
  gamePattern.push(randcol);
  $("."+randcol).fadeOut(100).fadeIn(100);
  createSound(randcol);
  animatePress(randcol);
  // console.log(userClickedPattern);
  // console.log(gamePattern);
}
$(".btn").click(function(){
  var clickcol=this.id;
  userClickedPattern.push(clickcol);
  createSound(clickcol);
  animatePress(clickcol);
  var c=check();
  if(c===2){userClickedPattern=[];setTimeout(nextSequence,1000);}
  else if(c==0){$("h1").text("Press A Key to Start");}
  // console.log(userClickedPattern);
  // console.log(gamePattern);

});
function createSound(name)
{
  var aud=new Audio("sounds/"+name+".mp3");
  aud.play();
}
function animatePress(col)
{
  $("."+col).addClass("pressed");
  setTimeout(function(){$("."+col).removeClass("pressed");},100);
}
function check()
{
  var i=userClickedPattern.length-1;
    if(userClickedPattern[i]!==gamePattern[i]){
      //restart failed
      level=0;
      userClickedPattern=[];
      gamePattern=[];
      createSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      return 0;
    }
  if(userClickedPattern.length===gamePattern.length){return 2;}//this level is completed
  return 1;//this key is correct
}
