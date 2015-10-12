define(['ko', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, QuestionModel, CategoryModel, QuizRepository){
    return function QuizViewModel(QuestionModel, CategoryModel){
        var self = this;
        
        self.Questions = ko.observableArray([]);
        self.CurrentIndex = ko.observable(0);
        self.CurrentQuestion = ko.observable({});
        self.CurrentAnswer = ko.observable('');
        self.CurrentScore = ko.observable(0);
        self.HighScore = ko.observable(0);
        self.UserAnswer = ko.observableArray([]);
        self.GuessedLetters = ko.observableArray([]);
        self.Chances = ko.observable(6);
        self.Answer = [];

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        self.Restart = function(){
            var randNum = getRandomArbitrary(0, self.Questions().length);
            self.CurrentQuestion(self.Questions()[randNum]);
            self.CurrentScore(0);
            self.Chances(6);
            self.Letters = GetAnswerLetters();
            self.Answer.removeAll();
            self.Answer(self.Letters);
            self.ResetUserAnswer();
            self.GuessedLetters.removeAll();
            self.chars.removeAll();
            self.chars(self.alphabet());
        };
        
        self.StartGame = function(){
                var repo = new QuizRepository(),
                randNum;
                self.Questions(repo.GetQuestions());
                randNum = getRandomArbitrary(0, self.Questions().length);
                self.Questions()[0].answer = "ab";
                // self.CurrentQuestion = ko.observable(self.Questions()[randNum]);
                self.CurrentQuestion = ko.observable(self.Questions()[0]);
                self.Letters = GetAnswerLetters();
                self.Answer = ko.observableArray(self.Letters);
                self.ResetUserAnswer();
                self.Chances(6);
                self.CurrentScore(0);
        };

        self.GameOver = ko.computed(function(){
            if(self.Chances() === 0)
            { return true; }
            else 
            { return false }
        }, self);
        
        self.alphabet = function(){return "abcdefghijklmnopqrstuvwxyz".split("");};
        self.chars = ko.observableArray(self.alphabet());
        self.wrongGuesses = ko.observableArray([]);
        
        self.TimeRemaining = ko.observable(60);
        self.ToggleIsGuessed = function (sender) {
            sender.IsGuessed(!self.IsGuessed());
        };
        
        self.GuessLetter = function(letter){
            var indexToPop = self.chars.indexOf(letter);
            self.chars.splice(indexToPop, 1);
            if(self.Answer().indexOf(letter) > -1){
                for( var i = 0; i < self.Answer().length; i ++ ){
                    if(letter === self.Answer()[i]){
                        self.UserAnswer()[i](self.Answer()[i]);
                    }
                }
            } else {
                self.GuessedLetters.push(letter);
                self.Chances(self.Chances() - 1); 
            }
            self.TimeRemaining(30);
        };
        
        // GetLetters returns all of the letters in the current answer
        // data is returned as an array of strings
        var GetAnswerLetters = function () {
            var answer = self.CurrentQuestion().answer.toLowerCase();
            var letters =  answer.split("");
            return letters;
        };
        
        self.ResetUserAnswer = function(){
            self.UserAnswer.removeAll();
            for(var i = 0; i < self.Answer().length; i++){
                if(self.Answer()[i] === " "){
                    self.UserAnswer().push(ko.observable(' '));
                } else { 
                    self.UserAnswer().push(ko.observable("_"));
                }
            }
            self.UserAnswer.valueHasMutated();
        };

        self.IsAnswerComplete = ko.computed(function(){
            var i, observ;
            if(self.UserAnswer === undefined || self.UserAnswer().length === 0){return false}
            for(i = 0; i < self.UserAnswer().length; i++){
                observ = self.UserAnswer()[i];
                console.log(observ());
                if(observ() === "_"){return false;}
            }
            self.CurrentScore(self.CurrentScore() + self.CurrentQuestion().value);
            return true;
        }, self);
        

        self.NextQuestion = function(){
            
            if(self.CurrentIndex() < self.Questions().length - 1){
                
                self.CurrentIndex(self.CurrentIndex() + 1);
                
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
                
                self.CurrentAnswer(self.CurrentQuestion().answer);
                
                self.ResetUserAnswer();
                self.GuessedLetters.removeAll();
                self.chars.removeAll();
                self.chars(self.alphabet());
            }
        };

        // init is run on page load
        // it sets needed intial values
        (function init(){
            self.StartGame();
        }());
    };
});
