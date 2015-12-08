var Rover = function(name, position, color){

  this.name = name;
  this.color = color;

  this.config = function(){
    console.log(this);
  }

  var pos = position;
  var dirs = ['N', 'E', 'S', 'W'];
  var dir = 'N';
  var elements = [];

  this.getPos = function(){
      return pos;
  };

  this.getDir = function(){
      return dir;
  };

  this.getElements = function(){
      return elements;
  };
   
  this.setPos = function(arr){
      pos = arr;
  };

  this.setDir = function(str){
      a = dirs.indexOf(dir);
      switch(str){
        case 'l':
          a = a === 0 ? 3 : a - 1;
          break;
        case 'r':
          a = a === 3 ? 0 : a + 1;
          break;
      }
      dir = dirs[a];
      //console.log('dir setdir: ' + dir);
  };

  this.setElements = function(ele){
      elements.push(ele);
  };

  this.config();
  this.showPos(pos);

}

Rover.prototype.checkObstacle = function(currentPos, finalPos){
  var elem = document.getElementById('td-' + finalPos);
  inner = elem.innerHTML;

  var matches = inner.match(/\d+/g);
  if (matches === null) {
    if(inner === 'X'){
      this.setPos(currentPos);
      console.log(this.name.toUpperCase() + ':\nDanger! Cannot crash with another Rover.\nPosition ' + finalPos + '.');
      console.warn('Cannot go through!');
    }else{
      this.setPos(currentPos);
      console.log(this.name.toUpperCase() + ':\nObstacle found.\n' + 'Type: ' + inner.toUpperCase() + '.\nPosition ' + finalPos + '.');
      console.warn('Cannot go through!');
    }
  }
}

Rover.prototype.showPos = function(pos){

  var element = document.getElementById('td-' + pos);
  var elements = this.getElements();
  
  for(var i=0; i<elements.length; i++){
        var val = elements[i].id;
        val = val.substr(3); 
        elements[i].style.color = '#bbb';  
        elements[i].innerHTML = val;
      };

  this.setElements(element);
  element.innerHTML = 'X';
  element.style.color = this.color;
  element.style.fontWeight = 'bolder';
};

Rover.prototype.turn = function(str) {
    this.setDir(str);
}

Rover.prototype.goForward = function() {
  
  var oldPos = this.getPos();
  var position = oldPos;
  var direction = this.getDir();

  switch(direction) {
    case 'N':
      position[0]===9 ? this.setPos([0, position[1]]) : this.setPos([position[0]+1, position[1]]);
      break;
    case 'E':
      position[1]===9 ? this.setPos([position[0], 0]) : this.setPos([position[0], position[1]+1]);
      break;
    case 'S':
      position[0]===0 ? this.setPos([9, position[1]]) : this.setPos([position[0]-1, position[1]]);
      break;
    case 'W':
      position[1]===0 ? this.setPos([position[0], 9]) : this.setPos([position[0], position[1]-1]);
      break;
  };
  this.checkObstacle(oldPos, this.getPos());

  //console.log("New Rover Position: [" + this.getPos()[0] + ", " + this.getPos()[1] + "]");
  this.showPos(this.getPos());
}

Rover.prototype.goBackwards = function() {
  
  var oldPos = this.getPos();
  var position = oldPos;
  var direction = this.getDir();

  switch(direction) {
    case 'N':
      position[0]===9 ? this.setPos([0, position[1]]) : this.setPos([position[0]-1, position[1]]);
      break;
    case 'E':
      position[1]===9 ? this.setPos([position[0], 0]) : this.setPos([position[0], position[1]-1]);
      break;
    case 'S':
      position[0]===0 ? this.setPos([9, position[1]]) : this.setPos([position[0]+1, position[1]]);
      break;
    case 'W':
      position[1]===0 ? this.setPos([position[0], 9]) : this.setPos([position[0], position[1]+1]);
      break;
  };

  this.checkObstacle(oldPos, this.getPos());

  //console.log("New Rover Position: [" + this.getPos()[0] + ", " + this.getPos()[1] + "]");
  this.showPos(this.getPos());
}



window.onload = function() {

  var myRover = new Rover('marsRover1',[0,4], 'green');
  var yourRover = new Rover('marsRover2',[8,4], 'orange');
  window.addEventListener('keydown', function(e) {

    if(e.keyCode===70){
      //console.log('f');
      myRover.goForward();
      yourRover.goForward();
    };
    if(e.keyCode===66){
      //console.log('b');
      myRover.goBackwards();
      yourRover.goBackwards();
    };
    if(e.keyCode===82){
      //console.log('r');
      myRover.turn('r');
      yourRover.turn('r');
    };
    if(e.keyCode===76){
      //console.log('l');
      myRover.turn('l');
      yourRover.turn('r');
    };
    if(e.keyCode===80){
      //console.log('p');
      console.log(myRover.getPos());
      console.log(yourRover.getPos());
    };

  });

}



