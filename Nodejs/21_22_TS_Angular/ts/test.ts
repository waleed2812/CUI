class Person {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	sayHello() {
	     return 'Hello ' + this.name;
	}
}
let person = new Person('Raza');
console.log(person.name);
console.log(person.sayHello());
