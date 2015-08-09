define(['ko', 'CategoryModel'], function(ko, CategoryModel){
    return function QuestionModel(data){
        var self = this;
        self.answer = data.answer;
        self.question = ko.observable(data.question);
        self.value = data.value;
        self.airdate = data.airdate;
        self.created_at = data.created_at;
        self.updated_at = data.updated_at;
        self.game_id = data.updated_at;
        self.category_id = data.category_id;
        self.invalid_count = data.invalid_count;
        self.category = CategoryModel(data.category);
    };
});                     