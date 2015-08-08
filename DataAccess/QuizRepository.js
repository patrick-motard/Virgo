define(["ko", "jquery", 'QuestionModel', 'CategoryModel'], function(ko, $, QuestionModel, CategoryModel){
    'use strict';
    return function QuizRepository(){
        var self = this;
        self.GetQuestions = function(amount){
            var data = [{"id":28805,"answer":"Mississippi River","question":"This river's delta covers more than 12,000 square miles in Louisiana","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.930Z","updated_at":"2014-02-11T23:02:57.930Z","category_id":582,"game_id":null,"invalid_count":null,"category":{"id":582,"title":"u.s. geography","created_at":"2014-02-11T22:49:17.001Z","updated_at":"2014-02-11T22:49:17.001Z","clues_count":220}},{"id":28806,"answer":"Franklin D. Roosevelt","question":"1945:\"I have a terrible headache\"","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.946Z","updated_at":"2014-02-11T23:02:57.946Z","category_id":3246,"game_id":null,"invalid_count":null,"category":{"id":3246,"title":"presidential last words","created_at":"2014-02-11T23:02:57.860Z","updated_at":"2014-02-11T23:02:57.860Z","clues_count":5}},{"id":28807,"answer":"Fred \u0026 Ethel Mertz","question":"Lucy \u0026 Ricky's New York landlords","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.963Z","updated_at":"2014-02-11T23:02:57.963Z","category_id":3247,"game_id":null,"invalid_count":null,"category":{"id":3247,"title":"we love lucy","created_at":"2014-02-11T23:02:57.872Z","updated_at":"2014-02-11T23:02:57.872Z","clues_count":5}},{"id":28808,"answer":"United States","question":"The Lindy Hop","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.980Z","updated_at":"2014-02-11T23:02:57.980Z","category_id":3248,"game_id":null,"invalid_count":null,"category":{"id":3248,"title":"country dancing","created_at":"2014-02-11T23:02:57.883Z","updated_at":"2014-02-11T23:02:57.883Z","clues_count":5}},{"id":28809,"answer":"martini","question":"The classic version is 1 1/2 oz. gin, 3/4 oz. dry vermouth, lemon twist or olive","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.004Z","updated_at":"2014-02-11T23:02:58.004Z","category_id":3249,"game_id":null,"invalid_count":null,"category":{"id":3249,"title":"the cocktail hour","created_at":"2014-02-11T23:02:57.895Z","updated_at":"2014-02-11T23:02:57.895Z","clues_count":5}},{"id":28810,"answer":"westerns","question":"The popular films of this genre can be known as \"oaters\" or \"horse operas\"","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.029Z","updated_at":"2014-02-11T23:02:58.029Z","category_id":3250,"game_id":null,"invalid_count":null,"category":{"id":3250,"title":"hollywoodspeak","created_at":"2014-02-11T23:02:57.906Z","updated_at":"2014-02-11T23:02:57.906Z","clues_count":5}},{"id":28811,"answer":"Rocky Mountains","question":"This mountain system stretches from New Mexico to the Brooks Range north of the Arctic Circle","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.046Z","updated_at":"2014-02-11T23:02:58.046Z","category_id":582,"game_id":null,"invalid_count":null,"category":{"id":582,"title":"u.s. geography","created_at":"2014-02-11T22:49:17.001Z","updated_at":"2014-02-11T22:49:17.001Z","clues_count":220}},{"id":28812,"answer":"George Washington","question":"1799:\"It is well\"","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.063Z","updated_at":"2014-02-11T23:02:58.063Z","category_id":3246,"game_id":null,"invalid_count":null,"category":{"id":3246,"title":"presidential last words","created_at":"2014-02-11T23:02:57.860Z","updated_at":"2014-02-11T23:02:57.860Z","clues_count":5}},{"id":28813,"answer":"Scotland","question":"Lucy Ricardo's maiden name reflected her fictional ancestry in this country","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.079Z","updated_at":"2014-02-11T23:02:58.079Z","category_id":3247,"game_id":null,"invalid_count":null,"category":{"id":3247,"title":"we love lucy","created_at":"2014-02-11T23:02:57.872Z","updated_at":"2014-02-11T23:02:57.872Z","clues_count":5}},{"id":28815,"answer":"Collins","question":"Last name of Tom, made with the juice of 1/2 a lemon, 1 tsp. powdered sugar \u0026 2 oz. gin","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.113Z","updated_at":"2014-02-11T23:02:58.113Z","category_id":3249,"game_id":null,"invalid_count":null,"category":{"id":3249,"title":"the cocktail hour","created_at":"2014-02-11T23:02:57.895Z","updated_at":"2014-02-11T23:02:57.895Z","clues_count":5}}],
            questionArr = [];
            for(var i = 0; i < amount; i++){
                var category = new CategoryModel(data[i].category), 
                question = new QuestionModel(data[i]);
                question.category = category;
                questionArr.push(question);
            }    
            return questionArr;
            
        
            
            // return $.getJSON(data, function(data){
            //     var category = new CategoryModel(data.category);  
            //     var question = new QuestionModel(data);
            //     question.category = category;
            //     return question;
            // });
        };
    };
});


    //   self.getQuestion = function(){
    //       $.ajax({
    //           url: 'http://jservice.io/api/random?count=1',
    //           xhrFields: {
    //               withCredentials: true
    //           }}).done(function( data ) {
                
    //               console.log( "Sample of data:", data.slice( 0, 100 ) );
        
    //                 });//end of .done
    //   }