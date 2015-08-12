define(['ko','jquery', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, jquery, QuestionModel, CategoryModel, QuizRepository){
    return function QuizViewModel(QuestionModel, CategoryModel){
        var self = this;
        
        self.Questions = ko.observableArray([]);
        self.CurrentIndex = ko.observable(0);
        self.CurrentQuestion = ko.observable({});
        self.CurrentAnswer = ko.observable('');
        self.CurrentScore = ko.observable(0);
        self.HighScore = ko.observable(0);
        
        self.validate = function(data){
            return true;
        };

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.push('_');
        self.chars = alphabet;
        
        self.TimeRemaining = ko.observable(30);
    
        (function init(){
            var repo = new QuizRepository();
            self.Questions(repo.GetQuestions(10,582));
            self.CurrentQuestion = ko.observable(self.Questions()[0]);
            self.Answer = ko.observableArray(self.CurrentQuestion().answer.split(""));
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

