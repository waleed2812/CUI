/*
Submitted By:
SP18-BCS-170: Waleed Butt
SP18-BCS-161: Talha Ejaz
SP18-BCS-177: Zainab Gulab
SP18-BCS-178: Zarlish Rida
SP18-BCS-153: Sufyan Khattak
*/
#include <iostream>
#include <string>
#include <list>
#include <stack>
using namespace std;
//Method to get the power of integer (x^y)
int power(int x, int y){
	int result = 1;
	for(int i = 1 ; i <= y ; i++){
		result *= x;
	}
	return result;
}
//Node to store polynomial coeff and it's power
struct Term{
    int p;
    double coeff;
};
//String to Double
double parseDouble(string s){
	double answer = 0;
	int tenP = 1;
	int t = -1;
	
	bool check = false;
	
	for(int i = 0 ; i < s.length() ; i++){
		if(s[i] == '.') break;
		else if(s[i] == '-') continue;
		t++;
	}
	int i;
	if(s[0] == '-')i = 0;
	else i = -1;
	for(i ++ ; i < s.length() ; i++){
		if(s[i] == '.'){
			check = true;
			continue;
		} 
		if(check){
			answer += ((double)s[i]-48) / (power(10,tenP));
			tenP++;
		} else {
			answer += ((int)s[i]-48) * (power(10,t));
			t--;
		}
	}
	
	if(s[0] == '-')
		return (answer * -1) ;
	else
		return answer;
}
//Polynomial
class Polynomial{
	private:
		list<Term *> constants; //List of all the terms in the polynomial
	public:
		//Default Constructor
		Polynomial(){}
		//Constructor with expression input as a string
		Polynomial(string s){
			insert(s);
		}
		//Method to add a term with Coeff and power to current expression 
		void insertTerm(double coeff, int p){
			Term *A = new Term();
			A->coeff = coeff;
			A->p = p;
			bool check = true;
			for (list<Term *>::iterator n=constants.begin(); n!= constants.end();  ++n){
				check = true;
				Term *x = (Term *)*n;
				if(x->p == A->p){
					x->coeff += A->coeff;
					
					if(x->coeff == 0){
						constants.remove(x);
					}
					check = false;
					break;
				}
			}
			if(check) constants.push_back(A);
			else delete A;
		}
		//Method to add a terms from a string to current expression
		void insert(string s){
			stack<double> st;
			string num = "";
			for(int i = 0 ; i <= s.length() ; i++){
				switch(s[i]){
					case '0':
					case '1':
					case '2':
					case '3':
					case '4':
					case '5':
					case '6':
					case '7':
					case '8':
					case '9':
					case '.':
						num += s[i];
						break;
					default:
						if(num != "" && num != "-"){	
							st.push(parseDouble(num));
							num = "";
						}
						if(s[i] == '-')
							num += s[i];
						break;
				}
			}
			
			while(!st.empty()){
				Term *A = new Term();
				A->p =  st.top();
				st.pop();
				A->coeff = st.top();
				st.pop();
				insertTerm(A->coeff,A->p);
				delete A;
			}
		}
		//Method to add a term to current expression
		void insertTerm(Term *term){
			insertTerm(term->coeff,term->p);
		}
		
		void removeTerm(Term *term){
			constants.remove(term);
		}
		
		void copy(Polynomial P){
			constants.clear();
			for (list<Term *>::iterator n=P.constants.begin(); n!= P.constants.end();  ++n){
				Term *xt = (Term *)*n;
				insertTerm(xt);
			}
		}
	
		Polynomial add(Polynomial x, Polynomial y){
			Polynomial z;
			z.copy(x);
			for (list<Term *>::iterator n=y.constants.begin(); n!= y.constants.end();  ++n){
				Term *yt = (Term *)*n;
				z.insertTerm(yt);
			}
			return z;
		}
		
		Polynomial sub(Polynomial x, Polynomial y){
			Polynomial z;
			z.copy(x);
			for (list<Term *>::iterator n=y.constants.begin(); n!= y.constants.end();  ++n){
				Term *yt = (Term *)*n;
				z.insertTerm(yt->coeff*(-1),yt->p);
			}
			return z;
		}
		
		Polynomial prod(Polynomial x, Polynomial y){
			Polynomial z;
			for (list<Term *>::iterator n=x.constants.begin(); n!= x.constants.end();  ++n){
				Term *xt = (Term *)*n;
				for (list<Term *>::iterator m=y.constants.begin(); m!= y.constants.end();  ++m){
					Term *yt = (Term *)*m;
					z.insertTerm(xt->coeff*yt->coeff,xt->p+yt->p);
				}
			}
			return z;
		}
			
		Polynomial* div(Polynomial x, Polynomial y){
			Polynomial divisor,dividend,quotient;
			Polynomial* z = new Polynomial[2];
		
			divisor.copy(y);
			dividend.copy(x);
			list<Term *>::iterator n=divisor.constants.begin();
			Term *maxDivisor = (Term *)*n;
			
			for (n++ ;  n!= divisor.constants.end();  ++n){
				Term *xt = (Term *)*n;
				if(maxDivisor->p < xt->p){
					maxDivisor = xt;
				}
			}
			while (true){
				list<Term *>::iterator m=dividend.constants.begin();
				Term *maxDividend = (Term *)*m;
				for (m++ ; m!= dividend.constants.end();  ++m){
					Term *yt = (Term *)*m;
					if(maxDividend->p < yt->p){
						maxDividend = yt;
					}
				}
				
				if(maxDividend->p < maxDivisor->p)
					break;
					
				Term *Temp = new Term();
				Polynomial temp;
				Temp->coeff = (double)maxDividend->coeff/(double)maxDivisor->coeff;
				Temp->p = maxDividend->p - maxDivisor->p;
				temp.insertTerm(Temp);
				quotient.insertTerm(Temp);
				temp = prod(divisor,temp);
				dividend = sub(dividend,temp);
			}
			z[0].copy(quotient);
			z[1].copy(dividend);
			
			return z;
		}
		
		void display(){
			bool check = false;
			for (list<Term *>::iterator m=constants.begin(); m!= constants.end();  ++m){
				check = true;
				Term *x = (Term *)*m;
				if(m == constants.begin() || x->coeff < 0 )
					cout  << x->coeff << "x^" << x->p<< " " ;
				else
					cout  << "+ " << x->coeff << "x^" << x->p<< " ";
			}
			if(!check)cout << "Empty List";
		}
};
//Testing Main For Output
int main(){ 
	
	
	Polynomial p("2x2 - 3x1 + 4x0");
	Polynomial p2("1x1 + 3x0");
	Polynomial sum,*div;
 
	p.display();
	cout<< endl;
	p2.display();
	cout<< endl;
	
	cout<< "Sum\n";
	sum = p.add(p,p2);
	sum.display();
	cout<< endl;
	
	cout<< "Diff\n";
	sum = p.sub(p,p2);
	sum.display();
	cout<< endl;
		
	cout<< "Prod\n";
	sum = p.prod(p,p2);
	sum.display();
	cout<< endl;
	
	cout<< "Div\nQuotient: ";
	div = p.div(p,p2);
	div[0].display();
	cout << "Remainder: ";
	div[1].display();
	cout<< endl;
	
	return 0;
}
