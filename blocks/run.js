//-------------------------- End page
timeline.push({
  type: 'html-button-response',
  stimulus: "Great work!<br><br>" + 
  "You are now finished with this task.<br><br>" +
  "Click 'continue' to proceed.<br><br>",
  choices: ['continue'],
  data: {variable: "end"}
});

//-------------------------- Run Experiment
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    aut_start = jsPsych.startTime();
    console.log(aut_start);
    aut_data = jsPsych.data.get().json();
    aut_browser = jsPsych.data.getInteractionData().json();
    window.parent.postMessage([aut_start, aut_data, aut_browser], "https://survey.uu.nl/jfe/form/SV_bPHLspmdPfCY9ZY");

  }
});