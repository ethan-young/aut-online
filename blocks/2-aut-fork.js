// AUT Fork instructions
timeline.push({
  type: 'instructions',
  pages: [
    "<div style = 'text-align: left; margin: 20px 10%;'>"+
    "Please write down all of the original and creative uses for a <b style = 'color: blue;'>fork</b> that you can think of.<br><br>"+
    "Certainly, there are common, unoriginal ways to use a fork. However, for this task, list all of the unusual, creative, and uncommon uses you can think of.<br><br>" +
    "You’ll have three minutes." +
    "</div>"
  ],
  show_clickable_nav: true,
  allow_backward: true,
  key_forward: -1,
  key_backward: -1,
  button_label_next: "start the task",
  data: {variable: 'aut_key_instructions'}
});

// Create the AUT fork task and loop to record RTs for each response
var aut_fork = {
  type: 'ethan-survey-text-duration',
  preamble: '<img src="img/fork.jpeg" height = "300px"><br>Your responses:<br><br><div style="margin: 10px 10%; line-height: 40px;">',
  questions: [{prompt: 'Type your creative use here and hit enter to add it:', required: true}],
  trial_duration: 30000,
  button_label: null,
  data: {variable: "aut_fork_responses", aut: "fork", use: "", aut_stim: ""},
  on_start: function(trial){
      if(jsPsych.data.get().last(1).values()[0].aut == 'fork' & jsPsych.data.get().last(1).values()[0].use !== ''){
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
      "<span style='background-color: #F0F0F0; border-radius: 6px; padding: 6px 6px; margin: 3px; display: inline-flex'>" + 
      jsPsych.data.get().last(1).values()[0].use +
      "</span>";
  }
};

// Exectue the loop
timeline.push({
    timeline: [aut_fork],
    loop_function: function(data){
        if(jsPsych.data.get().last(1).values()[0].timed_out){
            return false;
        } else {
            return true;
        }
    }
});

// Rank responses 
var aut_fork_rank = {
    type: 'html-button-response',
    stimulus: "Which ideas are your most creative? Click on the three ideas you think are most creative.<br><br>",
    choices: ["none"],
    data: {variable: "aut_fork_rank"},
    on_start: function(trial){
        if(trial.data.selected == "first"){
          trial.choices = jsPsych.data.get().filter({aut: 'fork'}).filterCustom(function(trial){return trial.use !== '';}).select('use').values;
          trial.data.choices = trial.choices;
        } else if(trial.data.selected == "second"){
          trial.choices = jsPsych.data.get().filter({aut: 'fork'}).filterCustom(function(trial){return trial.use !== '' & trial.use != jsPsych.data.get().last(1).values()[0].choice;}).select('use').values;
          trial.data.choices = trial.choices;
          trial.stimulus = trial.stimulus + "<b>" + jsPsych.data.get().last(1).values()[0].choice + "</b><br><br>";
        } else if(trial.data.selected == "third"){
            trial.choices = jsPsych.data.get().filter({aut: 'fork'}).filterCustom(function(trial){
                return trial.use !== '' & trial.use != jsPsych.data.get().last(1).values()[0].choice & trial.use != jsPsych.data.get().last(2).values()[0].choice;}).select('use').values;
            trial.data.choices = trial.choices;
            trial.stimulus = trial.stimulus + "<b>" + jsPsych.data.get().last(2).values()[0].choice + ", " + jsPsych.data.get().last(1).values()[0].choice + "</b><br><br>";
        }
    },
    on_finish: function(data){
        data.choice = data.choices[data.button_pressed];
    },
    timeline: [
        {data: {selected: "first"}},
        {data: {selected: "second"}},
        {data: {selected: "third"}}
    ]
};

var aut_fork_rerank = {
  type: 'html-button-response',
  stimulus: "Thanks!<br><br>" + "You chose the following ideas as your most creative:<br><br>",
  choices: ['No',"Yes"],
  data: {variable: "aut_fork_rerank"},
  on_start: function(trial){
    trial.stimulus = trial.stimulus + "<b>" +
    jsPsych.data.get().last(3).values()[0].choice + ", " +
    jsPsych.data.get().last(2).values()[0].choice + ", " + 
    jsPsych.data.get().last(1).values()[0].choice + 
    "</b><br><br>" +
   "Do you want to change your choices?<br><br>";
  }
};

var aut_fork_loop = {
    timeline: [aut_fork_rank, aut_fork_rerank],
    loop_function: function(data){
      console.log(jsPsych.data.get().last(1).values()[0].button_pressed);
        if(jsPsych.data.get().last(1).values()[0].button_pressed==0){
            return false;
        } else {
            return true;
        }
    }
};

timeline.push({
  timeline: [aut_fork_loop],
    conditional_function: function(){
        var data = jsPsych.data.get().filter({aut: 'fork'}).filterCustom(function(trial){return trial.use !== '';}).select('use').values;
        if(data.length <= 3){
            return false;
        } else {
            return true;
        }
    }
});