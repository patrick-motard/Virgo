//shim in jquery as a dependency for bootstrapjs

requirejs.config({
    baseUrl: '../bower_components/',
    shim:{
        'bootstrapjs':{
            deps: ['jquery']
        }
    },
    paths: {
        ko: "knockout/dist/knockout",
        jquery: "jquery/dist/jquery",
        bootstrapjs: "bootstrap/dist/js/bootstrap.min",
        text: "requirejs-text/text",
        CategoryModel: "../QuizApp/CategoryModel",
        QuestionModel: "../QuizApp/QuestionModel",
        QuizViewModel: "../QuizApp/QuizViewModel",
        QuizRepository: "../DataAccess/QuizRepository",
        TimeComponentViewModel: "../components/timer/timer"
    }
});

// requirejs(['ko', 'jquery', 'text', 'CategoryModel', 'QuestionModel', 'QuizViewModel', 'QuizRepository', 'bootstrapjs', 'TimeComponentViewModel'], 
//     function(ko, jquery, text, CategoryModel, QuestionModel, QuizViewModel, QuizRepository, bootstrapjs, TimeComponentViewModel){
        requirejs(['ko', 'jquery', 'text', 'CategoryModel', 'QuestionModel', 'QuizViewModel', 'QuizRepository', 'bootstrapjs'], 
    function(ko, jquery, text, CategoryModel, QuestionModel, QuizViewModel, QuizRepository, bootstrapjs){
        ko.components.register('timer-component', {
            viewModel: { require: '../components/timer/timer.js' },
            template: { require: 'text!../components/timer/timer.html' }
        });
        ko.applyBindings(new QuizViewModel(), document.getElementById('main')); 
});