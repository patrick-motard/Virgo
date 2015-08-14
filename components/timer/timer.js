define(['ko'], function(ko){
   return function TimerViewModel(params){
        var self = this;
        self.Counter = params.TimeRemaining;
        self.Chances = params.Chances;
        
        var k;
        self.start = function(){
        self.Counter(3);
            k = setInterval(function(){
                self.Counter(self.Counter() - 1);
                if(self.Counter() === 0) {
                    self.stop();
                    self.Chances(self.Chances() - 1);
                    if(self.Chances() !== 0 ){
                       self.start(); 
                    }else {$('#loss').modal('show');}
                }
            }, 1000);
        };
        self.start();
        self.stop = function(){
            clearInterval(k);
        };
    };
});