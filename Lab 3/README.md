# Lab 3
## Benjamin Lannon | Feb 27

### 3D Model
The shape I created was a Pyramid. As shown in class, I had a color attached to each of
the 5 vertices on the shape and the color is interpolated on the shape. As well, I had the
indices in the indexList go counter-clockwise.

### Transformation Setup
I decided to set up the order of the transformations for the model to be:

- Initial vec4
- Multiply by Translation Matrix
- Multiply by X Rotation Matrix
- Multiply by Y Rotation Matrix
- Multiply by Z Rotation Matrix
- Multiply by Scale Matrix

### Keyboard Input
For my keyboard input, I used the following configuration

Rotation Keys (X, Y, Z)
- z - Rotate around Z-axis
- x - Rotate around Y-axis
- c - Rotate around X-axis

Scaling Keys (X, Y)
- left-arrow - shrink X scale
- right-arrow - expand X scale
- up-arrow - expand Y scale
- down-arrow - shrink Y scale

Translation Keys (X, Y)
- w - move along Y axis in positive direction
- a - move along X axis in negative direction
- s - move along Y axis in negative direction
- d - move along X axis in positive direction
