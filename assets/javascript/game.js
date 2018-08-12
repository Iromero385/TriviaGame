$(document).ready(function(){
$("#contBnt").click(function(event){
    event.preventDefault();
    quizObject.answerIsClicked();
});
$("#startOver").click(function(event){
    event.preventDefault();
    quizObject.incorrect=0;
    quizObject.correct=0;
    quizObject.unanswer=0;
    quizObject.index=0;
    quizObject.runQuestion();
});

var dataGifCorrect = ["https://78.media.tumblr.com/14d28ae4906c6a203458936e8c6871cc/tumblr_mk0wp9WJc31r3278yo2_400.gif","assets/images/correct2.gif","assets/images/correct3.gif","assets/images/correct4.gif","assets/images/correct5.gif","assets/images/correct6.gif","assets/images/correct7.gif","assets/images/correct8.gif","assets/images/correct9.gif","assets/images/correct10.gif"];
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
            quizObject.timeIsUp = true;
            clearInterval(intervalId);
            quizObject.questionChecker();
        }
        
    },
    reset:function(){
        quizObject.time = 15;
        quizObject.timeIsUp = false;
    },
    displayUpdate:function(){
        quizObject.toggleResponceDisplay(true);
        quizObject.toggleQuestionJumbo(false);
        $("#startOver").attr("hidden",true);
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
        quizObject.reset()
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
            answer="opt1";
        }
        else if($('#radiobnt2').is(":checked")){
            answer="opt2"
        }
        else if($('#radiobnt3').is(":checked")){
            answer="opt3";
        }
        else if($('#radiobnt4').is(":checked")){
            answer="opt4";
        }
        if(answer === dataArray[quizObject.index]["ans"]){
            quizObject.correct++;
            quizObject.answerWasCorret(true);
            setTimeout(quizObject.nextQuestion,3000)
        }
        else if(answer == ""){
             quizObject.unanswer++;
             quizObject.answerWasCorret(null);
             setTimeout(quizObject.nextQuestion,3000);   
        }
        else if(answer !== "" && answer !==dataArray[quizObject.index]["ans"]){
            quizObject.incorrect++;
            quizObject.answerWasCorret(false);
            setTimeout(quizObject.nextQuestion,3000);
        }
        
    },
    finalScore:function(){
        quizObject.toggleQuestionJumbo(true);
        quizObject.toggleResponceDisplay(false);
        $('#startOver').attr("hidden",false);
        $(".finalmessage").html("Congratulations! You made it to the end. <br> Here are your scores.")
        $(".finalmessage").append("<p> Number of Correct answers: " + quizObject.correct+"</p>")
        $(".finalmessage").append("<p> Number of Incorrect answers: " + quizObject.incorrect+"</p>")
        $(".finalmessage").append("<p> Number of Unanswer Questions: " + quizObject.unanswer +"</p>")
        
    },
    nextQuestion: function(){
        quizObject.toggleQuestionJumbo(false);
        quizObject.toggleResponceDisplay(true)
        quizObject.resetRadioBnt();
        quizObject.index++;
        clearInterval(intervalId);
        quizObject.runQuestion();
    },
    resetRadioBnt:function(){
            $(':radio').each(function () {
                $(this).removeAttr('checked');
                $('input[type="radio"]').prop('checked', false);
            })
    },
    answerWasCorret:function(state){
        debugger;
        if(state){
            quizObject.toggleQuestionJumbo(true);
            quizObject.toggleResponceDisplay(false);
            var newGif = $("<img>")
            newGif.attr("src",dataGifCorrect[quizObject.index]);
            newGif.attr("style","width:450px");
            $('.responceHearder').html("<h1> You got it<br>Here is a gif: </h1>");  
            $('.responceHearder').append(newGif);
        }
        else if(state === false){
            quizObject.toggleQuestionJumbo(true);
            quizObject.toggleResponceDisplay(false);
            var newGif = $("<img>")
            newGif.attr("src","assets/images/incorrect"+(quizObject.index+1)+".gif");
            newGif.attr("style","width:450px");
            $('.responceHearder').html("<h1> You miss it<br>But here is a gif: </h1>");  
            $('.responceHearder').append(newGif);
        }
        // for unaswers question we need three choices true, false and everything else.
        else{
            quizObject.toggleQuestionJumbo(true);
            quizObject.toggleResponceDisplay(false);
            var newGif = $("<img>")
            newGif.attr("src","assets/images/unanswer"+(quizObject.index+1)+".gif");
            newGif.attr("style","width:450px");
            $('.responceHearder').html("<h1> Are you ok?<br>Concetrate Gif for you: </h1>");  
            $('.responceHearder').append(newGif);
        }
    },
    answerIsClicked:function(){
        quizObject.questionChecker();
        clearInterval(intervalId); 
    },
    toggleQuestionJumbo:function(state){
        $(".questionLabel").attr("hidden",state);
        $(".radiobtn").attr("hidden",state);
        $('#contBnt').attr("hidden",state);
    },
    toggleResponceDisplay:function(state){
        $('.responseDisplay').attr("hidden",state);
    }
}
quizObject.runQuestion();
});