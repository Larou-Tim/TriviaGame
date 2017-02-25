 
var intervalId;
var correctAnswers = 0;
var wrongAnswers = 0;
var possibleChoices = [];
var pokemonTypes = ['bug', 'dragon', 'ice', 'fighting', 'fire', 'flying', 'grass', 'ghost','ground','electric','normal','poison','psychic','rock','water', 'dark', 'steel', 'fairy'];
var questionAnswer;
var mathAnswers = [.5,.6,.7,.8,.9,1.1,1.2,1.3,1.4,1.5];
var allTMMoves = ["mega punch", "razor wind" , "swords dance", "whirlwind", "mega kick", 
                  "toxic", "horn drill", "body slam", "take down", "double-edge", "bubblebeam",
                   "water gun", "ice beam", "blizzard","hyper beam", "pay day", "submission", "counter", 
                   "seismic toss", "rage", "mega drain", "solarbeam", "dragon rage", "thunderbolt", 
                   "thunder", "earthquake","fissue", "dig", "psychic", "teleport", "mimic", "double team", 
                   "reflect", "bide", "metronome", "selfdestruct", "egg bomb", "fire blase", "swift", 
                   "skull bash", "softboiled", "dream eater", "sky attack", "rest", "thunder wave", 
                   "psywave", "explosion", "rock slide", "tri attack", "subsitute" ];


timer = {

  timeLeft: 30,

  start: function() {

    // DONE: Use setInterval to start the count here.
    intervalId = setInterval(timer.count, 1000);
  },

  stop: function() {

    // DONE: Use clearInterval to stop the count here.
    clearInterval(intervalId);
  },

   count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    timer.timeLeft -- ;

    if (timer.timeLeft == 0) {
      $("#display").html(timer.timeLeft);
      alert("Times up");
      timer.stop();
    }
    else {
       $("#display").html(timer.timeLeft);
    }
  },

    reset: function() {

    timer.timeLeft = 30;

    $("#display").html(timer.timeLeft);

  },
}


function randomNumber (min, max) {
  return Math.floor(Math.random()*(max - min)) + min
}

  var questions = [
    { queryURL: "http://pokeapi.co/api/v2/pokemon/",

      getQuestion: function() {
        $.ajax({
          url: (this.queryURL + randomNumber(1,151)),
          method: "GET"
        }).done(function(response) { // i should move this to seperate function
          console.log(questions[0].answers);
          var pokemonName = response.name;
          var quesText = "How much does " + pokemonName.toUpperCase() + " weigh?";
          var answers = mathAnswers;
          var randomChoice;
          
          possibleChoices.push(response.weight);  
          questionAnswer = response.weight;

          randomChoice = randomNumber(0,(answers.length -1))
          possibleChoices.push(Math.ceil(response.weight * answers[randomChoice]));
          answers.splice(randomChoice,1); 
          randomChoice = randomNumber(0, answers.length -1)

          possibleChoices.push(Math.ceil(response.weight * answers[randomChoice]));
          answers.splice(randomChoice,1); 
          randomChoice = randomNumber(0,answers.length -1)

          possibleChoices.push(Math.ceil(response.weight * answers[randomChoice]));
         

          questionHandler(quesText);

        });

      },

    },

    {
      getQuestion:function() {
         $.ajax({
          url: ("http://pokeapi.co/api/v2/machine/" + randomNumber(1,500)),
          method: "GET"
        }).done(function(response) { 


          var curGame = response.version_group.name.toUpperCase();
          var tmMoves = allTMMoves;
          var curTM = response.move.name.toUpperCase();
          var curMachine = response.item.name.toUpperCase();

          var question = "In the game " + curGame + " what move does " + curMachine + " train?"
          var index = tmMoves.indexOf(curTM);
          possibleChoices.push(curTM);
          questionAnswer = curTM;

          if (index > -1) {
            tmMoves.splice (index,1);
          }

          var randomChoice = randomNumber(0,tmMoves.length-1);
          possibleChoices.push(tmMoves[randomChoice].toUpperCase());
          tmMoves.splice (randomChoice,1);
          randomChoice = randomNumber(0,tmMoves.length-1);
          possibleChoices.push(tmMoves[randomChoice].toUpperCase());
          tmMoves.splice (randomChoice,1);
          randomChoice = randomNumber(0,tmMoves.length-1);
          possibleChoices.push(tmMoves[randomChoice].toUpperCase());
          tmMoves.splice (randomChoice,1);

          questionHandler(question);

        });
      }
    },

    {
      getQuestion:function() {
         $.ajax({
          url: ("http://pokeapi.co/api/v2/move/" + randomNumber(1,500)),
          method: "GET"
        }).done(function(response) { 


          var curType = response.type.name.toUpperCase();
          var moveName = response.name.toUpperCase();
          var moveTypes = pokemonTypes;

          var question = "What type is the move " + moveName + " ?"
          var index = moveTypes.indexOf(curType);
          possibleChoices.push(curType);
          questionAnswer = curType;

          if (index > -1) {
            moveTypes.splice (index,1);
          }

          var randomChoice = randomNumber(0,moveTypes.length-1);
          possibleChoices.push(moveTypes[randomChoice].toUpperCase());
          moveTypes.splice (randomChoice,1);
          randomChoice = randomNumber(0,moveTypes.length-1);
          possibleChoices.push(moveTypes[randomChoice].toUpperCase());
          moveTypes.splice (randomChoice,1);
          randomChoice = randomNumber(0,moveTypes.length-1);
          possibleChoices.push(moveTypes[randomChoice].toUpperCase());
          moveTypes.splice (randomChoice,1);


          questionHandler(question);

        });
      }
    },

    {
      //update for pokemon with multiple types maybe add some multi types to type list, and just add it in th epull function
      getQuestion: function () {   
        $.ajax({
          url: ("http://pokeapi.co/api/v2/pokemon/" + randomNumber(1,151)),
          method: "GET"
        }).done(function(response) { 
          var curPokemon = response.name.toUpperCase();

          var question = "What type is " + curPokemon + " ?"

          var types = pokemonTypes;

          var curPokemonType = response.types[0].type.name;

          var index = types.indexOf(curPokemonType);

          possibleChoices.push(curPokemonType);
          questionAnswer = curPokemonType;

          if (index > -1) {
            types.splice (index,1);
          }

          var randomChoice = randomNumber(0,types.length-1);
          possibleChoices.push(types[randomChoice]);
          types.splice (randomChoice,1);
          randomChoice = randomNumber(0,types.length-1);
          possibleChoices.push(types[randomChoice]);
          types.splice (randomChoice,1);
          randomChoice = randomNumber(0,types.length-1);
          possibleChoices.push(types[randomChoice]);
          types.splice (randomChoice,1);

          questionHandler(question);

        });
      }
    }
  ]

randomQuestion = randomNumber(0,questions.length-1);
  // questions[randomQuestion].getQuestion();
  questions[2].getQuestion();


  $("body").on("click", ".answer-choice", function(){

      var selectedAnswer = $(this).attr('val');
   

      if (selectedAnswer == questionAnswer) {
        alert("Winner Winner Chicken Dinner");
      }
      
  });


function questionHandler (questionText) {
  var answer1 = $("<button>");
      var answer2 = $("<button>");
      var answer3 = $("<button>");
      var answer4 = $("<button>");
      answer1.attr("id","choice-1");
      answer1.attr("class","answer-choice");
      randomChoice = randomNumber(0, (possibleChoices.length -1))
      answer1.html(possibleChoices[randomChoice]);
      answer1.attr("val",possibleChoices[randomChoice]);
      possibleChoices.splice(randomChoice,1);


      answer2.attr("id","choice-2");
      answer2.attr("class","answer-choice");
   
     
      randomChoice = randomNumber(0,possibleChoices.length-1)
      answer2.html(possibleChoices[randomChoice]);
      answer2.attr("val",possibleChoices[randomChoice]);
      possibleChoices.splice(randomChoice,1);


      answer3.attr("id","choice-3");
      answer3.attr("class","answer-choice");
      randomChoice = randomNumber(0,possibleChoices.length-1)
      answer3.html(possibleChoices[randomChoice]);
      answer3.attr("val",possibleChoices[randomChoice]);
      possibleChoices.splice(randomChoice,1);



      answer4.attr("id","choice-4");
      answer4.attr("class","answer-choice");
      randomChoice = 0;
      answer4.html(possibleChoices[randomChoice]);
      answer4.attr("val",possibleChoices[randomChoice]);
      possibleChoices.splice(randomChoice,1);



      $("#question-01").append(questionText);

      $("#question-1-answers").append(answer1);
      $("#question-1-answers").append(answer2);
      $("#question-1-answers").append(answer3);
      $("#question-1-answers").append(answer4);

      possibleChoices = [];
      timer.start();
}


