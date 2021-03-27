#include <iostream>
using namespace std;
//Displaying Function
void display(int arr[],int n){
	
    for (int x=0 ; x<n ; x++){
            cout << arr[x] << " ";
    }
}
//Displaying Function
void display(int arr[],int left, int right){
	
    for (int x=left ; x<=right ; x++){
            cout << arr[x] << " ";
    }
}//Node Structure
//Node
struct Node{
    int value;
    Node *next;
};
//Queue
class Queue{
private:
    Node *rear,*front;
public:
    Queue(){
        rear = __null;
        front = __null;
    }
    void enqueue(int v){
        Node *A = new Node();
        A->value = v;
        A->next = rear;   
        rear = A;
        if (A->next == __null)front= A;
    }
    bool empty(){
        return (rear==__null && front == __null);
    }
    void display(){
        Node *S = rear;
        cout << "rear -> ";
        while(S != __null){
            cout << S->value << " -> " ;
            S = S ->next;
        }
        cout << " front\n";
    }
    void dequeue(){
        Node *D = rear,*P;
        while (D->next!=__null){
            P=D;
            D=D->next;
        }
        if (rear == __null) return;
        P->next = __null;
        front = P;
        delete D;
    }
    int Rear(){
        return rear->value;
    }
    int Front(){
        return front->value;
    }
    
};
//Singely Linked Single Ended Grounded List    
class SingleSingelyGrounded{
private:
    Node *head;
    void displayR(Node *D){
    	if(D == __null)return;
    	else displayR(D->next);
    	cout << D->value << " " ;
	}
public:
    SingleSingelyGrounded(){
        head = __null;
    }
    void addAtStart(int v){
        Node *A = new Node();
        A->value = v;
        A->next = head;
        head = A;
    }
    void display(){
        Node *S = head;
        cout << "Head -> ";
        while(S!=__null){
            cout << S->value << " -> " ;
            S = S ->next;
        }
        cout << "Ground\n";
    }
    void remove(int v){
        Node *P,*D;
        P=D=head;
        while(D!=__null && D->value != v){
            P = D;
            D = D ->next;
        }
        if (D == __null){return;}
        if (D == head){
            head = head ->next;
        } else {
            P->next = D->next;
        }
        delete D;
    }
    Node* getHead(){
        return head;
    }
    int getHeadValue(){
        return head->value;
    }
    
    bool empty(){
        return (head==NULL);
    }
    
    void displayR(){
        displayR(head);
    }
    
    void addAtEnd(int v){
        Node *A = new Node();
        Node *L = head;
        A ->value = v;
        A ->next = NULL;
        if (empty()){
            head = A;
        } else {
            while (L ->next != NULL){
                L =L ->next;
            }
            L ->next = A;
        }
    }
    
    void removeAll(){
        head = NULL;
    }
    
    bool searchInt(int v){
        Node *D;
        D=head;
        while(D!=NULL && D->value != v){
            D = D ->next;
        }
        if (D == NULL){
            return false;
        } else {
            return true;
        }
    }
    
    int getLength(){
        Node *D;
        int count = 0;
        D=head;
        while(D!=NULL){
            D = D ->next;
            count++;
        }
        return count;
    }
    
    int getValue(int index){
        Node *D = head;
        bool check = false;
        for (int i = 0 ; i < getLength() ; i++){
            if (i == index){
                check = true;
                break;
            }
            D = D->next;
        }
        if(check){
            return D->value;
        } else{
            return 0;
        }
    }
    
    void swap(int num1, int num2){
        Node *x,*xp,*y,*yp;
        x=y=head;
        xp=yp=NULL;
        while(x!=NULL && x->value != num1){
            xp = x;
            x = x ->next;
        }
        while(y!=NULL && y->value != num2){
            yp = y;
            y = y ->next;
        }
        if (x==y || x == NULL || y == NULL){
            return;
        } else if (x == head){
            head = y;
            Node *temp = y->next;
            y->next = x->next;
            yp->next = x;
            x->next = temp;
        } else if (y == head){
            head = x;
            Node *temp = x->next;
            x->next = y->next;
            xp->next = y;
            y->next = temp;
        } else if(x->next == y){
            x->next = y->next;
            xp->next = y;
            y->next = x;
        } else if(x->next == y) {
            y->next = x->next;
            yp->next = x;
            x->next = y;
        } else{
            Node *temp = x -> next;
            
            x->next = y -> next;
            y->next = temp;
            
            xp->next = y;
            yp->next = x;
        }
    }
    
};
//Static Circular Queue
class CircularQueue{
private:
    int front,rear,count;
    int arr[10];
public:
    CircularQueue(){
        front = 0;
        rear = -1;
        count = 0;
    }
    void enqueue(int v){
        if(full())return;
        rear++;
        arr[rear] = v;
        rear %=10;
        count++;
    }
    bool empty(){
        return (count == 0);
    }
    bool full(){
        return (count == 10);
    }
    void display(){
        if(empty())return;
        cout << "front -> ";
        for(int i = front ; i <= rear ; i++){
            cout << arr[i] << " -> " ;
        }
        cout << " rear\n";
    }
    void dequeue(){
        if(empty())return;
        front++;
        front%=10;
        count--;
    }
    int Rear(){
        if(empty())return 0;
        return arr[rear];
    }
    int Front(){
        if(empty())return 0;
        return arr[front];
    }
    void refresh(){
    	for (int i = 0 ; i < 10 ; i++)
    		arr[i] = 0;
	}
};
//Priority Queue using Queue Array
class PriorityQueue{
private:
    CircularQueue Q[4];
public:
    void enqueue(int v, int p){
        if (p < 0 || p > 3)return;
        Q[p].enqueue(v);
    }
    void dequeue(){
        for (int i = 3 ; i >= 0 ; i--){
            if(!Q[i].empty()){
                Q[i].dequeue();
                break;
            }
        }
    }
    void display(){
        for (int i = 3 ; i >= 0 ; i--){
            cout << "Priority " << i << endl;
            Q[i].display();
        }
    }
    int Front(){
        for (int i = 3 ; i >= 0 ; i--){
            if(!Q[i].empty())return Q[i].Front();
        }
        return 0;
    }
    int Rear(){
        for (int i = 0 ; i <= 3 ; i++){
            if(!Q[i].empty())return Q[i].Rear();
        }
        return 0;
    }
};
//Radix Sort
void RadixSort(int A[], int n){
    CircularQueue Q[10];
    int max,p=0,d=0,div=1;
    max = A[0];
    for (int i = 1 ; i < n ; i++){
        if(max <= A[i]){
            max = A[i];
        }
    }
    while (max > 0){
        max = max/10;
        p++;
    }
    for (int i = 1 ; i<= p ; i++){
        for (int j = 0 ; j < n ; j++){
            d = (A[j]/div) % 10;
            Q[d].enqueue(A[j]);
        }
        int k = 0;
        for (int j = 0 ; j < n ; j++){
            while(!Q[j].empty()){
            	A[k]=Q[j].Front();
				Q[j].dequeue();
                k++;
            }
        }
        div = div * 10;
    }
}
//Selection Sorting
void SelectionSort(int arr[],int n){
    int i,j,t,k;
    for(i=0;i<(n-1);i++){
    	k = i;
        for (j = i+1 ; j<n ; j++){
            if(arr[j] < arr[k]){
                k=j;
            }
        }
        t = arr[i];
        arr[i] = arr[k];
        arr[k] = t;
    }
}
//BUbble Sorting
void BubbleSort(int arr[],int n){
    int i=0,j=0,t=0;
    for(i=0;i<n;i++){
        for (j = 0 ; j<(n-1)-i ; j++){
            if(arr[j] > arr[j+1]){
                t = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = t;
            }
		}
    }
}
//Insertion Sort My Method
void InsertionSort(int arr[],int n){
    int i=0,j=0,t=0,k=0;
    for(i=1;i<n;i++){
        for (j=0;j<i;j++){
            if(arr[i] < arr[j]){
                t = arr[i];
                for(k=i;k>j;k--){
                    arr[k] = arr[k-1];
                }
                arr[j] = t;
            }
        }
	}
}
// function implementation insertion sort
void insertionSort(int A[],int n){  
int i,j,k;
for (i=1;i<n;i++)
  {
  	j=i-1;
  	k=A[i];
  	while (j>=0 && k<A[j])
  	{
	  	A[j+1] = A[j];
		j--; 		
	}
	A[j+1]=k;
  }
}
//Merge Sorting Iterative
void MergeSortingIterative(int arr[],int n){
	for (int curr_size=1; curr_size<=n-1; curr_size = 2*curr_size){
	 
		for (int l=0; l<n-1; l += 2*curr_size){ 
			int m = l + curr_size - 1; 
			int r = min(l + 2*curr_size - 1, n-1); 
  		   	int i, j, k; 
		    int n1 = m - l + 1; 
		    int n2 =  r - m; 
		  	int L[n1], R[n2]; 
		  	for (i = 0; i < n1; i++) 
		        L[i] = arr[l + i]; 
		    for (j = 0; j < n2; j++) 
		        R[j] = arr[m + 1+ j];
//		    cout <<"\nArray L ";
//			display(L,n1);
//			cout <<"\nArray R ";
//		    display(R,n2);
//		    cout <<"\nArray O ";
//		    display(arr,n);
//		    
		  	i = 0; 
		    j = 0; 
		    k = l; 
		    while (i < n1 && j < n2){ 
		        if (L[i] <= R[j]){ 
		            arr[k] = L[i]; 
		            i++; 
		        } 
		        else{ 
		            arr[k] = R[j]; 
		            j++; 
		        } 
		        k++; 
		    } 
		  	while (i < n1){ 
		        arr[k] = L[i]; 
		        i++; 
		        k++; 
		    } 
		  	while (j < n2) { 
		        arr[k] = R[j]; 
		        j++; 
		        k++; 
		    }
//			cout <<"\nArray L ";
//			display(L,n1);
//			cout <<"\nArray R ";
//		    display(R,n2);
//		    cout <<"\nArray O ";
//		    display(arr,n);
//		    cout << endl;cout << endl;cout << endl;
//		      
       } 
   } 
}
//Merge Sorting
void MergeSorting(int A[],int n){
	int m = n /2,i,j,k;
	if ((n % 2))n=m+1;
	else n=m;
	int B[m],C[n];
	for (i = 0 ; i<m ; i++)
		B[i] = A[i];
	for (j = 0 ; j< n ; j++){
		C[j] = A[i];
		i++;
	}
	if (m!=1)
		MergeSorting(B,m);
	if (n != 1)
		MergeSorting(C,n);
	
	i=0,k=0;
	for (j = 0 ; (i<m && k<n) ; j++){
		if(B[i] <= C[k]){
			A[j] = B[i];
			i++;
		} else {	
			A[j] = C[k];
			k++;
		}
	}
	if(i == m)A[j] = C[k];
	if(k == n)A[j] = B[i];
	
}
//Quick Sorting Array
void QuickSortingArray(int A[], int left,int right){
	int temp,i=left,j=right,pivot=A[(left+right)/2];
	while(i<=j){
		while(A[i] < pivot)i++;
		while(A[j] > pivot)j--;
		if(i<=j){
			temp = A[i];
			A[i] = A[j];
			A[j] = temp;
			i++;
			j--;
		}
	}
	if(left < j) QuickSortingArray(A,left,j);
	if(right > i) QuickSortingArray(A,i,right);
}
//Quick Sorting List
void QuickSortingList(SingleSingelyGrounded *list){
	if (list->empty())return;
	
	SingleSingelyGrounded *S = new SingleSingelyGrounded(), *G = new SingleSingelyGrounded();
	
	int n,p=list->getHeadValue();
	
	list->remove(p);
	
	while(!list->empty()){
		n = list->getHeadValue();
		list->remove(n);
		if(n<p) S->addAtEnd(n);
		else G->addAtEnd(n);
	}
	
	QuickSortingList(S);
	QuickSortingList(G);
		
	while(!S->empty()){
		n = S->getHeadValue();
		list->addAtEnd(n);
		S->remove(n);
	}
	list->addAtEnd(p);
	while(!G->empty()){
		n = G->getHeadValue();
		list->addAtEnd(n);
		G->remove(n);
	}
}
//Main
int main(){
    int n = 10;
    int arr[n] = {125,240,215,626,923,721,218,322,126,25};
    display(arr,n);
    cout << "\n";
	MergeSortingIterative(arr,n);
    display(arr,n);
    cout << endl;

    
//	SingleSingelyGrounded *s = new SingleSingelyGrounded();
//	s->addAtEnd(30);
//	s->addAtEnd(10);
//	s->addAtEnd(20);
//	s->addAtEnd(60);
//	s->addAtEnd(50);
//	s->display();
//	QuickSortingList(s);
//	s->display();
	return 0;
}
 
