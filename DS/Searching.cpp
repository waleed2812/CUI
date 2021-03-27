#include <iostream>
using namespace std;
//Binary Search Iterative
int binarySearch(int A[],int key, int n){
	int L = 0,U = n-1,m =0;
	while(L<=U){
		m = (L+U)/2;
		if(A[m] == key)
			return m;
		else if(key < A[m])
			U = m-1;
		else
			L = m+1;
	}
}
//Binary Search Recursive
int binarySearchR(int A[],int key, int L,int U){
	int m = (L+U)/2;
	if (L > U)return -1;
	if (A[m] == key) return m;
	else if (key < A[m]) return binarySearchR(A,key,L,m-1);
	else return binarySearchR(A,key,m+1,U);
	return -1;
}
//Main
int main(){
	int A[10] = {1,2,3,4,5,6,7,8,9,10};
	cout << binarySearch(A,8,10) << endl;
	cout << binarySearchR(A,7,0,9) << endl;
	return 0;
}
