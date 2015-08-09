define(['ko','jquery', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, jquery, QuestionModel, CategoryModel, QuizRepository){
    return function QuizViewModel(QuestionModel, CategoryModel){
        var self = this;
        
        self.Questions = ko.observableArray([]);
        self.CurrentIndex = ko.observable(0);
        self.CurrentQuestion = ko.observable({});
        
        self.NextQuestion = function(){
            if(self.CurrentIndex() < self.Questions().length - 1){
                self.CurrentIndex(self.CurrentIndex() + 1);
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
            }
        };
        
        self.PreviousQuestion = function(){
            if(self.CurrentIndex() > 0){
                self.CurrentIndex(self.CurrentIndex() - 1);
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
            }
        };
   
        self.userAnswer = ko.observable("");
        self.awarded = ko.computed(function(){
             return self.CurrentQuestion().answer == self.userAnswer() ? true : false;
        }, self);
        
        self.time = "10";
        
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.push('_');
        self.chars = alphabet;
        
        
    
        (function init(){
            // self.Questions([1,2,3,4,5,10,1222,12213]);
            var repo = new QuizRepository();
            self.Questions(repo.GetQuestions(10,582));
            self.CurrentQuestion = ko.observable(self.Questions()[0]);
        }());
    };
});