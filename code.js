// list of all symptoms
var symptoms = ["Anxious mood:\n\n always feel bed well be occur or easily provoked.",
  "Tension:\n\n easy fatigue, cannot relax or feel uneasy.",
  "Fears:\n\n fear of being alone or large number of people, animals or other.",
  "Insomnia:\n\n night terrors, easily awake",
  "Cognitive:\n\n cannot pay attention.",
  "Depressed mood:\n\n lose interest",
  "Somatic anxiety-muscular:\n\n inflexible, muscle soreness",
  "Somatic anxiety-sensory:\n\n powerless, blurred vision.",
  "Cardiovascular-symptoms:\n\n palpitation, rapid heartbeat.",
  "Respiratory symptoms:\n\n dyspnea",
  "Gastro-intestinal symptoms:\n\n dysphagia, dyspepsia.",
  "Genito-urinary symptoms:\n\n frequency of urination",
  "Autonomic symptoms:\n\n dry mouth, tension headache",
  "Behavior at interview:\n\n nervous, pupil dilation"];

// Anxiety score
var score = 0;

// show question
function showQuestion(ques_No) {
  setProperty("question_area", "text", symptoms[ques_No]);
}

// get selected radio for each question
function getSelectedRadioButtonValue() {
  // Loop through all the radio buttons in the group
  for (var i = 1; i < 5; i++) {
    // Check if the radio button is checked
    if (getProperty("radio_button" + i, "checked")) {
      // Return the value of the checked radio button
      return i;
    }
  }

  // Return null if no radio button is checked
  return null;
}

// The main method to record axiety score in each step and gives conclusion in the end
function answerQuestion(ques_No) {

  console.log(getSelectedRadioButtonValue());
  var selected_radio = getSelectedRadioButtonValue();
  score += selected_radio;

  setTimeout(function () {
    setProperty("radio_button" + selected_radio, "checked", false);
    if (ques_No < symptoms.length - 1) {
      showQuestion(ques_No + 1);
    } else {
      setScreen("result_page");
      // high anxiety
      if (score > 29) {
        setText("result", "You are severely anxious, the suggestion is to find a " +
          "psychological consultant to do a professional counseling.");
        setImageURL("final_image", "assets/img/very_depressed.jpg");
      } else if (score > 14) {
        //moderate anxiety
        setText("result", "You are a patient with moderate anxiety, it is suggested" +
          "that work and rest should be combined in daily life, appropriate to give " +
          "yourself a certain amount of relaxation.");
        setImageURL("final_image", "assets/img/Depression-at-work.jpg");
      } else {
        // if score is equal to 14, then consider him/her in good mood
        setText("result", "You are in a very good mood. Continue to live an active " +
          "and healthy life.");
        setImageURL("final_image", "assets/img/happy.png");
      }
    }
  }, 1000);
}

// attach handler to answer radio buttons
for (var i = 1; i < 5; i++) {
  var ques_no = 0;
  onEvent("radio_button" + i, "change", function () {
    answerQuestion(ques_no);
    ques_no++;
  });
}

// start the test
onEvent("startButton", "click", function () {
  setScreen("question_screen");
  showQuestion(0);
});