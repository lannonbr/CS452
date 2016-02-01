// Lab1.js
// By: Benjamin Lannon

function setupGL() {
  var canvas = document.getElementById("gl-canvas");
  var gl = WebGLUtils.setupWebGL(canvas);

  if(!gl) alert("WebGL is not available.");

  gl.viewport(0,0,512,512);

  gl.clearColor(0.7, 0.7, 0.7, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return gl;
}

function setupVertices() {
  // Initial Gem vertices
  var verticesArray = [ vec2(-1,0.2), vec2(-0.5, 0.7), vec2(0.5, 0.7), vec2(1.0, 0.2), vec2(0, -0.8)];

  // constants for ellipse
  var a = 1;
  var b = 0.2;

  // Vertices for ellipse
  for(var i = 0; i < 360; i++) {
    var x = a * Math.cos(i);
    var y = b * Math.sin(i)-1;
    verticesArray.push(vec2(x,y));
  }

  var lightGemShadow = [vec2(-1, 0.2), vec2(-0.6, 0.6), vec2(-0.5, 0.6), vec2(0.0, 0.2), vec2(0.0, -0.8)];
  var darkGemShadow = [vec2(1, 0.2), vec2(0.0, -0.8), vec2(0.0, 0.2), vec2(0.5, 0.6), vec2(0.6, 0.6)];

  verticesArray.push.apply(verticesArray, lightGemShadow); //apply pushes the entire array at the end of the previous one.
  verticesArray.push.apply(verticesArray, darkGemShadow);

  return verticesArray;
}

function drawShapes() {

  var gl = setupGL();
  var verticesArray = setupVertices();

  // Writing verticesArray to the ARRAY_BUFFER
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesArray), gl.STATIC_DRAW);

  // Use GLSL Shaders
  var myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(myShaderProgram);

  //accessing Vertex Shader variable
  var myPosition = gl.getAttribLocation(myShaderProgram, "myPos");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  //accessing Fragment Shader variable
  fragColorLocation = gl.getUniformLocation(myShaderProgram, "fragColor");

  // Draw original gem
  gl.uniform4f(fragColorLocation, 1.0, 0.0, 0.0, 0.8);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);

  // Draw ellipse
  gl.uniform4f(fragColorLocation, 0.3, 0.3, 0.3, 0.8);
  gl.drawArrays(gl.LINE_LOOP, 5, 360);

  // Draw lightGemShadow
  gl.uniform4f(fragColorLocation, 1.0, 0.35, 0.35, 1.0);
  gl.drawArrays(gl.TRIANGLE_FAN, 365, 5);

  // Draw darkGemShadow
  gl.uniform4f(fragColorLocation, 0.7, 0.0, 0.0, 0.8);
  gl.drawArrays(gl.TRIANGLE_FAN, 370, 5);
}
