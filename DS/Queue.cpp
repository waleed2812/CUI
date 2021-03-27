#include <iostream>
using namespace std;
//Node structure for Dynamic Queue
struct Node{
    int value;
    Node *next;
};
//Dynamic Queue
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
//Fix Head
class QueueStatic{
private:
    int arr[11];
public:
    QueueStatic(){
        arr[0] = 1;
    }
    void enqueue(int v){
        if (arr[0] == 11)return;
        for(int i = arr[0] ; i > 1 ; i--){
            arr[i] = arr[i-1];
        }
        arr[1] = v;
        arr[0]++;
    }
    bool empty(){
        return (arr[0] == 0);
    }
    void display(){
        cout << "rear -> ";
        for(int i = 1 ; i < arr[0] ; i++){
            cout << arr[i] << " -> " ;
        }
        cout << " front\n";
    }
    void dequeue(){
        arr[0]--;
    }
    int Rear(){
        return arr[1];
    }
    int Front(){
        return arr[arr[0]-1];
    }
    
};
//Variable Head
class StaticQueue{
private:
    int front,rear;
    int arr[10];
public:
    StaticQueue(){
        front = 0;
        rear = 0;
    }
    void enqueue(int v){
        if (full())return;
        arr[rear] = v;
        rear++;
    }
    bool empty(){
        return (rear == 0);
    }
    bool full(){
        return (rear == 10);
    }
    void display(){
        if(empty())return;
        cout << "front -> ";
        for(int i = front ; i < rear ; i++){
            cout << arr[i] << " -> " ;
        }
        cout << " rear\n";
    }
    void dequeue(){
        front++;
    }
    int Rear(){
        return arr[rear-1];
    }
    int Front(){
        return arr[front];
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
//Circular DeQueue
class DeQueue{
	private:
	    int front,rear,count;
	    int arr[10];
	public:
	    DeQueue(){
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
	    void enqueueFront(int v){
	        if(full())return;
	        front--;
	        if(front == -1)front = 9;
	        arr[front] = v;
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
	        for(int i = front ; i != (rear+1) ; i++){
	        	i %=10;
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
};
//Main
int main() {
    PriorityQueue S;
    cout << "Adding 20 priority 0" << endl;
    S.enqueue(20,0);
    cout << "Adding 30  priority 0" << endl;
    S.enqueue(30,0);
    cout << "Adding 10 priority 1 " << endl;
    S.enqueue(10,1);
    cout << "Adding 5 priority 3 " << endl;
    S.enqueue(5,3);
    cout << "Displaying Queue " << endl;
    S.display();
    cout << " " << endl;
    cout << "Displaying front " << endl;
    cout << S.Front() << endl;
    cout << "Displaying rear " << endl;
    cout << S.Rear() << endl;
    cout << "Dequeuing " << endl;
    S.dequeue();
    cout << "Displaying Queue " << endl;
    S.display();
    cout << "Displaying front " << endl;
    cout << S.Front() << endl;
    cout << "Displaying rear " << endl;
    cout << S.Rear() << endl;
	return 0;
}
