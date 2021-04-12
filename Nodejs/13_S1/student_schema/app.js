// Create a mongoose schema naming students and courses. Students will have fields like name, age, year, email, phone number, course enrolled etc.
// Courses will have fields like department, name, credit hours, subject Outline etc.
// 1) Create a schema for students and courses and create reference of courses in Students.
// 2) Insert a course and attach that course to all students in a specific year.
// 3) Using an aggregate pipeline, write a query to fetch all the courses with students.
// 4) Search all the courses from the course collection where credit hours are greater than equal to 3 and the department is “IT”.



const mongoose = require('mongoose');

const coursesSchema = mongoose.Schema({
    name: String,
    department: String,
    credit: Number,
    outline: String,
});

const studentSchema = mongoose.Schema({
   name: String,
   age: Number,
   year: Number,
   email: String,
   phone: String,
   courses: [mongoose.Schema.Types.ObjectId]
});

const Courses = mongoose.model('courses', coursesSchema);
const Students = mongoose.model('students', studentSchema);

function add() {
    mongoose.connect('mongodb://localhost:27017/S1', function (err, db) {
        if (err) {
            db.close();
            throw err;
        }

        // Adding Multiple Students 
        const newStudents = [ 
            new Students ({ name: "Waleed Butt",age: 22,year: 2021,email: 'waleed3072@gmail.com',phone: '+92-348-5157334'}),
            new Students ({ name: "Shariq Ahmed",age: 30,year: 2021,email: 'shrek@gmail.com',phone: '+92-232-12312321'}),
            new Students ({ name: "Talha Ejaz",age: 60,year: 2020,email: 'ejaazsahab@gmail.com',phone: '+92-232-1212312'}),
            new Students ({ name: "Talal Mughal",age: 21,year: 2021,email: 'tani@gmail.com',phone: '+92-232-123112312'}),
        ];

        // Adding Student
        //const newStudent = new Students ({ name: "Waleed Butt",age: 22,year: 2021,email: 'waleed3072@gmail.com',phone: '+92-348-5157334'});

        for (newStudent of newStudents) {

            newStudent.save((err) => {

                if (err) {
        
                    db.close();
        
                    console.error("Failed Student Add");
        
                    throw err;
                }
        
                console.log('Student Added.');
                db.close();
        
            });

        }

        // Adding Courses
        const newCourse = new Courses({
            name: 'CS1',
            department: 'IT',
            credit: 3,
            outline: 'String',
        });

        newCourse.save((err) => {

            if (err) {

                db.close();

                console.error("Failed COurse Add");

                throw err;
            }

            console.log('Course Added.');
            db.close();

        });


    });
}

function update() {

    mongoose.connect('mongodb://localhost:27017/S1', function (err, db) {

    if (err) {
        db.close();
        throw err;
    }

    Courses.findOne({name: /CS1/i}).exec((err, course) => {
        
        if (err) throw err;

        Students.find({year: 2021}).exec((err, stds) => {
            for (std of stds){
                Students.findByIdAndUpdate({_id: std._id}, {courses: std.courses.concat(course._id)}, 
                (err) => {
                    if (err) throw err;
                    console.log("Std Updated");
                });
            }        
        });
    });


    });

}


function find() {
    mongoose.connect('mongodb://localhost:27017/S1', function (err, db) {
        if (err) {
            db.close();
            throw err;
        }

        Courses.find({credit: {$gte: 3}, department: /IT/i}).exec((err, courses) => {
            if (err) throw err;

            console.error("Courses with {credit: {$gte: 3}, department: /IT/i}")
            console.log(JSON.stringify(courses));

        });
    });
}

aggregate = async () => {
    
    const res = await Courses.aggregate([ {$match: {}}]);

    return res;

}

mongoose.connect('mongodb://localhost:27017/S1', function (err, db) {

    if (err) {
        db.close();
        throw err;
    }

   
    // 3) Using an aggregate pipeline, write a query to fetch all the courses with students. 

    aggregate().then((res) => {
        console.log('Aggregate Success');
        console.log(JSON.stringify(res));
    }
    ).catch((err) => console.log(err));

});