function add(a, b){
	a = parseFloat(a);
	b = parseFloat(b);
	
	console.log('isNaN(a) : ' + isNaN(a));
	
	if (isNaN(a) || isNaN(b)) return 'Invalid Input';
	
	return a + b;
}

function sub(a, b){
    
    a = parseFloat(a);
	b = parseFloat(b);
	
	if (isNaN(a) || isNaN(b)) return 'Invalid Input';
	
	return a - b;
}

function mul(a, b){
    
    a = parseFloat(a);
	b = parseFloat(b);
	
	if (isNaN(a) || isNaN(b)) return 'Invalid Input';
	
	return a * b;
}

function div(a, b){
    
    a = parseFloat(a);
	b = parseFloat(b);
	
	if (isNaN(a) || isNaN(b)) return 'Invalid Input';
	
	return a / b;
}

console.log('4 + 2 = ' + add(4, 2));
console.log('4 - 2 = ' + sub(4, 2));
console.log('4 * 2 = ' + mul(4, 2));
console.log('4 / 2 = ' + div(4, 2));
console.log('4 / a = ' + div(4, 'a'));
console.log('a - b = ' + sub('a', 'b'));
console.log('x + y = ' + add('x', 'y'));