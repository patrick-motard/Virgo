define(['ko','jquery', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, jquery, QuestionModel, CategoryModel, QuizRepository){
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
        
        
        
        // self.validate = ko.computed(function(data){
            
        //     var letterInAnswer = self.UserAnswer().indexOf(data) > -1;
            
        //     var letterAlreadyGuessed = self.GuessedLetters().indexOf(data) > -1;
            
        //     if (letterInAnswer || letterAlreadyGuessed){
                
        //         return false;
                
        //     } else {
        //         return true;
        //     }}, self);
            
            // if letter occurs in users answer or in guessed letters visible = false

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        self.chars = ko.observableArray(alphabet);
        self.wrongGuesses = ko.observableArray([]);
        
        self.TimeRemaining = ko.observable(30);
        self.ToggleIsGuessed = function (sender) {
            sender.IsGuessed(!self.IsGuessed());
        };
        
        // ko.utils.arrayForEach(self.Tests(), function (test) {
        //     if (!test.isExpanded) {
        //         test.isExpanded = ko.observable();
        //     }
        // };
        
        // self.toggleIsExpanded = function (sender) {
        //   sender.isExpanded(!self.isExpanded());
        // };
        
        self.GuessLetter = function(letter){
            
            //find location of letter in alphabet
            var indexToPop = self.chars.indexOf(letter);
            //remove it
            self.chars.splice(indexToPop, 1);
            //give user more time to guess
            self.TimeRemaining(30);
            
            
            // fill answer with occurances
            if(self.Answer().indexOf(letter) > -1){
                for(var i = 0; i < self.Answer().length; i ++){
                    if(letter === self.Answer()[i]){
                        self.UserAnswer()[i](self.Answer()[i]);
                    }
                }
            }else {
                self.GuessedLetters().push(letter);
            }// add letter to guessed letters (if it isn't found)
            
            // reset timer
        };
        
        var GetLetters = function () {
            var answer = self.CurrentQuestion().answer.toLowerCase();
            var letters = [];
            for(var i = 0; i < answer.length; i++){
                letters.push(answer[i]);
            }

            return letters;
        };
        
        
        
        
        (function init(){
            var repo = new QuizRepository();
            self.Questions(repo.GetQuestions(10,582));
            self.CurrentQuestion = ko.observable(self.Questions()[0]);
            self.Letters = ko.observable(GetLetters());
            self.Answer = ko.observableArray(self.Letters());
            
            
            for(var i = 0; i < self.Answer().length; i++){
                if(self.Answer()[i] === " "){
                    self.UserAnswer().push(" ");
                }else{ 
                    self.UserAnswer().push(ko.observable("_"));
                }
            }
        }());
    };
});



//////////YE GRAVEYARD OF OLDE BUT MAYBE VALUEABLE CODE////////////////////////
        // self.NextQuestion = function(){
        //     if(self.CurrentIndex() < self.Questions().length - 1){
        //         self.CurrentIndex(self.CurrentIndex() + 1);
        //         self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
        //         self.CurrentAnswer(self.CurrentQuestion().answer);
        //     }
        // };//no longer needed as a button
        
        // self.PreviousQuestion = function(){
        //     if(self.CurrentIndex() > 0){
        //         self.CurrentIndex(self.CurrentIndex() - 1);
        //         self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
        //         self.CurrentAnswer(self.CurrentQuestion().answer);
        //     }
        // };//no longer needed as a button

