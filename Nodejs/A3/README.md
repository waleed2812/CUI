<h1 style='text-align: center'> COMSATS University, Islamabad </h1>
<h1 style='text-align: center'> Department of Computer Science </h1>
<h1 style='text-align: center'> CSC350 - Topics in Computer Science I (Web Technologies and Programming) </h1>
<h2 style='text-align: center'> Assignment 03 </h2>
<h2 style='text-align: center'> Submitted by: Waleed Butt SP18-BCS-170 </h2>

### Question CLO-3
Assignment You have to implement the LMS CaseStudy Module and Write the API with Express, and Mongoose

### Solution
### Index Router
```
Done With Class
```
#### Display Index page
```
Done in Class
```
#### Display Error Page
```
Done in Class
```

### User Router
```
Done with Class
For A3
app/modules/users/routes/user.routes.js
app.post(version + '/login', usersController.loginUser);
app.get(version + '/logout', usersController.logoutUser);
app.get(version + '/validate', usersController.validateUser);
```
#### Login
```
app/modules/users/controller/user.controller.js
const loginUser = async (req, res, next) => {

    try {
        const username = req.body.username ;
        const password = req.body.password ;

        if (!username || !password) return next({msgCode: 13})

        const query = {$or:[{email: username}, {phoneNumber: username}]};
        
        userAccountModel.find(query, function(err, users) {
            if (err || users.length === 0) {
                winston.error(err);
                return next({msgCode: 11});
            };
            
            bcrypt.compare(password, users[0].password, function(err, isMatch) {
                if (err || !isMatch){
                    winston.error(err);
                    next({msgCode: 12});
                }

                return res.json({
                    status: 0,
                    messsage: 'Password Matched',
                    data:{}
                });
            });  
        });
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};
```
#### Logout
```
app/modules/users/controller/user.controller.js
const logoutUser = async function(req, res, next) {
    return res.json({
        status: 0,
        messsage: 'Logout',
        data:{}
    })

} 
```
#### Validate
```
app/modules/users/controller/user.controller.js
const validateUser = async function(req, res, next) {
    return res.json({
        status: 0,
        messsage: 'Validate',
        data:{}
    })

}
```

### Admin Router
```
app/modules/admin/routes/admin.routes.js
app.get(version + '/admin', adminController.getAdminDashboard);
app.get(version + '/classes', adminController.getClasses);

app.post(version + '/addteacher', adminController.addTeacher);
app.post(version + '/addstudent', adminController.addStudent);
app.post(version + '/addclass', adminController.addClass);

app.put(version + '/class/:id', adminController.updateClass);
app.put(version + '/assignteacher/:id', adminController.assignTeacher);
app.put(version + '/assignstudent/:id', adminController.assignStudent);

app.delete(version + '/class/:id', adminController.deleteClass);
app.delete(version + '/teacher/:id', adminController.deleteTeacher);
app.delete(version + '/student/:id', adminController.deleteStudent);
```
#### Show Dashboard
```
```
#### View Class List
```
```
#### Add New Class
```
```
#### Add New Teacher
```
```
#### Add New Student
```
```
#### Assign Teacher to Class
```
```
#### Add student to Class
```
```
#### Modify Class
```
```
#### Delete Class
```
```
#### Delete Teacher
```
```
#### Delete Student
```
```

### Student Router
```
app/modules/student/routes/student.routes.js
app.get(version + '/student', studentController.getstudentDashboard);
app.get(version + '/attemptquiz', studentController.attemptQuiz);
app.get(version + '/viewassignment', studentController.viewAssignment);
app.get(version + '/material', studentController.getMaterials);
app.get(version + '/material/:id', studentController.getMaterial);
app.get(version + '/result', studentController.getResults);
app.get(version + '/result/:subid', studentController.getResult);

app.post(version + '/viewquiz', studentController.viewQuiz);
app.post(version + '/submitassignment', studentController.submitAssignment);
```
#### View Quiz
```
```
#### Attempt Quiz
```
```
#### View Assignment
```
```
#### Submit assignment
```
```
#### View Material
```
```
#### Download Material
```
```
#### View Grade
```
```
#### View Dashboard
```
```
#### View Result
```
```

### Teacher Router
```
app/modules/teacher/routes/teacher.routes.js
app.get(version + '/teacher', teacherController.teacher);
app.get(version + '/teacher/viewattquiz', teacherController.viewattquiz);
app.get(version + '/teacher/quiz/:id', teacherController.quiz);
app.get(version + '/teacher/viewattassign', teacherController.viewattassign);
app.get(version + '/teacher/assign/:id', teacherController.assignment);
app.get(version + '/teacher/materials', teacherController.materials);
app.post(version + '/teacher/addquiz', teacherController.addquiz);
app.post(version + '/teacher/addassign', teacherController.addassign);
app.post(version + '/teacher/addmat', teacherController.addmat);
app.post(version + '/teacher/addmarks', teacherController.addmarks);
app.put(version + '/teacher/marks/:id', teacherController.marks);
app.delete(version + '/teacher/quiz/:id', teacherController.deleteQuiz);
app.delete(version + '/teacher/assignment/:id', teacherController.deleteAssignment);
app.delete(version + '/teacher/material/:id', teacherController.deleteMaterial);
app.delete(version + '/teacher/marks/:id', teacherController.deleteMarks);
```
#### View Dashboard
```
```
#### Add Quiz
```
```
#### View attempted Quizzes
```
``` 
#### Download attempted Quizzes
```
``` 
#### Add Assignment
```
```
#### View submitted Assignment
```
``` 
#### Download Submitted assignment
```
``` 
#### Add Material
```
```
#### View Materials
```
```
#### Delete Material
```
```
#### Add Marks
```
```
#### Delete Marks
```
```
#### Update Marks
```
```
#### Delete Quiz
```
```
#### Delete Assignment
```
```
### Head Router
#### View classes
```
```
#### View Results
```
```
#### View Individual Results
```
```
#### View Material
```
```
#### View Dashboard
```
```
#### View Graph
```
```