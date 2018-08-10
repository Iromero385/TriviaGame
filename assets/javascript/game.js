$(document).ready(function(){
  // all questions
var dataArray = [{q:"What did Joey name his chair?", 
  opt1:"Rosita",
   opt2:"Señorita",
   opt3:"Rockerlaunger",
   opt4:"Lazy2000",
  ans:"opt1"}, 
  {q:"What was Ross and Monica’s childhood dog’s name?", 
  opt1:"Rover",
   opt2:"La Pooh",
   opt3:"Chi Chi",
   opt4:"Fluffy",
  ans:"opt3"}, 
  {q:"What is Chandler’s job?", 
  opt1:"Accountant",
   opt2:"Banker",
   opt3:"Transponder",
   opt4:"Statistical Analysis and Data Reconfiguration",
  ans:"opt4"}, 
  {q:"What is Joey’s pick up line?", 
  opt1:"How you doin'?",
   opt2:"What can I do you for?",
   opt3:"How much?",
   opt4:"Did it hurt when you fell from heaven?",
  ans:"opt1"}, 
  {q:"How many seasons of Friends are there?", 
  opt1:"6",
   opt2:"10",
   opt3:"5",
   opt4:"8",
  ans:"opt2"}, 
  {q:"Who had a “nubin” (a third nipple)?", 
  opt1:"Joey",
   opt2:"Phoebe",
   opt3:"Chandler",
   opt4:"Ross",
  ans:"opt3"}, 
  {q:"What soap opera is Joey an actor on?", 
  opt1:"All My Children",
   opt2:"One Life to Live",
   opt3:"Passions",
   opt4:"Days of Our Lives",
  ans:"opt4"}, 
  {q:"Where did Chandler and Monica begin their relationship?", 
  opt1:"New York",
   opt2:"London",
   opt3:"Las Vegas",
   opt4:"Atlantic City",
  ans:"opt2"}, 
  {q:"What two character’s were college roommates?", 
  opt1:"Joey and Chandler",
   opt2:"Monica and Rachel",
   opt3:"Chandler and Ross",
   opt4:"Phoebe and Monica",
  ans:"opt3"}, 
  {q: "Which character is a twin?", 
  opt1:"Phoebe",
   opt2:"Joey",
   opt3:"Monica",
   opt4:"Rachel",
  ans:"opt1"} ];

var intervalId;
var quizObject = {
    timeIsUp: false,
    time:15,
    index:0,
    correct:0,
    incorrect:0,
    unanswer:0,
    timer:function (){
        clearInterval(intervalId);
        intervalId = setInterval(quizObject.counter, 1000);
    },
    counter:function(){
        quizObject.time--;
        quizObject.displayUpdate();
        if(quizObject.time === 0){
            timeIsUp = true;
            quizObject.questionChecker();
            clearInterval(intervalId);
            quizObject.displayUpdate();
            quizObject.index++;
            quizObject.reset();
           quizObject.runQuestion();
        }
        
    },
    reset:function(){
        quizObject.time = 15;
        quizObject.timeIsUp = false;
    },
    displayUpdate:function(){
        $("#currentQuestionLabel").attr("style","font-size:96px;")
        $("#questionTag").attr("style","font-size:48px;")
        $("#questionTag").html(dataArray[quizObject.index].q);
        $("#currentQuestionLabel").html("Question "+(quizObject.index+1));
        $("#opt1").text(dataArray[quizObject.index].opt1)
        $("#opt2").text(dataArray[quizObject.index].opt2)
        $("#opt3").text(dataArray[quizObject.index].opt3)
        $("#opt4").text(dataArray[quizObject.index].opt4)
       
        if(quizObject.time===1){
            $("#currentQuestionLabel").append("<h2>"+"You have " +quizObject.time+" second left."+"</h2>")
        }
        else{
            $("#currentQuestionLabel").append("<h2>"+"You have " +quizObject.time+" seconds left."+"</h2>")
        }
        
    },
    runQuestion: function(){
        
        if(quizObject.index < dataArray.length){
        quizObject.displayUpdate();
        quizObject.timer();
        }
        else{
            quizObject.finalScore();
        }
    },
    questionChecker: function(){
        // checking which answer is selected
        var answer="";
       
        if($('#radiobnt1').is(":checked")){
            answer="opt1"
        }
        else if($('#radiobnt2').is(":checked")){
            answer="opt2"
        }
        else if($('#radiobnt3').is(":checked")){
            answer="opt3"
        }
        else if($('#radiobnt4').is(":checked")){
            answer="opt4"
        }

        if(answer === dataArray[quizObject.index].ans){
            quizObject.correct++;
        }
        else if(answer === "" && quizObject.timeIsUp){
             quizObject.unanswer++;   
        }
        else if(answer !== "" && answer !==dataArray[quizObject.index].ans){
            quizObject.incorrect++;
        }
        if(answer !== ""){
            $(':radio').each(function () {
                $(this).removeAttr('checked');
                $('input[type="radio"]').prop('checked', false);
            })
        }
    },
    // need to add functionallity that moves to next question on click
    clickOnAnswer: function(){
    },
    finalScore:function(){
        $("#questionTag").empty();
            $("#currentQuestionLabel").empty();
            $(".radiobtn").html("");
            $("#questionTag").html("Congratulations! You made it to the end. <br> Here are your scores.")
            $(".finalScore").append("<p> Number of Correct answers: " + quizObject.correct+"</p>")
            $(".finalScore").append("<p> Number of Incorrect answers: " + quizObject.incorrect+"</p>")
            $(".finalScore").append("<p> Number of Unanswer Questions: " + quizObject.unanswer +"</p>")
    }

}

quizObject.runQuestion();

});