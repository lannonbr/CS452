# Lab 2
## Benjamin Lannon
## February 15

---

## Vertex Implementation
I had some issues rendering the shape with TRIANGLES_FAN, so I decided that a
LINE_LOOP would work. The star is formed from 10 vertices and then rendered to
the screen.

## Buttons Implementation
The buttons either toggle the rotation or modify the speed. The speed adds a
small number to a speed variable that modifies the translation vector.

## Mouse Click Implementation
For the mouse click, I clear out the displacement that it has already moved by
setting two variables (deltaX and deltaY) to 0. then I set the x and y values
to `x = 2 * newX / 512.0 - 1;` and `y = 2 * newY / 512.0 - 1;` as shown in
class.

## Keyboard Implementation
I decided that having an array to manage the direction movement would work the
best. For example, if I press W, then I would set the direction array to be
[0, 1] where the 0th index relates to the x coordinate and the 1st index
relates to the y coordinate, and it would move by a scale of positive one in
the y direction, or simply, upward.
