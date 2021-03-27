#include <iostream>
#include <stack>
using namespace std;
//Checks if array represents a heap or not
bool isHeap(int input[],int length){
	for (int i = 0 ; i < length ; i++)
	{
		
		int l = (2*input[i])+1;
		int r = l+1;
	
		if (l > 15 || r >15)break;
		
		if(input[i] < input[l] || input[i] < input[r])
		 return false;
	}
	return true;
}

//Node for Binary Search Tree
struct Node{
	int value;
	Node* left;
	Node* right;
};
//Enigma
void Enigma(Node *root,int k, int &c){
	if(root == NULL || c >= k) return;
	
	Enigma(root->right,k,c);
	c++;
	if(c==k)
	{
		cout << root->value << endl;
		return;
	}
	Enigma(root->left,k,c);
	
}
//Mystery Function to get successor of inorder
void mystery(Node *root,int k){
	int c = 0;
	Enigma(root,k,c);
}
//Static Circular Queue
class CircularQueue{
private:
    int front,rear,count;
    Node* arr[100];
public:
    CircularQueue(){
        front = 0;
        rear = -1;
        count = 0;
    }
    void enqueue(Node* v){
        if(full())return;
        rear++;
        arr[rear] = v;
        rear %=100;
        count++;
    }
    bool empty(){
        return (count == 0);
    }
    bool full(){
        return (count == 100);
    }
    void display(){
        if(empty())return;
        cout << "front -> ";
        for(int i = front ; i != (rear+1) ; i++){
            i %=100;
			cout << arr[i] << " -> " ;
        }
        cout << " rear\n";
    }
    void dequeue(){
        if(empty())return;
        front++;
        front%=100;
        count--;
    }
    Node* Rear(){
        if(empty())return NULL;
        return arr[rear];
    }
    Node* Front(){
        if(empty())return NULL;
        return arr[front];
    }
};
//Binary Search Tree
class BinarySearchTree{
	private:
		Node* root;
		void inorder(Node *p){
			if (p==NULL)
				return;
			else{
				inorder(p->left);
				cout << p->value << ", ";
				inorder(p->right);
			}
		}
		void preorder(Node *p){
			if (p==NULL)
				return;
			else{
				cout << p->value << ", ";
				preorder(p->left);
				preorder(p->right);
			}
		}
		void postorder(Node *p){
			if (p==NULL)
				return;
			else{
				postorder(p->left);
				postorder(p->right);
				cout << p->value << ", ";
			}
		}
		void traversal(Node *p){
			CircularQueue Q;
			Q.enqueue(p);
			while (!Q.empty()){
				p = Q.Front();
				Q.dequeue();
				cout << p->value << ", ";
				if (p->left)
					Q.enqueue(p->left);
				if (p->right)
					Q.enqueue(p->right);
			}
		}
	public:
		BinarySearchTree(){
			root = NULL;
		}
		void insert(int v){
			Node *a = new Node(),*c,*p;
			a->value = v;
			if (root == NULL)
				root = a;
			else{
				c = p = root;
				while(p!=NULL){
					c = p;
					if( v < p->value)
						p = p->left;
					else
						p = p->right;
				}
				if (a->value < c->value)
					c->left = a;
				else
					c->right = a;
			}
		}
		void inOrder(){
			inorder(root);
		}
		void preOrder(){
			preorder(root);
		}
		void postOrder(){
			postorder(root);
		}
		void traversal(){
			traversal(root);
		}	
		void inOrderIter(){
			stack<Node*> s;
			Node *r = root,*p;
			while(!s.empty()){
				while(r!=NULL){
					p=r;
					r = r->left;
					if(r) s.push(r);
				}
				cout << p->value << endl;
			}
		}
		int min(){
			Node *m = root;
			while (m->left != NULL)
				m = m->left;
			return m->value;
		}
		int max(){
			Node *m = root;
			while (m->right != NULL)
				m = m->right;
			return m->value;
		}
		Node* search(int v){
			Node *S = root;
			while (S!=NULL){
				if(S->value == v)
					return S;
				else if(S->value > v)
					S= S->left;
				else
					S = S->right;
			}
			return NULL;
		}
		Node* pSearch(int v){
			Node *S = root,*p = NULL;
			while (S!=NULL){
				if(S->value == v)
					return p;
				else if(S->value > v){
					p =S;
					S= S->left;
				}
				else{
					p =S;
					S = S->right;
				}
			}
			return NULL;
		}
		void remove(int v){
			Node *P,*D;
			D= search(v);
			P= pSearch(v);
			if(D->left == NULL && D->right == NULL){
				if(D == root)
					root = NULL;
				else if(P->left == D)
					P->left = NULL;
				else
					P->right = NULL;
			}
			delete D;
		}
};
//Binary Tree
class BinaryTree{
	private:
		int A[100];
		int n;
		void inOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			cout << A[p] << " ";
			inOrder(r);
		}
		void preOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			cout << A[p] << " ";
			inOrder(l);
			inOrder(r);
		}
		void postOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			inOrder(r);
			cout << A[p] << " ";
		}
		void remove(int p){
			int c;
			c = 2*p +1;
			if(c>=n)return;
			A[p] = A[c];
			remove(c);
		}
	public:
		BinaryTree(){
			n= 0;
		}
		void insert(int v){
			A[n++] = v;
		}	
		void remove(){
			remove(0);
			n--;
		}
		void traversal(){
			for (int i = 0 ; i<n ; i++)
				cout << A[i] << " ";
		}
		void inOrder(){
			inOrder(0);
		}
		void preOrder(){
			preOrder(0);
		}
		void postOrder(){
			postOrder(0);
		}
};
//Binary Tree Characters
class BinaryTreeC{
	private:
		char A[100];
		int n;
		void inOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			cout << A[p] << " ";
			inOrder(r);
		}
		void preOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			cout << A[p] << " ";
			inOrder(l);
			inOrder(r);
		}
		void postOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			inOrder(r);
			cout << A[p] << " ";
		}
		void remove(int p){
			int c;
			c = 2*p +1;
			if(c>=n)return;
			A[p] = A[c];
			remove(c);
		}
	public:
		BinaryTreeC(){
			n= 0;
		}
		void insert(char v){
			A[n++] = v;
		}	
		void remove(){
			remove(0);
			n--;
		}
		void traversal(){
			for (int i = 0 ; i<n ; i++)
				cout << A[i] << " ";
		}
		void inOrder(){
			inOrder(0);
		}
		void preOrder(){
			preOrder(0);
		}
		void postOrder(){
			postOrder(0);
		}
};
//Heap Max
class HeapMax{
	private:
		int A[100];
		int n;
		void inOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			cout << A[p] << " ";
			inOrder(r);
		}
		void preOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			cout << A[p] << " ";
			preOrder(l);
			preOrder(r);
		}
		void postOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			postOrder(l);
			postOrder(r);
			cout << A[p] << " ";
		}
	public:
		HeapMax(){
			n= 0;
		}
		void traversal(){
			for (int i = 0 ; i<n ; i++)
				cout << A[i] << " ";
		}
		void insert(int v){
			A[n] = v;
			heapUp(n);
			n++;
		}
		void remove(){
			A[0] = A[n-1];
			n--;
			heapDown(0);
		}
		void heapUp(int c){
			int p,t;
			if (c <= 0)return;
			if(c % 2)
				p = (c-1)/2;
			else
				p = (c-2)/2;
			if(A[c] > A[p]){
				t = A[c];
				A[c] = A[p];
				A[p] = t;
				c=p;
				heapUp(c);
			}
		}
		void heapDown(int p){
			if(p>=n-1)return;
			int t,l,r,c;
			l = 2*p +1;
			r = l+1;
			if (l<n){
				if (r<n){
					if(A[l]>A[r]){
						c=l;
					}
					else{
						c=r;
					}
				}
				c=l;
			}
			if(A[c] > A[p]){
				t = A[p];
				A[p] = A[c];
				A[c] = t;
				heapDown(c);
			}
		}
		void inOrder(){
			inOrder(0);
		}
		void preOrder(){
			preOrder(0);
		}
		void postOrder(){
			postOrder(0);
		}
};
//Heap Min
class HeapMin{
	private:
		int A[100];
		int n;
		void inOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			inOrder(l);
			cout << A[p] << " ";
			inOrder(r);
		}
		void preOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			cout << A[p] << " ";
			preOrder(l);
			preOrder(r);
		}
		void postOrder(int p){
			int l,r;
			if(p >=n) return;
			l = 2*p+1;
			r = l+1;
			postOrder(l);
			postOrder(r);
			cout << A[p] << " ";
		}
		void heapUp(int c){
			int p,t;
			if (c <= 0)return;
			if(c % 2){
				p = (c-1)/2;
			}
			else{
				p = (c-2)/2;
			}
			if(A[c] < A[p]){
				t = A[c];
				A[c] = A[p];
				A[p] = t;
				c=p;
				heapUp(c);
			}
		}
		void heapDown(int p){
			if(p>=n-1)return;
			int t,l,r,c;
			l = 2*p +1;
			r = l+1;
			if (l<n){
				if (r<n){
					if(A[l]<A[r]){
						c=l;
					}
					else{
						c=r;
					}
				}
				c=l;
			}
			if(A[c] < A[p]){
				t = A[p];
				A[p] = A[c];
				A[c] = t;
				heapDown(c);
			}
		}
	public:
		HeapMin(){
			n= 0;
		}
		void insert(int v){
			A[n] = v;
			heapUp(n);
			n++;
		}
		void remove(){
			A[0] = A[n-1];
			n--;
			heapDown(0);
		}
		void inOrder(){
			inOrder(0);
		}
		void preOrder(){
			preOrder(0);
		}
		void postOrder(){
			postOrder(0);
		}
		void traversal(){
			for (int i = 0 ; i<n ; i++)
				cout << A[i] << " ";
		}
};
//Main
int main(){
	BinarySearchTree b;
	b.insert(45);
	b.insert(23);
	b.insert(43);
	b.insert(27);
	b.insert(22);
	b.insert(19);
	b.insert(21);
	b.insert(56);
	b.insert(12);
	b.insert(14);
	b.insert(56);
	b.insert(34);
	b.insert(64);
	b.insert(24);
	b.insert(21);
	cout <<"InOrder" << endl;
	b.inOrder();
	cout <<"\nPostOrder" << endl;
	b.postOrder();
	cout <<"\nPreOrder" << endl;
	b.preOrder();
	cout <<"\nLevel Wise" << endl;
	b.traversal();
	cout <<"\n" << b.pSearch(64)->value <<endl;
	b.remove(64);
	cout <<"\nLevel Wise" << endl;
	b.traversal();
	
	return 0;
}
