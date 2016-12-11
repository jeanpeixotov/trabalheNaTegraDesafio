angular.module('tegrapair').service('service', function(){
    var limit    = 100;
    var lastPair = { driver: {}
                    ,nav:    {}
                   };
    this.MinRequirements = function (developers) {
        var qtyDevs = verifyQtyDevs(developers);
        if(qtyDevs < 2){
            return false;
        }else if (onlyTrainee(developers,qtyDevs)) {
            return false;
        }
        return true;
    };
    this.Generator = function (driver,prob,developers) {
        var dev;
        while(!dev){
            var myRandom = myRand(limit)+1;
            if (myRandom <= prob[0]){
                dev = developers.senior[myRand(developers.senior.length)];
            }else if (myRandom <= prob[1]) {
                dev = developers.full[myRand(developers.full.length)];
            }else if (myRandom <= prob[2]) {
                dev = developers.junior[myRand(developers.junior.length)];
            }else if(myRandom <= prob[3]){
                dev = developers.trainee[myRand(developers.trainee.length)];
            }

            if(dev){
                dev = isEqual(dev,driver);
            }

        }
        return dev;
    };
    

});
