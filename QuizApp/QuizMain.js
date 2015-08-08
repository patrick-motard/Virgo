//shim in jquery as a dependency for bootstrapjs

requirejs.config({
    baseUrl: '../bower_components/',
    paths: {
        ko: "knockout/dist/knockout",
        jquery: "jquery/dist/jquery",
        bootstrapjs: "bootstrap/dist/js/bootstrap.min",
        text: "requirejs-text/text",
        CategoryModel: "../QuizApp/CategoryModel",
        QuestionModel: "../QuizApp/QuestionModel",
        QuizViewModel: "../QuizApp/QuizViewModel",
        QuizRepository: "../DataAccess/QuizRepository"
    }
});

requirejs(['ko', 'jquery', 'text', 'CategoryModel', 'QuestionModel', 'QuizViewModel', 'QuizRepository', 'bootstrapjs'], 
    function(ko, jquery, text, CategoryModel, QuestionModel, QuizViewModel, QuizRepository, bootstrapjs){
        ko.applyBindings(new QuizViewModel(), document.getElementById('main')); 
});