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
        self.Value = ko.observable(0);


        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        self.Restart = function(){
            
        };
        
        self.StartGame = function(){
             // intialize the DAL (data access layer)
                var repo = new QuizRepository(),
                randNum;
                // get the questions from the DAL
                self.Questions(repo.GetQuestions());
                // the current question being asked is the first one recieved
                randNum = getRandomArbitrary(0, self.Questions().length);
                self.CurrentQuestion = ko.observable(self.Questions()[randNum]);

                self.Letters = ko.observable(GetAnswerLetters());
                self.Answer = ko.observableArray(self.Letters());
                self.ResetUserAnswer();
                self.Chances(6);
                self.CurrentScore(0);
                self.Value(self.CurrentQuestion().value);
        };

        // self.GameOver = ko.computed(function(){
        //     if(self.Chances() === 0){
        //         $('#loss').modal('show');
        //         if(self.HighScore() < self.CurrentScore()){
        //             self.HighScore(self.CurrentScore());
        //         }
        // }}, self);
        self.GameOver = ko.computed(function(){
            if(self.Chances() === 0)
            { return true; }
            else 
            { return false }
        }, self);
        
        
        
        /// note: this css switch needs work /// 
        /// or just force space tile to line up with other tiles (prob easier) ///
        // self.AnswerTileCssSwitch = function(tileLetter){
        //     switch(tileLetter){
        //         case '_':
        //             return 'answerTile';
        //         case ' ':
        //             return 'spaceTile';
        //         default:
        //             return 'answerTile';
        //     }
        // };
        
        
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        self.chars = ko.observableArray(alphabet);
        self.wrongGuesses = ko.observableArray([]);
        
        self.TimeRemaining = ko.observable(500);
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
                // decrement chances
                self.GuessedLetters.push(letter);
                self.Chances(self.Chances() - 1); 
            }
            // give the user more time to guess
            self.TimeRemaining(30); //we have it set to 3 other places. Should use a variable in all places.
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
                    self.UserAnswer().push(ko.observable(' '));
                // but if it's a regular character
                } else { 
                    // fill in an underscore instead
                    self.UserAnswer().push(ko.observable("_"));
                }
            }
        };

        self.AnswerComplete = ko.computed(function(){
            var i, observ;
            if(self.UserAnswer === undefined || self.UserAnswer().length === 0){return false}
            for(i = 0; i < self.UserAnswer().length; i++){
                observ = self.UserAnswer()[i];
                console.log(observ);
                if(observ() === "_"){return false;}
            }
            return true;
        }, self);
        

        self.NextQuestion = function(){
            
            if(self.CurrentIndex() < self.Questions().length - 1){
                
                self.CurrentIndex(self.CurrentIndex() + 1);
                
                self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
                
                self.CurrentAnswer(self.CurrentQuestion().answer);
                
                self.Value(self.CurrentQuestion().value);
            }
        };

        self.NextGame = ko.computed(function(){
            if(self.AnswerComplete()){
                self.CurrentScore(self.CurrentScore() + self.Value());
                self.NextQuestion();
            }
        });


////START OFFICIAL MODAL PLAYGROUND DO NOT TOUCH/////
        // ko.renderTemplate(
        //     "mytemplate",
        //     viewModel,
        //     {
        //         afterRender: function(renderedElement) {
        //             console.log("rendered!");
        //         }
        //     },
        //     target,
        //     "replaceNode"
        // );
        // var createModalElement = function(templateName, viewModel) {
        //     var temporaryDiv = addHiddenDivToBody();
        //     var deferredElement = $.Deferred();
        //     ko.renderTemplate(
        //         templateName,
        //         viewModel,
        //         // We need to know when the template has been rendered,
        //         // so we can get the resulting DOM element.
        //         // The resolve function receives the element.
        //         {
        //             afterRender: function (nodes) {
        //                 // Ignore any #text nodes before and after the modal element.
        //                 var elements = nodes.filter(function(node) {
        //                      return node.nodeType === 1; // Element
        //                 });
        //                 deferredElement.resolve(elements[0]);
        //             }
        //         },
        //         // The temporary div will get replaced by the rendered template output.
        //         temporaryDiv,
        //         "replaceNode"
        //     );
        //     // Return the deferred DOM element so callers can wait until it's ready for use.
        //     return deferredElement;
        // };
         
        // var addHiddenDivToBody = function() {
        //     var div = document.createElement("div");
        //     div.style.display = "none";
        //     document.body.appendChild(div);
        //     return div;
        // };
        
        // var AppViewModel = function() {
        //     this.notes = ko.observableArray();
        // };
         
        // AppViewModel.prototype.addNote = function() {
        //     showModal({
        //         viewModel: new AddNoteViewModel(),
        //         context: this // Set context so we don't need to bind the callback function
        //     }).then(this._addNoteToNotes);
        // };
         
        // AppViewModel.prototype._addNoteToNotes = function(newNote) {
        //     this.notes.push(newNote);
        // };
        
        
        
////END OFFICIAL MODAL PLAYGROUND DO NOT TOUCH/////


        // init is run on page load
        // it sets needed intial values
        (function init(){
            self.StartGame();
        }());
    };
});



//////////YE GRAVEYARD OF OLDE BUT MAYBE VALUEABLE CODE////////////////////////

        
        // self.PreviousQuestion = function(){
        //     if(self.CurrentIndex() > 0){
        //         self.CurrentIndex(self.CurrentIndex() - 1);
        //         self.CurrentQuestion(self.Questions()[self.CurrentIndex()]);
        //         self.CurrentAnswer(self.CurrentQuestion().answer);
        //     }
        // };//no longer needed as a button

