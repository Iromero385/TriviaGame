window.onload = function() {
    $("#continueBotton").on("click", stopwatch.recordLap);
  };
var intervalId;
var timeQuestions = {
    timeIsUp: false,
    time:30,
    index:0,
    correct:0,
    incorrect:0,
    unanswer:0,
    testQuestion:function (){
        clearInterval(intervalId)
        intervalId = setInterval(timeQuestions.counter, 1000);
    },
    counter:function(){
        timeQuestions.time--;
        if(timeQuestions.time = 0){
            timeIsUp = true;
            clearInterval(intervalId);
            // call next question
        }
    },
    reset:function(){
        timeQuestions.time = 0;
        timeQuestions.timeIsUp = false;
    },
    displayUpdate:function(object){
        // display current question on html
        // display timer
    },
    runQuestions: function(arrayOfObjects){
        // foreach quesiton in object 
            //displayUpdate 
            // start counter
            //
    },
    questionChecker: function(object){
        // check if selected answer is correct
        // check if question is unanswer
        // increments correct, incorrect or unanswer counters
    }

    

}
timeQuestions.testQuestion();

