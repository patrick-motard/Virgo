define(['ko'], function(ko){
   return function(data){
       var self = this;
       self.id = data.id;
       self.title = data.title;
       self.created_at = data.created_at;
       self.updated_at = data.updated_at;
       self.clues_count = data.clues_count;
   };
});