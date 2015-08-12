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
        
        
        
        self.validate = function(data){
            if(self.UserAnswer().indexOf(data) > -1){
                return false;
            }else {return true;}
            
            // if letter occurs in users answer or in guessed letters visible = false
        };

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.push('_');
        self.chars = alphabet;
        
        self.TimeRemaining = ko.observable(30);
        
        self.GuessLetter = function(letter){
            //if letter is found in answer, take indexes where it was found, and add
            // the found letter to the same indexes in the users answer array
            //if not, put the letter in a guessed letters array
            
            // the answer visible on the view is the users answer, not the self.Answer,
            // the users answer starts off being an array of _ characters of length = self.answer
            // spaces are shown as spaces not _
            
            // hide button
            // this is handled by validate
            
            // fill answer with occurances
            if(self.Answer().indexOf(letter) > -1){
                for(var i = 0; i < self.Answer().length; i ++){
                    if(letter === self.Answer()[i]){
                        self.UserAnswer()[i] = self.Answer()[i];
                    }
                }
            }else self.GuessedLetters().push(letter);// add letter to guessed letters (if it isn't found)
            
            // reset timer
        };
        
        var GetLetters = function () {
            var letters = [];
            for(var i = 0; i < self.CurrentQuestion().answer.length; i++){
                letters.push(self.CurrentQuestion().answer[i]);
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
                    self.UserAnswer().push("_");
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

