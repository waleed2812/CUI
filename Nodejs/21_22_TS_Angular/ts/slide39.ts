var bookName: string = 'Angular UI Development';
var version: number = 2;
var isCompleted: boolean = false;
var frameworks1: string[] = ['Angular', 'React', 'Ember'];
var frameworks2: Array<string> = ['Angular', 'React', 'Ember'];
enum Framework { Angular, React, Ember };
var f: Framework = Framework.Angular;
var eventId: any = 7890;
eventId = 'event1';
var myCollection:any[] = ['value1', 100, 'test', true];
myCollection[2] = false;

console.log('bookName: ' + bookName)
console.log('version: ' + version)
console.log('isCompleted: ' + isCompleted)
console.log('frameworks1: ' + frameworks1)
console.log('frameworks2: ' + frameworks2)
console.log('Framework: ' + Framework)
console.log('f: ' + f)
console.log('eventId: ' + eventId)
console.log('myCollection: ' + myCollection)
console.log('myCollection[2]: ' + myCollection[2])
