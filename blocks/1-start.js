function receiveMessage(event) {
  if (event.origin !== window.parent.location)
  return;
  console.log(event.origin);
  var qualtrics_url = event.data;
  }
  
window.addEventListener("message", receiveMessage, false);

var start_time = jsPsych.startTime();

// Create timeline object
var timeline = [];
        
timeline.push({
  type: 'instructions',
  pages: [
    "<div style = 'text-align: left; margin: 20px 10%;'>"+
    "The first part of the study is about how people think creatively, like how people come up with original, innovative, and valuable ideas.<br><br>"+ 
    "Everyone can think creatively, and we’d like to learn more about how people do it." +
    "</div>",
    "<div style = 'text-align: left; margin: 20px 10%;'>"+
    "For the next task, you will see a picture of an everyday object, like a brick. We'll ask you to come up with original and creative uses for that object. We'll repeat this task three times." +
    "</div>"
  ],
  show_clickable_nav: true,
  allow_backward: true,
  key_forward: -1,
  key_backward: -1,
  button_label_next: "continue",
  data: {variable: 'welcome'}
});

