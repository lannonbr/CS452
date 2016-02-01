function drawShapes() {
  var canvas = document.getElementById("gl-canvas");
  var gl = WebGLUtils.setupWebGL(canvas);
  if(!gl) { alert("WebGL is not available."); }

  gl.viewport(0,0,512,512);

  gl.clearColor(0.7, 0.7, 0.7, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var a = 1;
  var b = 0.2;

  var verticesArray = [ vec2(-1,0.2), vec2(-0.5, 0.7), vec2(0.5, 0.7), vec2(1.0, 0.2), vec2(0, -0.8)];

  for(var i = 0; i < 360; i++) {
    var x = a * Math.cos(i);
    var y = b * Math.sin(i)-1;
    verticesArray.push(vec2(x,y));
  }

  var strangeShape = [vec2(-1, 0.2), vec2(-0.5, 0.7), vec2(0.0, 0.2), vec2(0.0, -0.8)];
  var strangeShapeflip = [vec2(1, 0.2), vec2(0.0, -0.8), vec2(0.0, 0.2), vec2(0.5, 0.7)];

  verticesArray.push.apply(verticesArray, strangeShape);
  verticesArray.push.apply(verticesArray, strangeShapeflip);

  // Writing verticesArray to the ARRAY_BUFFER
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesArray), gl.STATIC_DRAW);

  var myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(myShaderProgram);

  //accessing Vertex Shader variable
  var myPosition = gl.getAttribLocation(myShaderProgram, "myPos");
  gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(myPosition);

  //accessing Fragment Shader variable
  fragColorLocation = gl.getUniformLocation(myShaderProgram, "fragColor");

  gl.uniform4f(fragColorLocation, 1.0, 0.0, 0.0, 0.8);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);

  gl.uniform4f(fragColorLocation, 0.3, 0.3, 0.3, 0.8);
  gl.drawArrays(gl.LINE_LOOP, 5, 360);

  gl.uniform4f(fragColorLocation, 1.0, 0.5, 0.5, 1.0);
  gl.drawArrays(gl.TRIANGLE_FAN, 365, 4);

  gl.uniform4f(fragColorLocation, 0.7, 0.0, 0.0, 0.8);
  gl.drawArrays(gl.TRIANGLE_FAN, 369, 4);
}
