define(["ko", "jquery", 'QuestionModel', 'CategoryModel'], function(ko, $, QuestionModel, CategoryModel){
    'use strict';
    return function QuizRepository(){
        var self = this;
        var baseURL = 'https://jservice.io/api';
        
        //static data test function
        // self.GetQuestions = function(){
        //     // var data = [{"id":28805,"answer":"Mississippi River","question":"This river's delta covers more than 12,000 square miles in Louisiana","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.930Z","updated_at":"2014-02-11T23:02:57.930Z","category_id":582,"game_id":null,"invalid_count":null,"category":{"id":582,"title":"u.s. geography","created_at":"2014-02-11T22:49:17.001Z","updated_at":"2014-02-11T22:49:17.001Z","clues_count":220}},{"id":28806,"answer":"Franklin D. Roosevelt","question":"1945:\"I have a terrible headache\"","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.946Z","updated_at":"2014-02-11T23:02:57.946Z","category_id":3246,"game_id":null,"invalid_count":null,"category":{"id":3246,"title":"presidential last words","created_at":"2014-02-11T23:02:57.860Z","updated_at":"2014-02-11T23:02:57.860Z","clues_count":5}},{"id":28807,"answer":"Fred \u0026 Ethel Mertz","question":"Lucy \u0026 Ricky's New York landlords","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.963Z","updated_at":"2014-02-11T23:02:57.963Z","category_id":3247,"game_id":null,"invalid_count":null,"category":{"id":3247,"title":"we love lucy","created_at":"2014-02-11T23:02:57.872Z","updated_at":"2014-02-11T23:02:57.872Z","clues_count":5}},{"id":28808,"answer":"United States","question":"The Lindy Hop","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:57.980Z","updated_at":"2014-02-11T23:02:57.980Z","category_id":3248,"game_id":null,"invalid_count":null,"category":{"id":3248,"title":"country dancing","created_at":"2014-02-11T23:02:57.883Z","updated_at":"2014-02-11T23:02:57.883Z","clues_count":5}},{"id":28809,"answer":"martini","question":"The classic version is 1 1/2 oz. gin, 3/4 oz. dry vermouth, lemon twist or olive","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.004Z","updated_at":"2014-02-11T23:02:58.004Z","category_id":3249,"game_id":null,"invalid_count":null,"category":{"id":3249,"title":"the cocktail hour","created_at":"2014-02-11T23:02:57.895Z","updated_at":"2014-02-11T23:02:57.895Z","clues_count":5}},{"id":28810,"answer":"westerns","question":"The popular films of this genre can be known as \"oaters\" or \"horse operas\"","value":100,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.029Z","updated_at":"2014-02-11T23:02:58.029Z","category_id":3250,"game_id":null,"invalid_count":null,"category":{"id":3250,"title":"hollywoodspeak","created_at":"2014-02-11T23:02:57.906Z","updated_at":"2014-02-11T23:02:57.906Z","clues_count":5}},{"id":28811,"answer":"Rocky Mountains","question":"This mountain system stretches from New Mexico to the Brooks Range north of the Arctic Circle","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.046Z","updated_at":"2014-02-11T23:02:58.046Z","category_id":582,"game_id":null,"invalid_count":null,"category":{"id":582,"title":"u.s. geography","created_at":"2014-02-11T22:49:17.001Z","updated_at":"2014-02-11T22:49:17.001Z","clues_count":220}},{"id":28812,"answer":"George Washington","question":"1799:\"It is well\"","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.063Z","updated_at":"2014-02-11T23:02:58.063Z","category_id":3246,"game_id":null,"invalid_count":null,"category":{"id":3246,"title":"presidential last words","created_at":"2014-02-11T23:02:57.860Z","updated_at":"2014-02-11T23:02:57.860Z","clues_count":5}},{"id":28813,"answer":"Scotland","question":"Lucy Ricardo's maiden name reflected her fictional ancestry in this country","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.079Z","updated_at":"2014-02-11T23:02:58.079Z","category_id":3247,"game_id":null,"invalid_count":null,"category":{"id":3247,"title":"we love lucy","created_at":"2014-02-11T23:02:57.872Z","updated_at":"2014-02-11T23:02:57.872Z","clues_count":5}},{"id":28815,"answer":"Collins","question":"Last name of Tom, made with the juice of 1/2 a lemon, 1 tsp. powdered sugar \u0026 2 oz. gin","value":200,"airdate":"1999-05-28T12:00:00.000Z","created_at":"2014-02-11T23:02:58.113Z","updated_at":"2014-02-11T23:02:58.113Z","category_id":3249,"game_id":null,"invalid_count":null,"category":{"id":3249,"title":"the cocktail hour","created_at":"2014-02-11T23:02:57.895Z","updated_at":"2014-02-11T23:02:57.895Z","clues_count":5}}],
        //     var data = self.data,
        //     questionArr = [];
        //     for(var i = 0; i < amount; i++){
        //         var question = new QuestionModel(data[i]);
        //         if(category_id == question.category_id){
        //             questionArr.push(question);
        //         }
        //     }    
        //     return questionArr;
        // };
        
        self.GetQuestions = function(){
            var data = self.data,
            questions = [];
            for(var i = 0; i < data.length; i++){
                var category = new CategoryModel(data[i].category);
                var question = new QuestionModel(data[i]);
                question.category = category;
                questions.push(question);
            }
            return questions;
        };


        //live api call function type should be random or category
        self.GetQuestionApi = function(amount, type){
            $.ajax({
                url: baseURL+type+'?count='+amount,
                xhrFields: {
                     withCredentials: true
                }}).done(function( data ) {
                    var questionArr = [];
                    for(var i = 0; i < data.length; i++){
                        var question = new QuestionModel(data[i]);
                        questionArr.push(question);
                        }
                    return questionArr;
                    });//end of .done
        }; 
        
        self.data = [
        {
        id: 14920,
        answer: "a tutu",
        question: "It skirts the issue if the issue happens to be a ballerina",
        value: 100,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.442Z",
        updated_at: "2014-02-11T22:54:54.442Z",
        category_id: 89,
        game_id: null,
        invalid_count: null,
        category: {
        id: 89,
        title: "double talk",
        created_at: "2014-02-11T22:47:32.838Z",
        updated_at: "2014-02-11T22:47:32.838Z",
        clues_count: 110
        }
        },
        {
        id: 14921,
        answer: "ibuprofen",
        question: "In 1984 this painkiller found in Advil was approved for over-the-counter sale in the U.S.",
        value: 200,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.456Z",
        updated_at: "2014-02-11T22:54:54.456Z",
        category_id: 1107,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1107,
        title: "the 1980s",
        created_at: "2014-02-11T22:52:06.339Z",
        updated_at: "2014-02-11T22:52:06.339Z",
        clues_count: 55
        }
        },
        {
        id: 14923,
        answer: "Reagan",
        question: "In 1985 this president proclaimed August 26 as Women's Equality Day",
        value: 200,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.486Z",
        updated_at: "2014-02-11T22:54:54.486Z",
        category_id: 1114,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1114,
        title: "annual events",
        created_at: "2014-02-11T22:52:08.226Z",
        updated_at: "2014-02-11T22:52:08.226Z",
        clues_count: 217
        }
        },
        {
        id: 14924,
        answer: "Pisces",
        question: "People born under this sign of the fishes are known for their generosity",
        value: 200,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.500Z",
        updated_at: "2014-02-11T22:54:54.500Z",
        category_id: 167,
        game_id: null,
        invalid_count: null,
        category: {
        id: 167,
        title: "astrology",
        created_at: "2014-02-11T22:47:47.381Z",
        updated_at: "2014-02-11T22:47:47.381Z",
        clues_count: 35
        }
        },
        {
        id: 14926,
        answer: "a no-no",
        question: "Something forbidden or unacceptable is one of these",
        value: 200,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.527Z",
        updated_at: "2014-02-11T22:54:54.527Z",
        category_id: 89,
        game_id: null,
        invalid_count: null,
        category: {
        id: 89,
        title: "double talk",
        created_at: "2014-02-11T22:47:32.838Z",
        updated_at: "2014-02-11T22:47:32.838Z",
        clues_count: 110
        }
        },
        {
        id: 14927,
        answer: "Argentina",
        question: "This country occupied the Falkland Islands for about 10 weeks in 1982",
        value: 300,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.568Z",
        updated_at: "2014-02-11T22:54:54.568Z",
        category_id: 1107,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1107,
        title: "the 1980s",
        created_at: "2014-02-11T22:52:06.339Z",
        updated_at: "2014-02-11T22:52:06.339Z",
        clues_count: 55
        }
        },
        {
        id: 14929,
        answer: "Annie Oakley",
        question: "Greenville, Ohio holds an annual celebration honoring this female sharpshooter",
        value: 300,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.596Z",
        updated_at: "2014-02-11T22:54:54.596Z",
        category_id: 1114,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1114,
        title: "annual events",
        created_at: "2014-02-11T22:52:08.226Z",
        updated_at: "2014-02-11T22:52:08.226Z",
        clues_count: 217
        }
        },
        {
        id: 14930,
        answer: "Sagittarius",
        question: "This sign of the archer is ruled by Jupiter, which astrologers believe is a friendly planet",
        value: 300,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.610Z",
        updated_at: "2014-02-11T22:54:54.610Z",
        category_id: 167,
        game_id: null,
        invalid_count: null,
        category: {
        id: 167,
        title: "astrology",
        created_at: "2014-02-11T22:47:47.381Z",
        updated_at: "2014-02-11T22:47:47.381Z",
        clues_count: 35
        }
        },
        {
        id: 14931,
        answer: "Seville",
        question: "Home to an operatic barber, this Spanish city was once called Hispalis",
        value: 300,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.624Z",
        updated_at: "2014-02-11T22:54:54.624Z",
        category_id: 455,
        game_id: null,
        invalid_count: null,
        category: {
        id: 455,
        title: "world cities",
        created_at: "2014-02-11T22:48:46.649Z",
        updated_at: "2014-02-11T22:48:46.649Z",
        clues_count: 80
        }
        },
        {
        id: 14933,
        answer: "(Ross) Perot",
        question: "This Texan sold his Electronic Data Systems to General Motors for $2.5 billion",
        value: 400,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.651Z",
        updated_at: "2014-02-11T22:54:54.651Z",
        category_id: 1107,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1107,
        title: "the 1980s",
        created_at: "2014-02-11T22:52:06.339Z",
        updated_at: "2014-02-11T22:52:06.339Z",
        clues_count: 55
        }
        },
        {
        id: 14935,
        answer: "the Calgary Stampede",
        question: "In 1912 American Guy Weadick organized this annual Calgary, Alberta rodeo",
        value: 400,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.677Z",
        updated_at: "2014-02-11T22:54:54.677Z",
        category_id: 1114,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1114,
        title: "annual events",
        created_at: "2014-02-11T22:52:08.226Z",
        updated_at: "2014-02-11T22:52:08.226Z",
        clues_count: 217
        }
        },
        {
        id: 14936,
        answer: "Virgo",
        question: "One symbol of this sign is a harvest maiden holding a sheaf of wheat",
        value: 400,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.691Z",
        updated_at: "2014-02-11T22:54:54.691Z",
        category_id: 167,
        game_id: null,
        invalid_count: null,
        category: {
        id: 167,
        title: "astrology",
        created_at: "2014-02-11T22:47:47.381Z",
        updated_at: "2014-02-11T22:47:47.381Z",
        clues_count: 35
        }
        },
        {
        id: 14937,
        answer: "Ho Chi Minh City",
        question: "When Vietnam was reunified in 1976, Saigon was renamed this",
        value: 400,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.705Z",
        updated_at: "2014-02-11T22:54:54.705Z",
        category_id: 455,
        game_id: null,
        invalid_count: null,
        category: {
        id: 455,
        title: "world cities",
        created_at: "2014-02-11T22:48:46.649Z",
        updated_at: "2014-02-11T22:48:46.649Z",
        clues_count: 80
        }
        },
        {
        id: 14938,
        answer: "Chi-Chi",
        question: "Famous Puerto Rican golf pro Rodriguez",
        value: 400,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.718Z",
        updated_at: "2014-02-11T22:54:54.718Z",
        category_id: 89,
        game_id: null,
        invalid_count: null,
        category: {
        id: 89,
        title: "double talk",
        created_at: "2014-02-11T22:47:32.838Z",
        updated_at: "2014-02-11T22:47:32.838Z",
        clues_count: 110
        }
        },
        {
        id: 14939,
        answer: "Saudi Arabia",
        question: "In 1982, Fahd succeeded Khalid as king of this country",
        value: 500,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.732Z",
        updated_at: "2014-02-11T22:54:54.732Z",
        category_id: 1107,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1107,
        title: "the 1980s",
        created_at: "2014-02-11T22:52:06.339Z",
        updated_at: "2014-02-11T22:52:06.339Z",
        clues_count: 55
        }
        },
        {
        id: 14942,
        answer: "Scorpio & Cancer",
        question: "The two signs of the Zodiac symbolized by arthropods",
        value: null,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.772Z",
        updated_at: "2014-02-11T22:54:54.772Z",
        category_id: 167,
        game_id: null,
        invalid_count: null,
        category: {
        id: 167,
        title: "astrology",
        created_at: "2014-02-11T22:47:47.381Z",
        updated_at: "2014-02-11T22:47:47.381Z",
        clues_count: 35
        }
        },
        {
        id: 14943,
        answer: "Antwerp",
        question: "More diamonds are cut and traded in this Belgian port city than anywhere else in the world",
        value: 500,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.786Z",
        updated_at: "2014-02-11T22:54:54.786Z",
        category_id: 455,
        game_id: null,
        invalid_count: null,
        category: {
        id: 455,
        title: "world cities",
        created_at: "2014-02-11T22:48:46.649Z",
        updated_at: "2014-02-11T22:48:46.649Z",
        clues_count: 80
        }
        },
        {
        id: 14944,
        answer: "chop-chop",
        question: "From Chinese Pidgin English, it means very quickly",
        value: 500,
        airdate: "1995-09-25T12:00:00.000Z",
        created_at: "2014-02-11T22:54:54.799Z",
        updated_at: "2014-02-11T22:54:54.799Z",
        category_id: 89,
        game_id: null,
        invalid_count: null,
        category: {
        id: 89,
        title: "double talk",
        created_at: "2014-02-11T22:47:32.838Z",
        updated_at: "2014-02-11T22:47:32.838Z",
        clues_count: 110
        }
        },
        {
        id: 14945,
        answer: "Catherine the Great",
        question: "She was born Sophia Augusta Fredericka of Anhalt-Zerbst in Pomerania",
        value: 100,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.324Z",
        updated_at: "2014-02-11T22:54:55.324Z",
        category_id: 1578,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1578,
        title: "russian rulers",
        created_at: "2014-02-11T22:54:55.277Z",
        updated_at: "2014-02-11T22:54:55.277Z",
        clues_count: 5
        }
        },
        {
        id: 14947,
        answer: "iron",
        question: "Girls of the late '60s pressed their hair with a warm one of these to remove all waviness",
        value: 100,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.352Z",
        updated_at: "2014-02-11T22:54:55.352Z",
        category_id: 1579,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1579,
        title: "hairstyles",
        created_at: "2014-02-11T22:54:55.291Z",
        updated_at: "2014-02-11T22:54:55.291Z",
        clues_count: 10
        }
        },
        {
        id: 14948,
        answer: "lakes",
        question: "There are about 30,000 of these in the state & Okeechobee is the largest",
        value: 100,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.365Z",
        updated_at: "2014-02-11T22:54:55.365Z",
        category_id: 1580,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1580,
        title: "florida",
        created_at: "2014-02-11T22:54:55.301Z",
        updated_at: "2014-02-11T22:54:55.301Z",
        clues_count: 10
        }
        },
        {
        id: 14949,
        answer: "Rome",
        question: "Designed by Donato Bramante, the Tempietto of San Pietro in this city marks the site of St. Peter's martyrdom",
        value: 100,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.379Z",
        updated_at: "2014-02-11T22:54:55.379Z",
        category_id: 993,
        game_id: null,
        invalid_count: null,
        category: {
        id: 993,
        title: "architecture",
        created_at: "2014-02-11T22:51:27.545Z",
        updated_at: "2014-02-11T22:51:27.545Z",
        clues_count: 50
        }
        },
        {
        id: 14950,
        answer: "mutt",
        question: "A cur or a mongrel",
        value: 100,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.392Z",
        updated_at: "2014-02-11T22:54:55.392Z",
        category_id: 51,
        game_id: null,
        invalid_count: null,
        category: {
        id: 51,
        title: "4-letter words",
        created_at: "2014-02-11T22:47:25.679Z",
        updated_at: "2014-02-11T22:47:25.679Z",
        clues_count: 165
        }
        },
        {
        id: 14951,
        answer: "Nicholas II",
        question: "In the 1890s he nominally presided over construction of the Trans-Siberian railroad",
        value: 200,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.405Z",
        updated_at: "2014-02-11T22:54:55.405Z",
        category_id: 1578,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1578,
        title: "russian rulers",
        created_at: "2014-02-11T22:54:55.277Z",
        updated_at: "2014-02-11T22:54:55.277Z",
        clues_count: 5
        }
        },
        {
        id: 14953,
        answer: "bangs",
        question: "These, called fringe in England, are hair combed forward over the forehead & cut straight across",
        value: 200,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.432Z",
        updated_at: "2014-02-11T22:54:55.432Z",
        category_id: 1579,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1579,
        title: "hairstyles",
        created_at: "2014-02-11T22:54:55.291Z",
        updated_at: "2014-02-11T22:54:55.291Z",
        clues_count: 10
        }
        },
        {
        id: 14954,
        answer: "Tallahassee",
        question: "This Florida city was the only Confederate capital east of the Mississippi not captured by the Union",
        value: 200,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.446Z",
        updated_at: "2014-02-11T22:54:55.446Z",
        category_id: 1580,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1580,
        title: "florida",
        created_at: "2014-02-11T22:54:55.301Z",
        updated_at: "2014-02-11T22:54:55.301Z",
        clues_count: 10
        }
        },
        {
        id: 14955,
        answer: "roofs",
        question: "Styles of this building feature include pitched, hipped & gambrel",
        value: 200,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.459Z",
        updated_at: "2014-02-11T22:54:55.459Z",
        category_id: 993,
        game_id: null,
        invalid_count: null,
        category: {
        id: 993,
        title: "architecture",
        created_at: "2014-02-11T22:51:27.545Z",
        updated_at: "2014-02-11T22:51:27.545Z",
        clues_count: 50
        }
        },
        {
        id: 14957,
        answer: "Peter the Great",
        question: "In the 1690s he recruited about 900 technicians on his tour of western Europe",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.513Z",
        updated_at: "2014-02-11T22:54:55.513Z",
        category_id: 1578,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1578,
        title: "russian rulers",
        created_at: "2014-02-11T22:54:55.277Z",
        updated_at: "2014-02-11T22:54:55.277Z",
        clues_count: 5
        }
        },
        {
        id: 14958,
        answer: "Jack Sprat",
        question: "One rhyme claims he had a pig that was not very lean & not very fat",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.527Z",
        updated_at: "2014-02-11T22:54:55.527Z",
        category_id: 37,
        game_id: null,
        invalid_count: null,
        category: {
        id: 37,
        title: "nursery rhymes",
        created_at: "2014-02-11T22:47:23.340Z",
        updated_at: "2014-02-11T22:47:23.340Z",
        clues_count: 110
        }
        },
        {
        id: 14959,
        answer: "mohawk",
        question: "This \"Indian\" style features a shaved head with a strip of hair running from brow to nape",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.540Z",
        updated_at: "2014-02-11T22:54:55.540Z",
        category_id: 1579,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1579,
        title: "hairstyles",
        created_at: "2014-02-11T22:54:55.291Z",
        updated_at: "2014-02-11T22:54:55.291Z",
        clues_count: 10
        }
        },
        {
        id: 14960,
        answer: "Kennedy Space Center",
        question: "This space center is headquartered on Merritt Island, not on Cape Canaveral",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.554Z",
        updated_at: "2014-02-11T22:54:55.554Z",
        category_id: 1580,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1580,
        title: "florida",
        created_at: "2014-02-11T22:54:55.301Z",
        updated_at: "2014-02-11T22:54:55.301Z",
        clues_count: 10
        }
        },
        {
        id: 14961,
        answer: "Hartford",
        question: "This Conn. city's old state house, designed by Charles Bulfinch is a masterpiece of the Federalist style",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.567Z",
        updated_at: "2014-02-11T22:54:55.567Z",
        category_id: 993,
        game_id: null,
        invalid_count: null,
        category: {
        id: 993,
        title: "architecture",
        created_at: "2014-02-11T22:51:27.545Z",
        updated_at: "2014-02-11T22:51:27.545Z",
        clues_count: 50
        }
        },
        {
        id: 14962,
        answer: "bank",
        question: "It means to put your money away or to hit a billiard ball off a cushion",
        value: 300,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.580Z",
        updated_at: "2014-02-11T22:54:55.580Z",
        category_id: 51,
        game_id: null,
        invalid_count: null,
        category: {
        id: 51,
        title: "4-letter words",
        created_at: "2014-02-11T22:47:25.679Z",
        updated_at: "2014-02-11T22:47:25.679Z",
        clues_count: 165
        }
        },
        {
        id: 14963,
        answer: "Ivan the Terrible",
        question: "In 1581 he killed his son & heir in a rage",
        value: 400,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.594Z",
        updated_at: "2014-02-11T22:54:55.594Z",
        category_id: 1578,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1578,
        title: "russian rulers",
        created_at: "2014-02-11T22:54:55.277Z",
        updated_at: "2014-02-11T22:54:55.277Z",
        clues_count: 5
        }
        },
        {
        id: 14964,
        answer: "cock-a-doodle-doo",
        question: "Barnyard cry that precedes \"My dame has lost her shoe\"",
        value: 400,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.608Z",
        updated_at: "2014-02-11T22:54:55.608Z",
        category_id: 37,
        game_id: null,
        invalid_count: null,
        category: {
        id: 37,
        title: "nursery rhymes",
        created_at: "2014-02-11T22:47:23.340Z",
        updated_at: "2014-02-11T22:47:23.340Z",
        clues_count: 110
        }
        },
        {
        id: 14965,
        answer: "crew cut",
        question: "This men's hairstyle was originally worn by Ivy League college rowers, hence its name",
        value: 400,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.621Z",
        updated_at: "2014-02-11T22:54:55.621Z",
        category_id: 1579,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1579,
        title: "hairstyles",
        created_at: "2014-02-11T22:54:55.291Z",
        updated_at: "2014-02-11T22:54:55.291Z",
        clues_count: 10
        }
        },
        {
        id: 14966,
        answer: "Palm Beach",
        question: "This city's name resulted from the 1879 wreck of a ship carrying coconuts",
        value: null,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.634Z",
        updated_at: "2014-02-11T22:54:55.634Z",
        category_id: 1580,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1580,
        title: "florida",
        created_at: "2014-02-11T22:54:55.301Z",
        updated_at: "2014-02-11T22:54:55.301Z",
        clues_count: 10
        }
        },
        {
        id: 14967,
        answer: "staircase",
        question: "The turnpike type of this building feature is circular or winding",
        value: 400,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.648Z",
        updated_at: "2014-02-11T22:54:55.648Z",
        category_id: 993,
        game_id: null,
        invalid_count: null,
        category: {
        id: 993,
        title: "architecture",
        created_at: "2014-02-11T22:51:27.545Z",
        updated_at: "2014-02-11T22:51:27.545Z",
        clues_count: 50
        }
        },
        {
        id: 14968,
        answer: "dirt",
        question: "It can precede bike or cheap & Ajax is stronger than it",
        value: 400,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.661Z",
        updated_at: "2014-02-11T22:54:55.661Z",
        category_id: 51,
        game_id: null,
        invalid_count: null,
        category: {
        id: 51,
        title: "4-letter words",
        created_at: "2014-02-11T22:47:25.679Z",
        updated_at: "2014-02-11T22:47:25.679Z",
        clues_count: 165
        }
        },
        {
        id: 14969,
        answer: "Alexander Nevsky",
        question: "This ruler took his last name, meaning \"of the Neva\", from the Neva River, where he defeated the Swedes in 1240",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.675Z",
        updated_at: "2014-02-11T22:54:55.675Z",
        category_id: 1578,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1578,
        title: "russian rulers",
        created_at: "2014-02-11T22:54:55.277Z",
        updated_at: "2014-02-11T22:54:55.277Z",
        clues_count: 5
        }
        },
        {
        id: 14970,
        answer: "old man\'s hat",
        question: "\"Christmas is coming, the geese are getting fat, please to put a penny in\" here",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.688Z",
        updated_at: "2014-02-11T22:54:55.688Z",
        category_id: 37,
        game_id: null,
        invalid_count: null,
        category: {
        id: 37,
        title: "nursery rhymes",
        created_at: "2014-02-11T22:47:23.340Z",
        updated_at: "2014-02-11T22:47:23.340Z",
        clues_count: 110
        }
        },
        {
        id: 14971,
        answer: "bob",
        question: "A special type of this short, boyish cut of the 1920s was named for Irene Castle",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.702Z",
        updated_at: "2014-02-11T22:54:55.702Z",
        category_id: 1579,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1579,
        title: "hairstyles",
        created_at: "2014-02-11T22:54:55.291Z",
        updated_at: "2014-02-11T22:54:55.291Z",
        clues_count: 10
        }
        },
        {
        id: 14972,
        answer: "Daytona Beach",
        question: "Cars were once raced on this beach that's 23 miles long & 500 feet wide",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.716Z",
        updated_at: "2014-02-11T22:54:55.716Z",
        category_id: 1580,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1580,
        title: "florida",
        created_at: "2014-02-11T22:54:55.301Z",
        updated_at: "2014-02-11T22:54:55.301Z",
        clues_count: 10
        }
        },
        {
        id: 14973,
        answer: "Paris",
        question: "Charles Garnier won an 1860s competition to design this European city's famed opera house",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.730Z",
        updated_at: "2014-02-11T22:54:55.730Z",
        category_id: 993,
        game_id: null,
        invalid_count: null,
        category: {
        id: 993,
        title: "architecture",
        created_at: "2014-02-11T22:51:27.545Z",
        updated_at: "2014-02-11T22:51:27.545Z",
        clues_count: 50
        }
        },
        {
        id: 14974,
        answer: "waif",
        question: "From a middle English word for lost or unclaimed, it's a homeless child",
        value: 500,
        airdate: "1995-09-06T12:00:00.000Z",
        created_at: "2014-02-11T22:54:55.744Z",
        updated_at: "2014-02-11T22:54:55.744Z",
        category_id: 51,
        game_id: null,
        invalid_count: null,
        category: {
        id: 51,
        title: "4-letter words",
        created_at: "2014-02-11T22:47:25.679Z",
        updated_at: "2014-02-11T22:47:25.679Z",
        clues_count: 165
        }
        },
        {
        id: 14975,
        answer: "Westminster Abbey",
        question: "The last monarch crowned in this church was Elizabeth II",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.195Z",
        updated_at: "2014-02-11T22:54:56.195Z",
        category_id: 1154,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1154,
        title: "london landmarks",
        created_at: "2014-02-11T22:52:19.112Z",
        updated_at: "2014-02-11T22:52:19.112Z",
        clues_count: 20
        }
        },
        {
        id: 14976,
        answer: "Rod Serling",
        question: "A 1960 Emmy for drama writing went to this creator of the \"Twilight Zone\"",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.209Z",
        updated_at: "2014-02-11T22:54:56.209Z",
        category_id: 644,
        game_id: null,
        invalid_count: null,
        category: {
        id: 644,
        title: "the emmys",
        created_at: "2014-02-11T22:49:37.340Z",
        updated_at: "2014-02-11T22:49:37.340Z",
        clues_count: 30
        }
        },
        {
        id: 14977,
        answer: "butter",
        question: "The early Romans used it as an ointment; we use it on toast & baked potatoes",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.224Z",
        updated_at: "2014-02-11T22:54:56.224Z",
        category_id: 832,
        game_id: null,
        invalid_count: null,
        category: {
        id: 832,
        title: "food facts",
        created_at: "2014-02-11T22:50:30.836Z",
        updated_at: "2014-02-11T22:50:30.836Z",
        clues_count: 60
        }
        },
        {
        id: 14978,
        answer: "Mathew Brady",
        question: "He organized the corps of men who photographed the Civil War; poor eyesight limited his work",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.240Z",
        updated_at: "2014-02-11T22:54:56.240Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
        id: 780,
        title: "american history",
        created_at: "2014-02-11T22:50:14.591Z",
        updated_at: "2014-02-11T22:50:14.591Z",
        clues_count: 265
        }
        },
        {
        id: 14979,
        answer: "lead",
        question: "When joining copper water pipes, use solder free of this heavy metal once commonly used in plumbing",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.255Z",
        updated_at: "2014-02-11T22:54:56.255Z",
        category_id: 1581,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1581,
        title: "plumbing",
        created_at: "2014-02-11T22:54:56.174Z",
        updated_at: "2014-02-11T22:54:56.174Z",
        clues_count: 20
        }
        },
        {
        id: 14980,
        answer: "Moscow",
        question: "Russian city where Nadia Comaneci competed in her second Olympics",
        value: 100,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.270Z",
        updated_at: "2014-02-11T22:54:56.270Z",
        category_id: 311,
        game_id: null,
        invalid_count: null,
        category: {
        id: 311,
        title: "the olympics",
        created_at: "2014-02-11T22:48:13.873Z",
        updated_at: "2014-02-11T22:48:13.873Z",
        clues_count: 50
        }
        },
        {
        id: 14981,
        answer: "the Great Fire of London",
        question: "St. Helen's Bishopsgate is one of the few churches that survived this 1666 event",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.283Z",
        updated_at: "2014-02-11T22:54:56.283Z",
        category_id: 1154,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1154,
        title: "london landmarks",
        created_at: "2014-02-11T22:52:19.112Z",
        updated_at: "2014-02-11T22:52:19.112Z",
        clues_count: 20
        }
        },
        {
        id: 14982,
        answer: "<i>The Simpsons</i>",
        question: "In 1990 & 1991 this Fox show was named the outstanding animated prime-time series",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.297Z",
        updated_at: "2014-02-11T22:54:56.297Z",
        category_id: 644,
        game_id: null,
        invalid_count: null,
        category: {
        id: 644,
        title: "the emmys",
        created_at: "2014-02-11T22:49:37.340Z",
        updated_at: "2014-02-11T22:49:37.340Z",
        clues_count: 30
        }
        },
        {
        id: 14983,
        answer: "corn syrup",
        question: "The brittle of peanut brittle includes sugar, water, baking soda & this syrup",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.313Z",
        updated_at: "2014-02-11T22:54:56.313Z",
        category_id: 832,
        game_id: null,
        invalid_count: null,
        category: {
        id: 832,
        title: "food facts",
        created_at: "2014-02-11T22:50:30.836Z",
        updated_at: "2014-02-11T22:50:30.836Z",
        clues_count: 60
        }
        },
        {
        id: 14984,
        answer: "Communist Party",
        question: "Elizabeth Gurley Flynn, a founder of the ACLU, was expelled in 1940 for being a member of this party",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.326Z",
        updated_at: "2014-02-11T22:54:56.326Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
        id: 780,
        title: "american history",
        created_at: "2014-02-11T22:50:14.591Z",
        updated_at: "2014-02-11T22:50:14.591Z",
        clues_count: 265
        }
        },
        {
        id: 14985,
        answer: "200",
        question: "Of 20, 200 or 2000 gallons, the amount of water used by the average American household each day",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.339Z",
        updated_at: "2014-02-11T22:54:56.339Z",
        category_id: 1581,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1581,
        title: "plumbing",
        created_at: "2014-02-11T22:54:56.174Z",
        updated_at: "2014-02-11T22:54:56.174Z",
        clues_count: 20
        }
        },
        {
        id: 14986,
        answer: "Charles Barkley",
        question: "Nicknamed \"Sir Charles\", he was part of the gold-medal-winning 1992 U.S. \"Dream Team\"",
        value: 200,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.352Z",
        updated_at: "2014-02-11T22:54:56.352Z",
        category_id: 311,
        game_id: null,
        invalid_count: null,
        category: {
        id: 311,
        title: "the olympics",
        created_at: "2014-02-11T22:48:13.873Z",
        updated_at: "2014-02-11T22:48:13.873Z",
        clues_count: 50
        }
        },
        {
        id: 14987,
        answer: "parks",
        question: "Some of these are Battersea, Regent's & Hyde",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.395Z",
        updated_at: "2014-02-11T22:54:56.395Z",
        category_id: 1154,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1154,
        title: "london landmarks",
        created_at: "2014-02-11T22:52:19.112Z",
        updated_at: "2014-02-11T22:52:19.112Z",
        clues_count: 20
        }
        },
        {
        id: 14988,
        answer: "Chevy Chase",
        question: "When accepting his Emmy for \"Saturday Night Live\" in 1976, he took one of his trademark pratfalls",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.409Z",
        updated_at: "2014-02-11T22:54:56.409Z",
        category_id: 644,
        game_id: null,
        invalid_count: null,
        category: {
        id: 644,
        title: "the emmys",
        created_at: "2014-02-11T22:49:37.340Z",
        updated_at: "2014-02-11T22:49:37.340Z",
        clues_count: 30
        }
        },
        {
        id: 14989,
        answer: "coq au vin",
        question: "Classically, this French dish is an old rooster cooked in wine; you can use a game hen",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.423Z",
        updated_at: "2014-02-11T22:54:56.423Z",
        category_id: 832,
        game_id: null,
        invalid_count: null,
        category: {
        id: 832,
        title: "food facts",
        created_at: "2014-02-11T22:50:30.836Z",
        updated_at: "2014-02-11T22:50:30.836Z",
        clues_count: 60
        }
        },
        {
        id: 14990,
        answer: "cotton",
        question: "Over half the value of U.S. exports from 1815-1860 came from this crop",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.436Z",
        updated_at: "2014-02-11T22:54:56.436Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
        id: 780,
        title: "american history",
        created_at: "2014-02-11T22:50:14.591Z",
        updated_at: "2014-02-11T22:50:14.591Z",
        clues_count: 265
        }
        },
        {
        id: 14991,
        answer: "hot water heater",
        question: "This common home device has a relief valve to prevent an explosion in case of thermostat failure",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.450Z",
        updated_at: "2014-02-11T22:54:56.450Z",
        category_id: 1581,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1581,
        title: "plumbing",
        created_at: "2014-02-11T22:54:56.174Z",
        updated_at: "2014-02-11T22:54:56.174Z",
        clues_count: 20
        }
        },
        {
        id: 14992,
        answer: "archery",
        question: "In this sport's individual event all 64 competitors shoot at targets 70 meters away at the same time",
        value: 300,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.464Z",
        updated_at: "2014-02-11T22:54:56.464Z",
        category_id: 311,
        game_id: null,
        invalid_count: null,
        category: {
        id: 311,
        title: "the olympics",
        created_at: "2014-02-11T22:48:13.873Z",
        updated_at: "2014-02-11T22:48:13.873Z",
        clues_count: 50
        }
        },
        {
        id: 14993,
        answer: "Tate Gallery",
        question: "Opened in 1897, this gallery of modern British art was named for a sugar merchant",
        value: 400,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.477Z",
        updated_at: "2014-02-11T22:54:56.477Z",
        category_id: 1154,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1154,
        title: "london landmarks",
        created_at: "2014-02-11T22:52:19.112Z",
        updated_at: "2014-02-11T22:52:19.112Z",
        clues_count: 20
        }
        },
        {
        id: 14994,
        answer: "<i>Roseanne</i>",
        question: "This sitcom's Laurie Metcalf received Emmys in 1992, '93 & '94 for her role as Jackie",
        value: 400,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.490Z",
        updated_at: "2014-02-11T22:54:56.490Z",
        category_id: 644,
        game_id: null,
        invalid_count: null,
        category: {
        id: 644,
        title: "the emmys",
        created_at: "2014-02-11T22:49:37.340Z",
        updated_at: "2014-02-11T22:49:37.340Z",
        clues_count: 30
        }
        },
        {
        id: 14995,
        answer: "mushroom",
        question: "Cultivated in hothouses, the button is a common one of these",
        value: 400,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.504Z",
        updated_at: "2014-02-11T22:54:56.504Z",
        category_id: 832,
        game_id: null,
        invalid_count: null,
        category: {
        id: 832,
        title: "food facts",
        created_at: "2014-02-11T22:50:30.836Z",
        updated_at: "2014-02-11T22:50:30.836Z",
        clues_count: 60
        }
        },
        {
        id: 14996,
        answer: "Eisenhower",
        question: "The Bay of Pigs invasion plans were first drawn up under this president",
        value: null,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.517Z",
        updated_at: "2014-02-11T22:54:56.517Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
        id: 780,
        title: "american history",
        created_at: "2014-02-11T22:50:14.591Z",
        updated_at: "2014-02-11T22:50:14.591Z",
        clues_count: 265
        }
        },
        {
        id: 14997,
        answer: "water softener",
        question: "In the ion-exchange type of this device, hard water is filtered through a material called zeolite",
        value: 400,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.530Z",
        updated_at: "2014-02-11T22:54:56.530Z",
        category_id: 1581,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1581,
        title: "plumbing",
        created_at: "2014-02-11T22:54:56.174Z",
        updated_at: "2014-02-11T22:54:56.174Z",
        clues_count: 20
        }
        },
        {
        id: 14998,
        answer: "Jackie Joyner-Kersee",
        question: "At the 1984 L.A. games, she won a silver in the heptathlon & her brother Al, a gold in the triple jump",
        value: 400,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.544Z",
        updated_at: "2014-02-11T22:54:56.544Z",
        category_id: 311,
        game_id: null,
        invalid_count: null,
        category: {
        id: 311,
        title: "the olympics",
        created_at: "2014-02-11T22:48:13.873Z",
        updated_at: "2014-02-11T22:48:13.873Z",
        clues_count: 50
        }
        },
        {
        id: 14999,
        answer: "Sotheby\'s",
        question: "The address of this world-famous auction house is 34-35 New Bond Street",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.557Z",
        updated_at: "2014-02-11T22:54:56.557Z",
        category_id: 1154,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1154,
        title: "london landmarks",
        created_at: "2014-02-11T22:52:19.112Z",
        updated_at: "2014-02-11T22:52:19.112Z",
        clues_count: 20
        }
        },
        {
        id: 15000,
        answer: "Ingrid Bergman (she played Golda Meir)",
        question: "In 1982 this 3-time Oscar winner won an Emmy for her performance in \"A Woman Called Golda\"",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.571Z",
        updated_at: "2014-02-11T22:54:56.571Z",
        category_id: 644,
        game_id: null,
        invalid_count: null,
        category: {
        id: 644,
        title: "the emmys",
        created_at: "2014-02-11T22:49:37.340Z",
        updated_at: "2014-02-11T22:49:37.340Z",
        clues_count: 30
        }
        },
        {
        id: 15001,
        answer: "pomander",
        question: "Added to punch or hung in the closet, it's a fruit studded with cloves & then dried",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.584Z",
        updated_at: "2014-02-11T22:54:56.584Z",
        category_id: 832,
        game_id: null,
        invalid_count: null,
        category: {
        id: 832,
        title: "food facts",
        created_at: "2014-02-11T22:50:30.836Z",
        updated_at: "2014-02-11T22:50:30.836Z",
        clues_count: 60
        }
        },
        {
        id: 15002,
        answer: "Chief Justice of the U.S. Supreme Court",
        question: "In 1930 Charles Evans Hughes left the World Court to take this position in the U.S.",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.597Z",
        updated_at: "2014-02-11T22:54:56.597Z",
        category_id: 780,
        game_id: null,
        invalid_count: null,
        category: {
        id: 780,
        title: "american history",
        created_at: "2014-02-11T22:50:14.591Z",
        updated_at: "2014-02-11T22:50:14.591Z",
        clues_count: 265
        }
        },
        {
        id: 15003,
        answer: "trap",
        question: "Found beneath a sink, this U- or P-shaped pipe maintains a water seal to keep sewer gas out of your house",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.611Z",
        updated_at: "2014-02-11T22:54:56.611Z",
        category_id: 1581,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1581,
        title: "plumbing",
        created_at: "2014-02-11T22:54:56.174Z",
        updated_at: "2014-02-11T22:54:56.174Z",
        clues_count: 20
        }
        },
        {
        id: 15004,
        answer: "discus, javelin & shot put",
        question: "The 3 throwing events in the decathlon",
        value: 500,
        airdate: "1995-09-04T12:00:00.000Z",
        created_at: "2014-02-11T22:54:56.624Z",
        updated_at: "2014-02-11T22:54:56.624Z",
        category_id: 311,
        game_id: null,
        invalid_count: null,
        category: {
        id: 311,
        title: "the olympics",
        created_at: "2014-02-11T22:48:13.873Z",
        updated_at: "2014-02-11T22:48:13.873Z",
        clues_count: 50
        }
        },
        {
        id: 15005,
        answer: "amber",
        question: "This fossilized resin from prehistoric pines can preserve an insect forever",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.078Z",
        updated_at: "2014-02-11T22:54:57.078Z",
        category_id: 25,
        game_id: null,
        invalid_count: null,
        category: {
        id: 25,
        title: "science",
        created_at: "2014-02-11T22:47:21.788Z",
        updated_at: "2014-02-11T22:47:21.788Z",
        clues_count: 250
        }
        },
        {
        id: 15006,
        answer: "the Ruby Slippers",
        question: "In \"The Wizard of Oz\", Billie Burke told Judy Garland, \"Never let those\" items \"off your feet for a moment\"",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.091Z",
        updated_at: "2014-02-11T22:54:57.091Z",
        category_id: 309,
        game_id: null,
        invalid_count: null,
        category: {
        id: 309,
        title: "the movies",
        created_at: "2014-02-11T22:48:13.851Z",
        updated_at: "2014-02-11T22:48:13.851Z",
        clues_count: 130
        }
        },
        {
        id: 15007,
        answer: "Virginia",
        question: "Shoppers, take note: the Potomac Mills discount mall is this state's No. 1 tourist destination",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.105Z",
        updated_at: "2014-02-11T22:54:57.105Z",
        category_id: 313,
        game_id: null,
        invalid_count: null,
        category: {
        id: 313,
        title: "americana",
        created_at: "2014-02-11T22:48:14.730Z",
        updated_at: "2014-02-11T22:48:14.730Z",
        clues_count: 195
        }
        },
        {
        id: 15008,
        answer: "a hunger strike",
        question: "On May 5, 1981, Irish nationalist Bobby Sands died after a 66-day-long one of these",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.118Z",
        updated_at: "2014-02-11T22:54:57.118Z",
        category_id: 949,
        game_id: null,
        invalid_count: null,
        category: {
        id: 949,
        title: "the 20th century",
        created_at: "2014-02-11T22:51:06.332Z",
        updated_at: "2014-02-11T22:51:06.332Z",
        clues_count: 55
        }
        },
        {
        id: 15009,
        answer: "a birdfeeder",
        question: "One of these devices stocked with thistle seeds may attract goldfinches",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.131Z",
        updated_at: "2014-02-11T22:54:57.131Z",
        category_id: 1582,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1582,
        title: "in the backyard",
        created_at: "2014-02-11T22:54:57.049Z",
        updated_at: "2014-02-11T22:54:57.049Z",
        clues_count: 5
        }
        },
        {
        id: 15010,
        answer: "the bough",
        question: "When it breaks, the cradle will fall",
        value: 100,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.145Z",
        updated_at: "2014-02-11T22:54:57.145Z",
        category_id: 1583,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1583,
        title: "ends in \"ough\"",
        created_at: "2014-02-11T22:54:57.060Z",
        updated_at: "2014-02-11T22:54:57.060Z",
        clues_count: 5
        }
        },
        {
        id: 15011,
        answer: "Greenland",
        question: "Most icebergs in the north Atlantic come from about 20 glaciers on this island's west coast",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.158Z",
        updated_at: "2014-02-11T22:54:57.158Z",
        category_id: 25,
        game_id: null,
        invalid_count: null,
        category: {
        id: 25,
        title: "science",
        created_at: "2014-02-11T22:47:21.788Z",
        updated_at: "2014-02-11T22:47:21.788Z",
        clues_count: 250
        }
        },
        {
        id: 15012,
        answer: "<i>Space Jam</i>",
        question: "This 1996 animated & live action sports film featured the songs \"Fly Like an Eagle\" and \"I Believe I Can Fly\"",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.171Z",
        updated_at: "2014-02-11T22:54:57.171Z",
        category_id: 309,
        game_id: null,
        invalid_count: null,
        category: {
        id: 309,
        title: "the movies",
        created_at: "2014-02-11T22:48:13.851Z",
        updated_at: "2014-02-11T22:48:13.851Z",
        clues_count: 130
        }
        },
        {
        id: 38745,
        answer: "Llama",
        question: "Camel cousin(5)",
        value: 200,
        airdate: "1999-12-28T12:00:00.000Z",
        created_at: "2014-02-11T23:09:02.879Z",
        updated_at: "2014-02-11T23:09:02.879Z",
        category_id: 1645,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1645,
        title: "crossword clues \"l\"",
        created_at: "2014-02-11T22:55:17.549Z",
        updated_at: "2014-02-11T22:55:17.549Z",
        clues_count: 45
        }
        },
        {
        id: 15013,
        answer: "North Dakota",
        question: "Midwesterners know it's the \"Sioux State\", as well as the \"Flickertail State\"",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.185Z",
        updated_at: "2014-02-11T22:54:57.185Z",
        category_id: 313,
        game_id: null,
        invalid_count: null,
        category: {
        id: 313,
        title: "americana",
        created_at: "2014-02-11T22:48:14.730Z",
        updated_at: "2014-02-11T22:48:14.730Z",
        clues_count: 195
        }
        },
        {
        id: 15014,
        answer: "Josef Stalin",
        question: "An order was given in October, 1961 to remove this man's body from Lenin's tomb",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.199Z",
        updated_at: "2014-02-11T22:54:57.199Z",
        category_id: 949,
        game_id: null,
        invalid_count: null,
        category: {
        id: 949,
        title: "the 20th century",
        created_at: "2014-02-11T22:51:06.332Z",
        updated_at: "2014-02-11T22:51:06.332Z",
        clues_count: 55
        }
        },
        {
        id: 15015,
        answer: "a swimming pool",
        question: "It's a good idea to regularly test the pH & chlorine levels of the water in one of these",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.213Z",
        updated_at: "2014-02-11T22:54:57.213Z",
        category_id: 1582,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1582,
        title: "in the backyard",
        created_at: "2014-02-11T22:54:57.049Z",
        updated_at: "2014-02-11T22:54:57.049Z",
        clues_count: 5
        }
        },
        {
        id: 15016,
        answer: "a tough",
        question: "A goon, a bruiser, a heavy, or a thug",
        value: 200,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.227Z",
        updated_at: "2014-02-11T22:54:57.227Z",
        category_id: 1583,
        game_id: null,
        invalid_count: null,
        category: {
        id: 1583,
        title: "ends in \"ough\"",
        created_at: "2014-02-11T22:54:57.060Z",
        updated_at: "2014-02-11T22:54:57.060Z",
        clues_count: 5
        }
        },
        {
        id: 15017,
        answer: "the moon",
        question: "Around 1840 chemist John William Draper took the first photograph of this heavenly body",
        value: 300,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.268Z",
        updated_at: "2014-02-11T22:54:57.268Z",
        category_id: 25,
        game_id: null,
        invalid_count: null,
        category: {
        id: 25,
        title: "science",
        created_at: "2014-02-11T22:47:21.788Z",
        updated_at: "2014-02-11T22:47:21.788Z",
        clues_count: 250
        }
        },
        {
        id: 15018,
        answer: "Oliver Stone",
        question: "He not only directed \"The Doors\" & \"JFK\", he co-wrote the screenplays",
        value: 300,
        airdate: "1997-07-18T12:00:00.000Z",
        created_at: "2014-02-11T22:54:57.283Z",
        updated_at: "2014-02-11T22:54:57.283Z",
        category_id: 309,
        game_id: null,
        invalid_count: null,
        category: {
        id: 309,
        title: "the movies",
        created_at: "2014-02-11T22:48:13.851Z",
        updated_at: "2014-02-11T22:48:13.851Z",
        clues_count: 130
        }
        }
        ];
    };
}); 
    
     // {"id":18821,
            // "answer":"New Orleans",
            // "question":"This city became the capital of the Louisiana territory in 1722",
            // "value":200,
            // "airdate":"1997-01-14T12:00:00.000Z",
            // "created_at":"2014-02-11T22:57:05.860Z",
            // "updated_at":"2014-02-11T22:57:05.860Z",
            // "category_id":351,
            // "game_id":null,
            // "invalid_count":null,
            // "category":{
            //     "id":351,
            //     "title":"colonial america",
            //     "created_at":"2014-02-11T22:48:22.406Z",
            //     "updated_at":"2014-02-11T22:48:22.406Z",
            //     "clues_count":35}
            // }