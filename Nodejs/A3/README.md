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
app.post(version + '/user/login', usersController.loginUser);
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
#### Validate
```
Done With Getting User Detail
```

### Admin Router
```
app/modules/admin/routes/admin.routes.js
// Dashboard
app.get(version + '/admin', adminController.getAdminDashboard);
// Class List
app.get(version + '/admin/classes', adminController.getClasses);
// Add New Class
app.post(version + '/admin/add/class', adminController.addClass);
// Add New Teacher
app.post(version + '/admin/add/teacher', adminController.addTeacher);
// Add New Student
app.post(version + '/admin/add/student', adminController.addStudent);
// Assign Teacher to Class
app.post(version + '/admin/assign/teacher', adminController.assignTeacher);
// Add student to Class
app.post(version + '/admin/assign/student', adminController.assignStudent);
// Modify Class
app.post(version + '/admin/update/class', adminController.updateClass);
// Delete Class
app.delete(version + '/admin/class', adminController.deleteClass);
// Delete Teacher
app.delete(version + '/admin/teacher', adminController.deleteTeacher);
// Delete Student
app.delete(version + '/admin/student', adminController.deleteStudent);
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