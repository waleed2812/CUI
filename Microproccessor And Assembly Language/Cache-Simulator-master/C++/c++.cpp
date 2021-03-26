#include <iostream>
using namespace std;
#include <string> 
int power(int x,int y){

        int ans = 1;
        for(int i = 0 ; i<y ;i++){
            ans *= x;
        }
        return ans;
}
class Block {
	private: bool validBit;
	private: int tag;
	private: string data;
	public:
    Block(){}
    Block(bool validBit,int tag,string data) {
		setTag(tag);
		setValidBit(validBit);
		setData(data);
	}
	/**
	 * @return the validBit
	 */
	public: bool isValidBit() {
		return validBit;
	}
	/**
	 * @param validBit the validBit to set
	 */
	public: void setValidBit(bool _validBit) {
		validBit = _validBit;
	}
	/**
	 * @return the tag
	 */
	public: int getTag() {
		return tag;
	}
	/**
	 * @param tag the tag to set
	 */
	public: void setTag(int _tag) {
		tag = _tag;
	}
	/**
	 * @return the data
	 */
	public: string getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public: void setData(string _data) {
		data = _data;
	}
};

void cacheController(int address);
string toBinary(int number);
string reverseString(string string1);
int toDecimal(string binaryNumber);

Block cacheBlocks[512];
int cacheHit=0,cacheMiss=0;
int main(){

    for (int i = 0 ; i < 512 ; i++)
        cacheBlocks[i]=Block(0,0,"");
    
    cacheController(900);
    
    return 0;
}

void cacheController(int address) {
    /*
        * bits index in address string
        * Address= 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
        * Tag bits= 0 1 2 3
        * Block = 4 5 6 7 8 9 10 11 12
        * Offset = 13 14 15
        */
    string add = toBinary(address);
    string tagString="";
    string block ="";
    string hitormiss="";
    for (int i = 4; i<=12 ;i++ ) block += add[i];
    for (int i = 0 ; i <= 3 ;i++) tagString += add[i];
    
    if(cacheBlocks[toDecimal(block)].isValidBit() && 
            toDecimal(tagString) == cacheBlocks[toDecimal(block)].getTag() ) { 		
        cacheHit++;
        hitormiss = "Hit";
        cacheBlocks[toDecimal(block)].setData((address-(address%8))+" - "+(address+(7-(address%8))));
    } else {
        cacheBlocks[toDecimal(block)].setValidBit(true);
        cacheBlocks[toDecimal(block)].setTag(toDecimal(tagString));
        cacheMiss++;
        hitormiss="Miss";
    }
    
}
/*
    * Converting the number into Binary Number
    */
string toBinary(int number) {
    string ans="";	
    while (number>=1) {
        ans += number % 2 + "";
        number/=2;
    }
    ans = reverseString(ans);
    while(ans.length() < 16) {
        ans = '0'+ans;
    }
    return ans;
}
/*
    * Convert Binary number to Decimal
    */
int toDecimal(string binaryNumber) {
    int ans=0,j=binaryNumber.length()-1;
    for (int i = 0 ; i < binaryNumber.length() ; i ++) {
        if(binaryNumber[i]=='1')
            ans += power(2, j-i);
    }
    return ans;
}
/*
    * Reversing the string
    */
string reverseString(string string1) {
    string ans="";
    for (int i = string1.length()-1 ; i >=0  ; i --) {
        ans += string1[i];
    }
    return ans;
}


