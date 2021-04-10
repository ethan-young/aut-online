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
    aut_data = jsPsych.data.get().ignore('aut_stim').ignore('preamble').ignore('stimulus');
    aut_browser = jsPsych.data.getInteractionData().json();
    
    console.log(aut_data.uniqueNames());

    window.parent.postMessage([aut_start, aut_data.json(), aut_browser], "https://survey.uu.nl/jfe/form/SV_bPHLspmdPfCY9ZY");

  }
});