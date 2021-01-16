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
    jsPsych.data.addProperties({start_datetime: start_time});
    jsPsych.data.get().addToLast({browser: jsPsych.data.getInteractionData().json()});
    aut_data = jsPsych.data.get().json();
    window.parent.postMessage(aut_data, 'https://survey.uu.nl/jfe/form/SV_emteS89lifM5U0t');
  }
});