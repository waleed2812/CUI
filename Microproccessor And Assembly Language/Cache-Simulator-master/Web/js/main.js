var detailedOut = "Detail";
var dashes = "---------------------------------------------------------------------------------------------------------------";
function Block(){
    this.validBit = false;
    this.tag = 'ffff';
}
Block.prototype.setValidBit = function()
{
    this.validBit = true;
}
Block.prototype.isValid = function()
{
    return this.validBit;
}
Block.prototype.setTag = function(tag)
{
    this.tag = tag;
}
Block.prototype.getTag = function()
{
    return this.tag;
}
function calculate(){

    var ramSize = 0;
    var cacheSize = 0;
    var blockSize = 0;
    
    try{
        ramSize = Number( document.getElementById("ramSizeInput").value );
        if( document.getElementById("ramKB").checked){
            ramSize *= Math.pow(2,10);
        }
        else if( document.getElementById("ramMB").checked){
            ramSize *= Math.pow(2,20);
        }
        else{
            ramSize = ramSize;
        }
        // alert('Ram Size = '+ramSize);
    } catch (Exception) {
        alert('Enter Proper Ram Size');
        return;
    }
    try{
        cacheSize = Number( document.getElementById("cacheSizeInput").value );
        if( document.getElementById("cacheKB").checked){
            cacheSize *= Math.pow(2,10);
        }
        else if( document.getElementById("cacheMB").checked){
            cacheSize *= Math.pow(2,20);
        }
        else{
            cacheSize = cacheSize;
        }
        // alert('Cache Size = '+cacheSize);
    } catch (Exception) {
        alert('Enter Proper Cache Size');
        return;
    }
    try{
        blockSize = Number( document.getElementById("blockSizeInput").value );
        if( document.getElementById("blockKB").checked){
            blockSize *= Math.pow(2,10);
        }
        else if( document.getElementById("blockMB").checked){
            blockSize *= Math.pow(2,20);
        }
        else{
            blockSize =blockSize ;
        }
        // alert('Block Size = ' + blockSize);

    } catch (Exception) {
        alert('Enter Proper Block Size');
        return;
    }
    if (cacheSize > ramSize || blockSize > cacheSize){
        alert("Enter Sizes in decreasing order Ram Size > Cache Size > Block Size")
        return;
    }

    var noOfBlocks = Math.round(cacheSize/blockSize);
    var addressLength = Math.ceil(logCustomBase(2,ramSize));
    var blockBitLength = Math.ceil(logCustomBase( 2,noOfBlocks) );
    var offsetBitLength = Math.ceil(logCustomBase(2,blockSize));
    var tagBitLength = addressLength - (blockBitLength + offsetBitLength);
        
    document.getElementById("adressSize").firstChild.nodeValue=addressLength;
    document.getElementById("blockSize").firstChild.nodeValue=blockBitLength;
    document.getElementById("offsetSize").firstChild.nodeValue=offsetBitLength;
    document.getElementById("tagSize").firstChild.nodeValue=tagBitLength;

    var cache = new Block();
    for(var i = 0 ; i < noOfBlocks ; i++ ){
        cache[i] = new Block();
    }
    var cacheHit = 0;
    var cacheMiss = 0;
    
    if ( document.getElementById("rdbtnLoop").checked ){
        var startingAddress = Number( document.getElementById("startingIn").value) ;
        var endingAddress = Number( document.getElementById("endingIn").value) ;
        var loopAddress = Number( document.getElementById("loopIn").value) ;
        
        for(var i = 0 ; i < loopAddress ; i++){
            for (var j = startingAddress ; j <= endingAddress ; j++){
                if(hitOrMiss(j,addressLength,tagBitLength,blockBitLength,cache)){
                    cacheHit++;
                } else {
                    cacheMiss++;
                }
            }
        }
        

    } else {
        var random = document.getElementById("arrayIn").value ;
        var temp = '';
        for (var i = 0 ; i < random.length ; i++){
            // alert(temp);
            if (random.charAt(i) >= '0' && random.charAt(i) <= '9'){
                temp += random.charAt(i);
            }
            else if(random.charAt(i) == ','){
                if(hitOrMiss(Number(temp),addressLength,tagBitLength,blockBitLength,cache)){
                    cacheHit++;
                } else {
                    cacheMiss++;
                }
                temp='';
            }
            else{
                continue;
            }
        }
        if(hitOrMiss(Number(temp),addressLength,tagBitLength,blockBitLength,cache)){
            cacheHit++;
        } else {
            cacheMiss++;
        }
        temp='';

    }
    document.getElementById("hits").firstChild.nodeValue=cacheHit;
    document.getElementById("miss").firstChild.nodeValue=cacheMiss;
    document.getElementById("hitAndMiss").firstChild.nodeValue=cacheMiss+cacheHit;
    document.getElementById("hitRate").firstChild.nodeValue=Math.round( (((cacheHit/(cacheMiss+cacheHit))*100) *100))/100;    
}
function hitOrMiss(address,addressLength,tagBitLength,blockBitLength,cache){

    var add = toBinary(address,addressLength);
	var tagString="";
    var block ="";
    for (var i = tagBitLength; i<blockBitLength+tagBitLength ;i++ ){block += add.charAt(i)};
    
    for (var i = 0 ; i < tagBitLength ;i++){tagString += add.charAt(i)};
    
    if(cache[toDecimal(block)].isValid() && 
            tagString == cache[toDecimal(block)].getTag() ) { 		
        return true;
    } else {
        cache[toDecimal(block)].setValidBit();
        cache[toDecimal(block)].setTag(tagString);
        return false;
    }
}

function logCustomBase(base, x) {
	var a = Math.log(x);
    var b = Math.log(base);
  
    return a / b;
}

function toBinary(number,addressLength){
    var ans='';	
		while (number>=1) {
			ans += number % 2 + '';
			number= Math.floor(number/2);
        }
		ans = reverseString(ans);
		while(ans.length < addressLength) {
			ans = '0'+ans;
		}
		return ans;
}

function toDecimal(binaryNumber) {
    var ans=0;
    var j=binaryNumber.length-1;
    for (var i = 0 ; i < binaryNumber.length ; i ++) {
        if(binaryNumber.charAt(i)=='1')
            ans += Math.floor(Math.pow(2, j-i));
    }
    return ans;
}

function reverseString(string) {
    var ans='';
    for (var i = string.length-1 ; i >=0  ; i --) {
        ans += string.charAt(i);
    }
    return ans;
}