import java.util.Random;

class Turtle {
  PVector location; //current location
  PVector culturePreference; //current location
  float orientation; //current orientation
  Random turn = new Random();
  
  //Random locationSeed = new Random();
  //Random locationSeed = new Random();

  Turtle(PVector initialLocation, float initialOrientation, PVector initialCulturePreference){
    location = initialLocation;
    orientation = initialOrientation;
    culturePreference = initialCulturePreference;
  }
  
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
  
  void updatePreference(PVector change) //calculate positions when moving forward
  {
    culturePreference.x += change.x;
    culturePreference.x += change.x;
  }
}
