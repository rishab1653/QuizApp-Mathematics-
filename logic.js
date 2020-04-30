var play =false;
var score;
var action;
var timeremaining;
var correctAnswer;

/*If we click on start/reset button*/
document.getElementById("startreset").onclick = function() {
    /* if we are playing*/ 
    if(play == true)
    {
        location.reload();
    }

    /* If We are not Playing */
    else
    {
        /*Change Mode to Playing  */
        play=true;
        /* Set Score => 0 */
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        document.getElementById("timeremaining").style.display="block";
        timeremaining = 30;
        document.getElementById("timevalue").innerHTML=timeremaining;

        /*Hide Game over Box */
        document.getElementById("gameover").style.display = "none";

        /*Change button to Reset */
        document.getElementById("startreset").innerHTML = "Reset Game";

        /*Start Countdown */
        startCountdown();

        /*generate a new question and answer */
          generateQA();
    }
}

/*Clicking on a answer */
for(i=1;i<5;i++)
{
    document.getElementById("box" + i).onclick=function()
{
    /*check if we are playing */
    if(play==true) //i.e => yes
    {
        if(this.innerHTML == correctAnswer )
        {
            /*correct answer increase score by 1 */
            score++;
            document.getElementById("scorevalue").innerHTML = score;

            /*Hide Wrong Box And show correct box */
            document.getElementById("wrong").style.display = "none";
            document.getElementById("correct").style.display = "block";
            setTimeout(function(){
                document.getElementById("correct").style.display = "none";
            } ,1000);

            /*Generate a new Question */
            generateQA();
        }
        else{
            /*wrong answer */
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "block";
            setTimeout(function(){
                document.getElementById("wrong").style.display = "none";
             
            } , 1000);

        }

    }

}
}


            /*----------Functions Area---------- */

/*Start Counter*/
function startCountdown()
{
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timevalue").innerHTML=timeremaining;
        if(timeremaining == 0)
        /*Game Over */
        {
            stopCountdown();
            document.getElementById("gameover").style.display="block";
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            document.getElementById("timeremaining").style.display = "none";
            //hide("timeremainng");
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            play=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }

    },1000)
}


/*Stop Counter */
function stopCountdown()
{
    clearInterval(action);
}
/* To generate the question and their multile options */
function generateQA()
{
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "*" + y;
    var correctPosition = 1+ Math.round(3*Math.random());

    /*Fill One With the Correct Answer */
    
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    /*Fill the boxes with wrong answers */
    var answers = [correctAnswer];
    for(i=1 ; i<5 ; i++)
    {
        if(i!= correctPosition)
        {
            var wrongAnswer ;
           do
            {
            wrongAnswer = (1+ Math.round(9*Math.random())) * (1+ Math.round(9*Math.random()));
          
            }
            while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box" +i).innerHTML = wrongAnswer;

            answers.push(wrongAnswer);
        }

    }
}
