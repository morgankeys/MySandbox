// Set up to pass in a custom JSON theme
//import * as surveyJson from "../styles/survey_theme.json";
//import { SurveyCreatorModel } from "survey-creator-core";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

const creator = new SurveyCreator.SurveyCreator(creatorOptions);


// ChatGPT suggestion
fetch('./styles/survey_theme.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Couldn\'t load theme file...');
    }
    return response.json(); // Parse the JSON from the file
  })
  .then(data => {
    console.log("JSON Data:", data);

    // Use the JSON data to apply theme or customize your survey
    creator.theme = data; // Apply the loaded JSON theme to the survey

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


document.addEventListener("DOMContentLoaded", function() {
  creator.render(document.getElementById("surveyCreator"));
});

  // showThemeTab: false