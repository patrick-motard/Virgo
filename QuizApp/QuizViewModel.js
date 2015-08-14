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
        self.Chances = ko.observable(6);
        
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        self.chars = ko.observableArray(alphabet);
        self.wrongGuesses = ko.observableArray([]);
        
        self.TimeRemaining = ko.observable(3);
        self.ToggleIsGuessed = function (sender) {
            sender.IsGuessed(!self.IsGuessed());
        };
        
        self.GuessLetter = function(letter){
            
            //find location of letter in wordbank
            var indexToPop = self.chars.indexOf(letter);
            //remove it from word bank
            self.chars.splice(indexToPop, 1);
            
            // fill answer with occurances
            if(self.Answer().indexOf(letter) > -1){
                // loop through the letters
                for( var i = 0; i < self.Answer().length; i ++ ){
                    // if theres a match
                    if(letter === self.Answer()[i]){
                        // show the match to the user
                        self.UserAnswer()[i](self.Answer()[i]);
                    }
                }
            } else {
                // if the letter isnt in the answer, 
                // add it to the incorrect guesses pile
                self.GuessedLetters.push(letter);
            }
            // give the user more time to guess
            self.TimeRemaining(30);
        };
        
        // GetLetters returns all of the letters in the current answer
        // data is returned as an array of strings
        var GetAnswerLetters = function () {
            // make sure there are no capital letters
            var answer = self.CurrentQuestion().answer.toLowerCase();
            // make the string an array of strings
            var letters =  answer.split("");
            // return them :)
            return letters;
        };
        
        // this function clears the users answer
        self.ResetUserAnswer = function(){
            // clear the users answer
            self.UserAnswer([]);
            // loop through the letters in the real answer
            for(var i = 0; i < self.Answer().length; i++){
                // if the answer has a space
                if(self.Answer()[i] === " "){
                    // the user answer should too
                    self.UserAnswer().push(" ");
                // but if it's a regular character
                } else { 
                    // fill in an underscore instead
                    self.UserAnswer().push(ko.observable("_"));
                }
            }
        };
        
        // init is run on page load
        // it sets needed intial values
        (function init(){
            // intialize the DAL (data access layer)
            var repo = new QuizRepository();
            // get the questions from the DAL
            self.Questions(repo.GetQuestions(10,582));
            // the current question being asked is the first one recieved
            self.CurrentQuestion = ko.observable(self.Questions()[0]);
            
            //IGNORE THIS CODE//
            // letters is... all the in the answer (including duplicates)
            //  in sequential order 
            self.Letters = ko.observable(GetAnswerLetters());
            self.Answer = ko.observableArray(self.Letters());
            //clear the users answer
            self.ResetUserAnswer();
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

