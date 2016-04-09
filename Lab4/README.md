# Lab 4 - Viewing & Lighting
## Name: Benjamin Lannon

### Viewing
The object seen when given correct lighting and viewing is an Easter Island head.
The head is at the origin, by default, so a ModelView matrix is needed to be applied
to translate the object to be viewable by the camera. The eye is at [0.01, 0, -0.025],
and which is used to translate the object to the correct viewing angle by using the
look at method with the origin as point a.

### Lighting
The lighting is implemented with 2 different light sources. The first is a point light
that gives a gray light which gives the effect of a shadow on the upper part of the face.
The other is a spotlight and gives a cyan light all over the shape (since the majority)
of the lighting in the spotlight is given from the ambient reflection. Both include
a specular reflection which can mainly be seen near its mouth and nose arch. Both
lights can be toggled as well as the specular reflection for the two lights.

### Other Notes
Note: I ran out of time and was unable to correctly implement the perspective
projection, and as such, I disabled the button to switch to perspective.
