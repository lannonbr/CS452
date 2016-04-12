var gl;
var alpha = 0, beta = 0, gamma = 0;
var scaleX = 1, scaleY = 1;
var transX = 0, transY = 0;
var program;

function initGL(){
  var canvas = document.getElementById( "canvas" );
  var img = document.getElementById("lab5Img");

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  gl.viewport( 0, 0, 512, 512);
  gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

  program = initShaders( gl, "vertex-shader", "fragment-shader" );
  gl.useProgram( program );

  gl.enable(gl.DEPTH_TEST);

  var points = [
    vec4(0, 0.5, 0, 1), // Top
    vec4(-0.5, -0.5, -0.5, 1), // Front left
    vec4(0.5, -0.5, -0.5, 1), // Front Right
    vec4(0.5, -0.5, 0.5, 1), // Back Right
    vec4(-0.5, -0.5, 0.5, 1) // Back Left
  ];

  var vertices = [
    points[1], points[2], points[3], points[4], // Bottom Side

    points[1], points[2], points[0], // Front Side

    points[2], points[3], points[0], // Right Side

    points[3], points[4], points[0], // Back Side

    points[4], points[1], points[0] // Left Side
  ];

  var textureCoordinates = [
    vec2(0.0, 0.5), vec2(0.5, 0.5), vec2(0.5, 1.0), vec2(0.0, 1.0), // Bottom Side

    vec2(0.0, 0.0), vec2(0.5, 0.0), vec2(0.25, 0.5), // Front Side

    vec2(0.0, 0.0), vec2(0.5, 0.0), vec2(0.25, 0.5), // Right Sid

    vec2(0.0, 0.0), vec2(0.5, 0.0), vec2(0.25, 0.5), // Back Side

    vec2(0.0, 0.0), vec2(0.5, 0.0), vec2(0.25, 0.5) // Left Side
  ];

  var indexList = [
    0, 1, 2, // Bottom
    0, 2, 3,

    4, 5, 6, // Front

    7, 8, 9, // Right

    10, 11, 12, // Back

    13, 14, 15]; // Left

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var vertexPositionLoc = gl.getAttribLocation(program, "vertexPosition");
  gl.vertexAttribPointer(vertexPositionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPositionLoc);

  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW);

  var texCoordLoc = gl.getAttribLocation(program, "textureCoordinate");
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordLoc);

  textureImage = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textureImage);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniform1i(gl.getUniformLocation(program, "texMap0"), 0);
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
