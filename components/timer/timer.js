define(['ko'], function(ko){
   return function TimerViewModel(params){
       
        
        var self = this;
        // self.time = ko.observable(1);
        //  self.compareer = ko.computed(function(){
        //     return self.time() < 5;
        // },self)
        // self.timer = function(){
        //     var cat = {}
        //     while(self.compareer()){
        //         cat = setInterval(function(){
        //             self.time(self.time() + 1);
        //         },1000);        
        //     }
        //     clearInterval(cat)
        // }()
        
        // self.counter = ko.observable(30);
        
        //want >
        self.counter = params.timey;
        
        // self.counter = ko.observable(time);
        self.hate = ko.observable(function(){
            if(i != undefined){
                clearInterval(i);
            }
            // var counter = 0;
            self.counter(10);
            var i = setInterval(function(){
                // do your thing
            
                self.counter(self.counter() - 1);
                if(self.counter() === 0) {
                    clearInterval(i);
                }
            }, 1000);//run the timer on button click
            
        })();
        
        (function init(){
            self.hate();
        }()); //run the timer once on page load
        
        
        // self.timey = function (){
        
                
        // }()
            
    };
});