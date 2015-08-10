define(['ko','jquery', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, jquery, QuestionModel, CategoryModel, QuizRepository){
    return function QuizViewModel(QuestionModel, CategoryModel){
        var self = this;
        
        self.Questions = ko.observableArray([]);
        self.CurrentIndex = ko.observable(0);
        self.CurrentQuestion = ko.observable({});
        self.CurrentAnswer = ko.observable('');
        // new TimerViewModel()
        self.NextQuestion = function(){
            if(self.CurrentIndex() < self.Questions().length - 1){
                self.CurrentIndex(self.CurrentIndex() + 1);
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
                self.CurrentAnswer(self.CurrentQuestion().answer);
            }
        };//no longer needed as a button
        
        self.PreviousQuestion = function(){
            if(self.CurrentIndex() > 0){
                self.CurrentIndex(self.CurrentIndex() - 1);
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
                self.CurrentAnswer(self.CurrentQuestion().answer);
            }
        };//no longer needed as a button
        
        self.AnswerArray = function(answer){
            var arr = [];
            for(var i = 0; i < answer.length; i++){
                arr.push(answer[i]);
            }  
            return arr;
        };//function to split each char in a string and return an array.
        
        //self.userAnswer = ko.observable(""); no longer used
        // self.awarded = ko.computed(function(){
        //      return self.CurrentQuestion().answer == self.userAnswer() ? true : false;
        // }, self); no longer used
        
        
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        alphabet.push('_');
        self.chars = alphabet;
        
        
        
        // self.dododo = function(){
        //     self.timey(2);
            
        // } no longer used
        self.timey = ko.observable(3);
    
        (function init(){
            var repo = new QuizRepository();
            self.Questions(repo.GetQuestions(10,582));
            self.CurrentQuestion = ko.observable(self.Questions()[0]);
            self.CurrentAnswer = ko.observable(self.AnswerArray(self.CurrentQuestion().answer));
        }());
    };
});


