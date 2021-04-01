const events = require("events");

let result = 0;

let eventEmitter = new events.EventEmitter();

eventEmitter.on("foo", function () {
    console.log("Hello, world!") 
});

eventEmitter.on("bar", function (a, b) { 
    
    result += (a + b); 
    
    console.log(result); 

}); 

eventEmitter.on("bar", function (a, b) {
    
    result *= (2 + b - a); 
    
    console. log( result); 

}); 

eventEmitter.on("error", function () {
    
    console.log("Error Detected!!") 

}); 

eventEmitter.emit("foo"); 

eventEmitter.emit("bar", 1, 3); 

eventEmitter.emit("who"); 
