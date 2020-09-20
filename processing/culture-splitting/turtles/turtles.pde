// Turtle Graphics in Processing
// Natalie Freed, February 2013
// This program shows another way to think about moving
// through Processing's coordinate system. Instead of placing
// points on a grid, you can imagine yourself as being somewhere
// on the grid, facing a direction. You can move forward or turn.
// The drawn line follows behind you.

import java.util.Random;

PVector loc; //current location
float orientation; //current orientation
Random chance = new Random();

void setup()
{
   size(1000, 1000);
   loc = new PVector(width/2, height/2); //starting position is at center
   orientation = radians(90); //starting orientation is at 90 degrees
}

void draw() //this example draws a polygon. Can you change the number of sides?
{
   forward(10); //go forward 200 pixels
   left(radians(chance.nextInt(360)+1)); //turn in a random direction
}


// Below are utility functions to calculate new positions and orientations 
// when moving forward or turning. You don't need to change these.

void forward(float pixels) //calculate positions when moving forward
{
  PVector start = loc;
  PVector end = PVector.add(loc, polar(pixels, orientation));
  line(start, end);
  loc = end;
}

void left(float theta) //calculate new orientation
{
  orientation += theta;
}

void jumpTo(int x, int y) //jump directly to a specific position
{
  loc = new PVector(x, y);
}

void line(PVector a, PVector b) //new line function with PVectors. used by forward function
{
  line(a.x, a.y, b.x, b.y);
}

PVector polar(float r, float theta) //converts an angle and radius into a vector
{
  return new PVector(r*cos(theta),r*sin(-theta)); // negate y for left handed coordinate system
}
