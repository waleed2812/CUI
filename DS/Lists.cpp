#include <iostream>
using namespace std;
//Node for static list
struct node{
    int value;
    int next;
};
//Node for list
struct Node{
    int value;
    Node *next;
};
//Double ended Node for static list
struct DNode{
    int value;
    DNode *next;
    DNode *previous;
    
};
//static list
class StaticList{
private:
    int top = 0;
public:
    StaticList(){}
    node List[10];
    int Avail[10] = {0,0,0,0,0,0,0,0,0,0};
    void Insert(int Value){
        bool check = false;
        for (int i= 0 ; i<10 ; i++){
            if (!Avail[i]){
                List[i].value = Value;
                List[i].next = i+1;
                Avail[i] = 1;
                top = i+1;
                check = true;
                break;
            }
        }
        if(!check){
            cout << "No SPace in List";
        }
    }
    void InsertAtPosition(int p, int value){
        if (p < 0 || p >=top)return;
        if (Avail[p]){
            for (int i = top ; i >p ; i--){
                Avail[i] = Avail[i-1];
                List[i] = List[i-1];
                List[i].next ++;
            }
        }
        List[p].value= value;
        List[p].next = p+1;
        List[p-1].next = p;
        top++;
        Avail[p] = 1;
    }
    void display(){
        for (int i = 0 ; i < top ; i++){
            cout << " Value " << List[i].value << " Next " << List[i].next << "\n";
        }
    }
};
//Single Ended Singely Linked Grounded    
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
    bool empty(){
        return (head==__null);
    }
    
    void displayR(){
        displayR(head);
    }
    
    void addAtEnd(int v){
        Node *A = new Node();
        Node *L = head;
        A ->value = v;
        A ->next = __null;
        if (empty()){
            head = A;
        } else {
            while (L ->next != __null){
                L =L ->next;
            }
            L ->next = A;
        }
    }
    
    void removeAll(){
        head = __null;
    }
    
    bool searchInt(int v){
        Node *D;
        D=head;
        while(D!=__null && D->value != v){
            D = D ->next;
        }
        if (D == __null){
            return false;
        } else {
            return true;
        }
    }
    
    int getLength(){
        Node *D;
        int count = 0;
        D=head;
        while(D!=__null){
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
        xp=yp=__null;
        while(x!=__null && x->value != num1){
            xp = x;
            x = x ->next;
        }
        while(y!=__null && y->value != num2){
            yp = y;
            y = y ->next;
        }
        if (x==y || x == __null || y == __null){
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
//Single Ended Singely Linked Circular
class SingleSingelyCircular{
private:
    Node *head;
public:
    SingleSingelyCircular(){
        head = __null;
    }
    
    void addAtStart(int v){
        Node *A = new Node(),*temp;
        A->value = v;
        if (head == __null){
            head = A;
            A->next = head;
        } else {
            temp = head;
            while(temp->next != head)  
                temp = temp->next;  
            A->next = head;   
            temp -> next = A;   
            head = A;  
        }
    }
    bool empty(){
        return (head==__null);
    }
    void display(){
        Node *S = head;
        
        cout << "Head -> "<< head->value << " -> ";
        while(S->next != head){
            S = S ->next;
            cout << S->value << " -> " ;
        }
        cout << " Head\n";
    }
    void remove(int v){
        Node *D = head,*P;
        while(D->next != head && D->value != v){
            P = D;
            D = D ->next;
        }
        if (head->next == head || head == __null){
            head = __null;
            return;
        }
        if (D == head){
            Node *temp2;
            head = head ->next;
            Node *temp=head;
            while (temp->next!=head){
                temp2 = temp;
                temp = temp->next;
            }
            temp2->next = head;
        } else if (D->next == head){
            P->next = head;
        } else {
            P = D->next;
            delete D;
        }
    }
};
//Double Ended Singely Linked Grounded
class DoubleSingelyGrounded{
private:
    Node *head,*tail;
public:
    DoubleSingelyGrounded(){
        head = __null;
        tail = __null;
    }
    
    void addAtStart(int v){
        Node *A = new Node();
        A->value = v;
        A->next = head;   
        head = A;
        if (A->next == __null)tail= A;
    }
    bool empty(){
        return (head==__null);
    }
    void display(){
        Node *S = head;
        cout << "Head -> ";
        while(S != __null){
            cout << S->value << " -> " ;
            S = S ->next;
        }
        cout << " Tail\n";
    }
    void remove(int v){
        Node *D = head,*P;
        while(D != __null && D->value != v){
            P = D;
            D = D ->next;
        }
        if (head == __null) return;
        if (D == head){
            head = head ->next;
            delete D;
        } else{
            P->next = D->next;
            if (P->next == __null) tail = P;
            delete D;
        }
    }
};
//Double Ended Singely Linked Circular
class DoubleSingelyCircular{
private:
    Node *head,*tail;
public:
    DoubleSingelyCircular(){
        head = __null;
        tail = __null;
    }
    
    void addAtStart(int v){
        Node *A = new Node();
        A->value = v;
        if (head == __null){
            A->next = A;
            tail = A;
        } else {
            A->next = head;    
            tail -> next = A;  
        }
        head = A;
    }
    bool empty(){
        return (head==__null);
    }
    void display(){
        Node *S = head;
        if (head == __null && tail == __null){
            cout << "Empty List";
            return;
        }
        cout << "Head -> "<< head->value << " -> ";
        while(S->next != head){
            S = S ->next;
            cout << S->value << " -> " ;
        }
        cout << " Tail\n";
    }
    void remove(int v){
        Node *D = head,*P;
        while(D->next != head && D->value != v){
            P = D;
            D = D ->next;
        }
        if(head == __null || head == tail){
            head =tail= __null;
            return;
        }
        if(D == head){
            head = head ->next;
            tail->next = head;
        } else {
            P->next = D->next;
        }
        delete D;
    }
};
//Single Ended Doubly Linked Grounded
class SingleDoublyGrounded{
private:
    DNode *head;
public:
    SingleDoublyGrounded(){
        head = __null;
    }
    
    void addAtStart(int v){
        DNode *A = new DNode();
        A->value = v;
        A->next = head;
        if (head != __null)
        head->previous = A;
        A->previous = __null;
        head = A;
    }
    void display(){
        DNode *S = head;
        cout << "Head -> ";
        while(S!=__null){
            cout << S->value << " <-> " ;
            S = S->next;
        }
        cout << "Ground\n";
    }
    void remove(int v){
        DNode *D=head;
        while(D!=__null && D->value != v)
            D = D ->next;
        if (D == __null)return;
        if (D == head){
            head = D->next;
            D->next->previous = D->previous;
        } else if (D->next == __null) {
            D->previous->next = __null;
        } else {
            D->previous->next = D->next;
            D->next->previous = D->previous;
        }
        delete D;
    }
};
//Single Ended Doubly Linked Circular
class SingleDoublyCircular{
private:
    DNode *head;
public:
    SingleDoublyCircular(){
        head = __null;
    }
    
    void addAtStart(int v){
        DNode *A = new DNode();
        A->value = v;
        if(head==__null){
            A->next = A;
            A->previous = A;
        }else{
            A->next = head;
            A->previous = head->previous;
            head->previous->next = A;
            head->previous = A;
        }
        head = A;
    }
    void display(){
        DNode *S = head;
        cout << "Head -> ";
        while(S->next!=head){
            cout << S->value << " <-> " ;
            S = S->next;
        }
        cout << "Head\n";
    }
    void remove(int v){
        DNode *D=head;
        
        while(D->next!=head && D->value != v)D = D ->next;
        
        if (D == __null)return;
        
        D->next->previous = D->previous;
        D->previous->next = D->next;
        
        if (D==head){
            head = D->next;
        }
        delete D;
    }
};
//Double Ended Doubly Linked Circular
class DoubleDoublyCircular{
private:
    DNode *head,*tail;
public:
    DoubleDoublyCircular(){
        head = __null;
        tail = __null;
    }
    void addAtStart(int v){
        DNode *A = new DNode();
        A->value = v;
        if(head==__null){
            A->next = A;
            A->previous = A;
            tail = A;
        }else{
            A->next = head;
            head->previous = A;
            A->previous = tail;
            tail->next = A;
        }
        head = A;
    }
    void display(){
        DNode *S = head;
        cout << "Head -> ";
        while(S !=tail){
            cout << S->value << " <-> " ;
            S = S->next;
        }
        cout << S->value << " <-> Tail\n";
    }
    void remove(int v){
        DNode *D=head;
        
        while(D->next!=head && D->value != v)D = D ->next;
        
        if (D == __null)return;
        
        D->next->previous = D->previous;
        D->previous->next = D->next;
        
        if (D==head){
            head = D->next;
        }
        if (D==tail){
            tail = D->previous;
        }
        delete D;
    }
};
//Double Ended Doubly Linked Grounded
class DoubleDoublyGrounded{
private:
    DNode *head,*tail;
public:
    DoubleDoublyGrounded(){
        head = __null;
        tail = __null;
    }
    void addAtStart(int v){
        DNode *A = new DNode();
        A->value = v;
        A->next = head;
        A->previous = __null;
        if(head==__null){
            tail = A;
        } else{
            head->previous = A;
        }
        head = A;
    }
    void display(){
        DNode *S = head;
        cout << "Head -> ";
        while(S != __null){
            cout << S->value << " <-> " ;
            S = S->next;
        }
        cout <<"Tail\n";
    }
    void remove(int v){
        DNode *D=head;
        while(D!=__null && D->value != v)D = D ->next;
        if (D == __null)return;
        if (D==head){
            D->next->previous = __null;
            head = D->next;
        } else if (D==tail){
            D->previous->next = __null;
            tail = D->previous;
        } else{
            D->next->previous = D->previous;
            D->previous->next = D->next;
        }
        delete D;
    }
};
//Single Ended Doubly Linked Circular Sorted
class SingleDoublyCircularSorted{
private:
    DNode *head;
public:
    SingleDoublyCircularSorted(){
        head = __null;
    }
    SingleDoublyCircularSorted(int numberToAdd){
        head = __null;
        insert(numberToAdd);
    }
    SingleDoublyCircularSorted(int arrayOfIntegers[],int arrayLength){
        head = __null;
        for (int i = 0 ; i < arrayLength ; i++){
            insert(arrayOfIntegers[i]);
        }
    }
    void insert(int v){
        DNode *A = new DNode();
        A->value = v;
        if(head==__null){
            A->next = A;
            A->previous = A;
            head = A;
        }else{
            bool check = false;
            DNode *temp = head;
            do{
                if (A->value <= temp->value){
                    A->next = temp;
                    A->previous = temp->previous;
                    temp->previous->next = A;
                    temp->previous = A;
                    if (temp == head)head = A;
                    check = true;
                    break;
                }
                temp = temp->next;
            }while (temp!=head);
            if(!check){
                A->next = head;
                A->previous = temp->previous;
                temp->previous->next = A;
                head->previous = A;
            }
        }
    }
    void display(){
        DNode *S = head;
        cout << "Head -> ";
        do{
            cout << S->value << " <-> " ;
            S = S->next;
        }while(S!=head);
        cout << "Head\n";
    }
    int getHead(){
        return head->value;
    }
    void setHead(DNode* newHead){
        head = newHead;
    }
    SingleDoublyCircularSorted Rest(){
        SingleDoublyCircularSorted list;
        DNode *temp = head->next;
        while(temp!=head){
            list.insert(temp->value);
            temp = temp->next;
        }
        return list;
    }
};
//Main
int main() {
    SingleSingelyGrounded ss;
    printf("\nAdding At Start: 20\n");
    ss.addAtStart(20);
    printf("\nAdding At Start: 10\n");
    ss.addAtStart(10);
    printf("\nAdding At Start: 30\n");
    ss.addAtStart(30);
    printf("\nAdding At Start: 40\n");
    ss.addAtStart(40);
    printf("\nAdding At Start: 100\n");
    ss.addAtStart(100);
    printf("\nAdding At Start: 105\n");
    ss.addAtStart(105);
    
    printf("\nPrinting List\n");
    ss.displayR();
    return 0;
}
