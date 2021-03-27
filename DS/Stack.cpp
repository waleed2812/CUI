#include <iostream>
#include <cmath>
#include <string>
using namespace std;
//Static Stack
class SStack{
private:
    int arr[10];
    int top;
public:
    SStack(){
        top = 0;
    }
    void push(int num){
        arr[top] = num;
        top++;
    }
    void pop(){
        top--;
    }
    int peek(){
        return arr[top-1];
    }
    bool empty(){
        return (top==0);
    }
    void display(){
        for (int j=0 ; j<top ; j++){
                cout << arr[j] << " ";
        }
    }
};
//Node
struct Node{
    int value;
    Node *next;
};
//Character Node
struct NodeChar{
    char value;
    NodeChar *next;
};
//Dynamic Stack
class DStackChar{
private:
    NodeChar *top;
public:
    DStackChar(){
        top = __null;
    }
    void push(char v){
        NodeChar *A = new NodeChar();
        A->value = v;
        A->next = top;
        top = A;
    }
    void pop(){
        if (top==__null)return;
        top = top->next;
    }
    void display(){
        NodeChar *S = top;
        cout << "Top -> ";
        while(S!=__null){
            cout << S->value << " -> " ;
            S = S ->next;
        }
    }
    char peek(){
        if (top==__null)return 0;
        return top->value;
    }
    bool empty(){
        return (top==__null);
    }

};
//Singlely Linked List
class SingleSingelyGrounded{
private:
    Node *head;
public:
    //Node *head;
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
        return (head==__null);
    }
    
    void displayR(){
        Node *S = head,*p=__null,*temp,*head2=head;
        cout << "Ground <-";
        while(head2!=__null){
            S = head;
            while(S!=p){
                temp = S;
                S = S ->next;
            }
            p = temp;
            cout << temp->value << " <- ";
            head2 = head2 ->next;
        }
        cout << " Head \n";
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
//Dynamic Stack inherited
class DStack : SingleSingelyGrounded{    
public:
    void push(int v){
        addAtStart(v);
    }
    void Display(){
        display();
    }
    void pop(){
        remove(getHeadValue());
    }
    int peek(){
        return getHeadValue();
    }
};
//Expression
class Expression {
private:
    
public:
    Expression(){}
    string toPostfix(string E){
        int n = E.length();
        DStackChar S;
        string p;
        char C,ch;
        for (int i = 0 ; i < n ; i++){
            ch = E[i];
            switch(ch){
                case '(':
                    S.push(ch);
                    break;
                case ')':
                    while (S.peek()!='(' ){
                        C = S.peek();
                        S.pop();
                        p += C;
                    }
                    S.pop();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '^':
                    while (!S.empty() && S.peek()!='(' && precedence(ch) <= precedence(S.peek())){
                        C = S.peek();
                        S.pop();
                        p += C;
                    }
                    S.push(ch);
                    break;
                case ' ':
                    break;
                default:
                    p += ch;
                    break;
            }
        }
        while (!S.empty()){
            p += S.peek();
            S.pop();
        }
        return p;
    }
    int postfixSol(string p){
        int x,y,result;
        DStack cal;
        for (int i = 0; i<p.length() ; i++){
            switch (p[i]){
                case '+':
                    x = cal.peek();
                    cal.pop();
                    y = cal.peek();
                    cal.pop();
                    result = x + y;
                    cal.push(result);
                    break;
                case '-':
                    x = cal.peek();
                    cal.pop();
                    y = cal.peek();
                    cal.pop();
                    result = y - x;
                    cal.push(result);
                    break;
                case '*':
                    x = cal.peek();
                    cal.pop();
                    y = cal.peek();
                    cal.pop();
                    result = x * y;
                    cal.push(result);
                    break;
                case '/':
                    x = cal.peek();
                    cal.pop();
                    y = cal.peek();
                    cal.pop();
                    result = x / y;
                    cal.push(result);
                    break;
                case '^':
                    x = cal.peek();
                    cal.pop();
                    y = cal.peek();
                    cal.pop();
                    result = pow(x,y);
                    cal.push(result);
                    break;
                case ' ':
                    break;
                default:
                    cal.push((int)p[i]-48);
                    break;
            }
            //cout << "\nStack\n" << cal.display();
        }
        return cal.peek();
    }
    string toPrefix(string E){
        E = reverse(E);
        int n = E.length();
        DStackChar S;
        string p;
        char C,ch;
        for (int i = 0 ; i < n ; i++){
            ch = E[i];
            switch(ch){
                case ')':
                    S.push(ch);
                    break;
                case '(':
                    while (S.peek()!=')' ){
                        C = S.peek();
                        S.pop();
                        p += C;
                    }
                    S.pop();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '^':
                    while (!S.empty() && S.peek()!=')' && precedence(ch) <= precedence(S.peek())){
                        C = S.peek();
                        S.pop();
                        p += C;
                    }
                    S.push(ch);
                    break;
                case ' ':
                    break;
                default:
                    p += ch;
                    break;
            }
        }
        while (!S.empty()){
            p += S.peek();
            S.pop();
        }
        p = reverse(p);
        return p;
    }
    string reverse(string s){
        string s2;
        int n = s.length();
        char c[n];
        for (int i = 0 ; i < n ; i++){
            c[i] = s[i];
        }
        for (int i = n-1 ; i >= 0 ; i--){
            s2+=c[i];
        }
        return s2;
    }
    int precedence(char x){
        if (x == '+' || x == '-'){
            return 0;
        } else if (x == '*' || x == '/'){
            return 1;
        } else{
            return 2;
        }
    }
};

int main() {
    Expression exp;
    cout << "\n" << exp.toPostfix("x/y + ((S+T)^2)^(1/3)"); 
    
    cout << "\n" << exp.toPrefix("x/y + ((S+T)^2)^(1/3)"); 

    return 0;
}
