// Set up to pass in a custom JSON theme
import { SurveyCreatorModel } from "survey-creator-core";
// import * as surveyTheme from "../styles/survey_theme.json";
// const surveyJson = { ... };
// const survey = new Model(surveyJson);


// Editor options
const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showThemeTab: false
};

// survey.applyTheme({surveyTheme});

// Render the Survey creator
const creator = new SurveyCreator.SurveyCreator(creatorOptions);

document.addEventListener("DOMContentLoaded", function() {
  creator.render(document.getElementById("surveyCreator"));
});