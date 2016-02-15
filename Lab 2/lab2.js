// Lab2.js
// By: Benjamin Lannon

var speed = 0.1;
var rotation = false;
var x, y;
var theta;
var deltaX, deltaY;
var direction;

var fragColorLocation;
var gl;
var myShaderProgram;

function setupGL() {
  var canvas = document.getElementById("gl-canvas");
  var gl = WebGLUtils.setupWebGL(canvas);

  if(!gl) alert("WebGL is not available.");

  gl.viewport(0, 0, 512, 512);

  gl.clearColor(0.0, 0.5, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return gl;
}

function init() {
  gl = setupGL();

  x = y = 0;
  theta = 0;
  deltaX = 1 * speed;
  deltaY = 0.0;
  direction = [1, 0]; // (x,y)

  var verticesArray = [ vec2(-0.2, 0.0),
      vec2(-0.1, 0.0),
      vec2(0, 0.1),
      vec2(0.1, 0.0),
      vec2(0.2, 0.0),
      vec2(0.1, -0.1),
      vec2(0.15, -0.2),
      vec2(0, -0.15),
      vec2(-0.15, -0.2),
      vec2(-0.1, -0.1) ];

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesArray), gl.STATIC_DRAW);

  myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(myShaderProgram);

  var myPosition = gl.getAttribLocation(myShaderProgram, "myPos");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  fragColorLocation = gl.getUniformLocation(myShaderProgram, "fragColor");

  renderShape();
}

function renderShape() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform4f(fragColorLocation, 1.0, 1.0, 1.0, 1.0);
  gl.drawArrays(gl.LINE_LOOP, 0, 10);

  var RotMatrixLoc = gl.getUniformLocation(myShaderProgram, "RotMatrix");
  var RotMatrixArray = [ Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0, 0, 0, 1]; //3x3 form of rotation matrix using homogeneous coordinates

  var TransMatrixLoc = gl.getUniformLocation(myShaderProgram, "TransMatrix");
  var TransMatrixArray = [1, 0, 0, 0, 1, 0, deltaX, deltaY, 1];

  gl.uniformMatrix3fv(RotMatrixLoc, false, RotMatrixArray);
  gl.uniformMatrix3fv(TransMatrixLoc, false, TransMatrixArray);

  theta += 0.05 * rotation;
  deltaX += 0.01 * speed * direction[0];
  deltaY += 0.01 * speed * direction[1];
  requestAnimFrame(renderShape);
}

function keyDown(event) {
  switch (event.keyCode) {
    case 87: // W
      direction = [0, 1];
      break;
    case 65: // A
      direction = [-1, 0]
      break;
    case 83: // S
      direction = [0, -1];
      break;
    case 68: // D
      direction = [1, 0];
      break;
  }
}

function mouseClicked(event) {
  var newX = event.offsetX;
  var newY = event.offsetY;

  deltaX = deltaY = 0;

  x = 2 * newX / 512.0 - 1;
  y = 2 * newY / 512.0 - 1;

  displacementLoc = gl.getUniformLocation(myShaderProgram, "displacement");
  gl.uniform2f(displacementLoc, x, -y);
}

function increaseSpeed() {
  speed += 0.5;
}

function decreaseSpeed() {
  speed -= 0.5;
}

function startRotation() {
  rotation = true;
}

function stopRotation() {
  rotation = false;
}
