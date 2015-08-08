define(['ko','jquery', 'QuestionModel', 'CategoryModel', 'QuizRepository'], function(ko, jquery, QuestionModel, CategoryModel, QuizRepository){
    return function QuizViewModel(QuestionModel, CategoryModel){
        var self = this;
        self.Questions = ko.observableArray([]);
        
        
        
        
        self.userAnswer = ko.observable("");
        self.awarded = ko.computed(function(){
             return self.realAnswer == self.userAnswer() ? true : false;
        }, self);
        
        self.time = "10";
    
        (function init(){
            // self.Questions([1,2,3,4,5,10,1222,12213]);
            var repo = new QuizRepository();
            self.Questions(repo.GetQuestions(10));
        }());
    };
});