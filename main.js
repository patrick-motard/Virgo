/*jshint curly:true, debug:true */

var questionModel = function (question, answer, points){
    var self = this;
    
    self.question = question;
    self.realAnswer = answer;
    self.pointValue = points;
    self.userAnswer = ko.observable("");
    self.awarded = ko.computed(function(){
         return self.realAnswer == self.userAnswer() ? true : false;
    }, self);
    
    return self;
}



// Here's my data model
var ViewModel = function() {
    var self = this;
    
    self.firstQuestion = new questionModel('what is 1 + 1?', 2, 15);
    
    self.question = self.firstQuestion.question;
    self.userAnswer = self.firstQuestion.userAnswer;
    
    self.time = "10";
    self.realAnswer = self.firstQuestion.realAnswer;
    
    self.result = self.firstQuestion.awarded;
    
    
    self.getQuestion = function(){
        $.getJSON('http://jservice.io/api/random?count=1', function(data){
            console.log(data);
        })
    }
};
 
ko.applyBindings(new ViewModel(), document.getElementById('main')); 