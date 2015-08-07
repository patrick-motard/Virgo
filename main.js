/*jshint curly:true, debug:true */

require(["bower_components/jquery/dist/jquery", "bower_components/knockout/dist/knockout", ], function($, ko){
    


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
    
    var questions = [{"id":146570,
    "answer":"lees",
    "question":"The wine dregs",
    "value":1000,
    "airdate":"2014-06-23T12:00:00.000Z",
    "created_at":"2015-01-22T02:33:28.263Z",
    "updated_at":"2015-01-22T02:33:28.263Z",
    "category_id":16896,
    "game_id":4543,
    "invalid_count":null,
    "category":{"id":16896,"title":"l __ __ s","created_at":"2015-01-18T18:09:56.609Z","updated_at":"2015-01-18T18:09:56.609Z","clues_count":10}}];
    
    
    
    
    
    // Here's my data model
    var ViewModel = function() {
        var self = this;
        
        self.firstQuestion = new questionModel(questions[0].question, questions[0].answer, 15);
        
        self.question = self.firstQuestion.question;
        self.userAnswer = self.firstQuestion.userAnswer;
        
        self.time = "10";
        self.realAnswer = self.firstQuestion.realAnswer;
        
        self.result = self.firstQuestion.awarded;
        
        
    //   self.getQuestion = function(){
    //       $.ajax({
    //           url: 'http://jservice.io/api/random?count=1',
    //           xhrFields: {
    //               withCredentials: true
    //           }}).done(function( data ) {
                
    //               console.log( "Sample of data:", data.slice( 0, 100 ) );
        
    //                 });//end of .done
    //   }
    
    
            self.getQuestion = function(){
                
            }
        
    
    }
    ko.applyBindings(new ViewModel(), document.getElementById('main')); 

});