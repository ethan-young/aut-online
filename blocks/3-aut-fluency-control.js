// Fluency instructions
timeline.push({
  type: 'instructions',
  pages: [
    "<div style = 'text-align: left; margin: 20px 10%;'>"+
    "Thanks!<br><br>For the next task, you will be given a category, like car brands. We'll ask you to list as many examples as you can think of that belong to that category.<br><br>" + 
    "For instance, for the category 'car brands', you would type in things such as: 'Ford, Toyota, etc.'.<br><br>"+
    "You'll have one minute to complete the task.<br><br>" +
    "</div>"
  ],
  show_clickable_nav: true,
  allow_backward: true,
  key_forward: -1,
  key_backward: -1,
  button_label_next: "continue",
  data: {variable: 'fluency_instructions1'}
});

timeline.push({
  type: 'instructions',
  pages: [
    "<div style = 'text-align: left; margin: 20px 10%;'>"+
    "Please write down all of the examples for the category <b>animals</b> that you can think of.<br><br> Again, you'll have one minute.<br><br>" +
    "</div>"
  ],
  show_clickable_nav: true,
  allow_backward: true,
  key_forward: -1,
  key_backward: -1,
  button_label_next: "start the task",
  data: {variable: 'fluency_instructions2'}
});

// Create the fluency task and loop to record RTs for each response
var aut_fluency = {
  type: 'ethan-survey-text-duration',
  preamble: 'List any examples of the category <b>animals</b> that you can think of. We are not looking for creative responses on this task.<br><br> Your responses:<br><br><div style="margin: 10px 10%; line-height: 40px;">',
  questions: [{prompt: 'Type each response here and hit enter to add it:', required: true}],
  trial_duration: 60000,
  button_label: null,
  data: {variable: "fluency_responses", aut: "fluency", use: "", aut_stim: ""},
  on_start: function(trial){
    if(jsPsych.data.get().last(1).values()[0].aut == 'fluency' & jsPsych.data.get().last(1).values()[0].use !== ''){
      trial.preamble = jsPsych.data.get().last(1).values()[0].aut_stim + 
        "<span style='background-color: #F0F0F0; border-radius: 6px; padding: 6px 6px; margin: 3px; display: inline-flex;'>" + 
        jsPsych.data.get().last(1).values()[0].use + 
        "</span>";
      trial.data.aut_stim = trial.preamble;
    } else{
      trial.data.aut_stim = trial.preamble;
    }
  },
  on_finish: function(data){
    data.use = JSON.parse(data.responses).Q0;
    //data.aut_stim = trial.preamble;
    data.preamble = jsPsych.data.get().last(1).values()[0].aut_stim + 
      "<span style='background-color: #F0F0F0; border-radius: 6px; padding: 6px 6px; margin: 3px; display: inline-flex;'>" + 
      jsPsych.data.get().last(1).values()[0].use +
      "</span>";
  }
};

// Exectue the loop
timeline.push({
  timeline: [aut_fluency],
  loop_function: function(data){
    if(jsPsych.data.get().last(1).values()[0].timed_out){
      return false;
    } else {
      return true;
    }
  }
});