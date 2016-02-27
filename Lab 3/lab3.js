var gl;
var alpha = 0, beta = 0, gamma = 0;
var scaleX = 1, scaleY = 1;
var transX = 0, transY = 0;
var program;

function initGL(){
  var canvas = document.getElementById( "canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  gl.viewport( 0, 0, 512, 512);
  gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

  gl.enable(gl.DEPTH_TEST);

  var vertices = [
    vec4(0.0, 0.5, 0.0, 1.0), // T 0
    vec4(0.5, -0.5, 0.5, 1.0), // BR 1
    vec4(0.5, -0.5, -0.5, 1.0), // FR 2
    vec4(-0.5, -0.5, -0.5, 1.0), // FL 3
    vec4(-0.5, -0.5, 0.5, 1.0)]; // BL 4

  var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(0.0, 0.5, 0.0, 1.0),
    vec4(0.0, 0.8, 0.4, 1.0),
    vec4(0.3, 0.1, 1.0, 1.0),
    vec4(1.0, 0.9, 0.05, 1.0)];

  var indexList = [
    1, 2, 3,
    3, 4, 1,
    3, 2, 0,
    3, 4, 0,
    1, 4, 0,
    1, 2, 0];

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

  var vertexColorLoc = gl.getAttribLocation(program, "vertexColor");
  gl.vertexAttribPointer(vertexColorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexColorLoc);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var vertexPositionLoc = gl.getAttribLocation(program, "vertexPosition");
  gl.vertexAttribPointer(vertexPositionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPositionLoc);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var numVertices = 18;
  gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);

  alphaLoc = gl.getUniformLocation(program, "alpha");
  betaLoc = gl.getUniformLocation(program, "beta");
  gammaLoc = gl.getUniformLocation(program, "gamma");

  scaleXLoc = gl.getUniformLocation(program, "scaleX");
  scaleYLoc = gl.getUniformLocation(program, "scaleY");

  transXLoc = gl.getUniformLocation(program, "transX");
  transYLoc = gl.getUniformLocation(program, "transY");

  gl.uniform1f(alphaLoc, alpha);
  gl.uniform1f(betaLoc, beta);
  gl.uniform1f(gammaLoc, gamma);

  gl.uniform1f(scaleXLoc, scaleX);
  gl.uniform1f(scaleYLoc, scaleY);

  gl.uniform1f(transXLoc, transX);
  gl.uniform1f(transYLoc, transY);

  requestAnimFrame(render);
}

function keyPress(event) {
  switch (event.keyCode) {
    // Rotating (X, Y, & Z)
    case 90: // z
      gamma += 0.02;
      break;
    case 88: //x
      beta += 0.02;
      break;
    case 67: // c
      alpha += 0.02;
      break;

    // Scaling (X & Y )
    case 37:  //left arrow
      scaleX -= 0.1;
      break;
    case 38: // up arrow
      scaleY += 0.1;
      break;
    case 39: // right arrow
      scaleX += 0.1;
      break;
    case 40: // down arrow
      scaleY -= 0.1;
      break;

    // Translating (X & Y)
    case 87: // w
      transY += 0.01;
      break;
    case 65: // a
      transX -= 0.01;
      break;
    case 83: // s
      transY -= 0.01;
      break;
    case 68: // d
      transX += 0.01;
      break;

    default:

  }
}
