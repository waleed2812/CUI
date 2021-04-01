var fs = require("fs"); 

fs.readFile("./largeFile", function () {
    
    console.log("1"); 

}); 

console.log("2"); 

function readFileSyncWithCb(fileName, callback) {
    
    var f = fs.readFileSync(fileName); 
    
    console.log("3"); 
    
    callback();

}

readFileSyncWithCb("./largeFile", function () {

    console.log("4"); 

}); 

console.log("5"); 
