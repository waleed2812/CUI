# COMSATS University, Islamabad
# Department of Computer Science
# CSC350 - Topics in Computer Science I (Web Technologies and Programming)
## Assignment 03
## Submitted by: Waleed Butt SP18-BCS-170
### Talha Ejaz SP18-BCS-161
### Wasiq Qamar SP18-BCS-173
### Zainab Gulab SP18-BCS-177

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
Done with Class Except
For A3
app/modules/users/routes/user.routes.js
app.post(version + '/login', usersController.loginUser);
app.get(version + '/logout', usersController.logoutUser);
app.get(version + '/validate', usersController.validateUser);
```
#### Login
```
app/modules/users/controller/user.controller.js
const loginUser = async function(req, res, next) {

    try {
        const username = req.body.username ;
        const password = req.body.password ;

        if (!username || !password) return next({msgCode: 13})

        const query = {$or:[{email: username}, {phoneNumber: username}]};
        
        userAccountModel.findOne(query, function(err, user) {
            if (err) {
                winston.error(err);
                return next({msgCode: 11});
            };

            user.comparePassword(password, function(err, isMatch){
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
    try {
        const username = req.query.username ;

        if (!username) return next({msgCode: 14})

        const query = {$or:[{email: username}, {phoneNumber: username}]};
        
        userAccountModel.findOne(query, function(err, user) {
            if (err) {
                winston.error(err);
                return next({msgCode: 11});
            }
            return res.json({
                status: 0,
                messsage: 'Valid User',
                data:{}
            });   
        });
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }

}
```




#### Errors
```
app/modules/users/errors/user.error.js
{
    "5": {
        "msg": {
            "EN": "Error in Saving New User"
        }
    },
    "6": {
        "msg": {
            "EN": "Error in Data Recieved"
        }
    },
    "7": {
        "msg": {
            "EN": "Failed to Delete User"
        }
    },
    "8": {
        "msg": {
            "EN": "Failed to Update User"
        }
    },
    "9": {
        "msg": {
            "EN": "Failed to Fetch User Details! User Does not Exist"
        }
    },
    "10": {
        "msg": {
            "EN": "Failed to Fetch Users."
        }
    },
    "11": {
        "msg": {
            "EN": "Username Not Found"
        }
    },
    "12": {
        "msg": {
            "EN": "Invalid Password"
        }
    },
    "13": {
        "msg": {
            "EN": "Enter username & password"
        }
    },
    "14": {
        "msg": {
            "EN": "Enter username"
        }
    }
}
```

### Admin Router
```
app.get(version + '/admin', adminController.getAdminDashboard);
app.get(version + '/admin/classes', adminController.getClasses);

app.post(version + '/admin/addteacher', adminController.addTeacher);
app.post(version + '/admin/addstudent', adminController.addStudent);
app.post(version + '/admin/addclass', adminController.addClass);

app.put(version + '/admin/class/:id', adminController.updateClass);
app.put(version + '/admin/assignteacher/:id', adminController.assignTeacher);
app.put(version + '/admin/assignstudent/:id', adminController.assignStudent);

app.delete(version + '/admin/class/:id', adminController.deleteClass);
app.delete(version + '/admin/teacher/:id', adminController.deleteTeacher);
app.delete(version + '/admin/student/:id', adminController.deleteStudent);
```
#### Show Dashboard
```
app/modules/admin/routes/admin.controller.js
const getAdminDashboard= async function (req, res, next){

    const users = await userAccount.find({});
    const classes = await Class.find({});

    if (!users || !classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Data for Admin Dashboard',
        data:{
            users,
            classes
        }
    })
};
```
#### View Class List
```
app/modules/admin/routes/admin.controller.js
// Class List
const getClasses= async function (req, res, next){
    const classes = await Class.find({});

    if (!classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Class Lists Available',
        data:{classes}
    });
};
```
#### Add New Class
```
app/modules/admin/routes/admin.controller.js
const addClass= async function (req, res, next){
    try {
        const course = req.body.course;
        const code = req.body.code;
        const room = req.body.room;

        const options = {
             course,
             code,
             room
        }
        new Class(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 17})
                };

                return res.json({
                    status: 0,
                    messsage: 'Class Added Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 17});
    }
};
```
#### Add New Teacher
```
app/modules/admin/routes/admin.controller.js
// Add New Teacher
const addTeacher= async function (req, res, next){
    try {
        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        const userType = 'teacher';
        const phoneNumber = req.body.phoneNumber;

        const options = {
             name,
             profileImage,
             email,
             password,
             userType,
             phoneNumber

        }
        new userAccount(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 5})
                };

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};
```
#### Add New Student
```
app/modules/admin/routes/admin.controller.js
// Add New Student
const addStudent= async function (req, res, next){
    try {
        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        const userType = 'student';
        const phoneNumber = req.body.phoneNumber;

        const options = {
             name,
             profileImage,
             email,
             password,
             userType,
             phoneNumber

        }
        new userAccount(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 5})
                };

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};
```
#### Modify Class
```
app/modules/admin/routes/admin.controller.js
// Modify Class
const updateClass= async function (req, res, next){
    try {

        const classID = req.params.id || '';

        const classToUpdate = await Class.findOne({_id: classID});

        if (!classToUpdate) {
            const err = next({msgCode: 19})
            winston.error(err);
            return err
        }
        const course = req.body.course || classToUpdate.course;
        const code = req.body.code || classToUpdate.code;
        const room = req.body.room || classToUpdate.room;

        const options = {
             course,
             code,
             room
        }

        Class.findByIdAndUpdate(classID, options, 
            err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 18});
                };

                return res.json({
                    status: 0,
                    messsage: 'Class Updated Successfully',
                    data:{}
                });
            });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 18})
    }
};
```
#### Assign Teacher to Class
```
// Assign Teacher to Class
app/modules/admin/routes/admin.controller.js
const assignTeacher= async function (req, res, next){
    try {

        const teacherID = req.params.id || '';

        const teacherToUpdate = await userAccount.findOne({_id: teacherID});

        if (!teacherToUpdate) {
            const err = next({msgCode: 20})
            winston.error(err);
            return err
        }

        const classID = req.body.classID;

        Class.findByIdAndUpdate(classID, {teacher: teacherToUpdate._id}, 
            err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 21});
                };

                return res.json({
                    status: 0,
                    messsage: 'Teacher Successfully assigned to Class',
                    data:{}
                });
            });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 21})
    }
};
```
#### Add student to Class
```
app/modules/admin/routes/admin.controller.js
// Add student to Class
const assignStudent= async function (req, res, next){
    try {

        const stdID = req.params.id || '';
        console.log('stdID: ', stdID);

        const classID = req.body.classID;
        console.log('classID: ', classID);

        const stdToUpdate = await userAccount.findOne({_id: stdID});
        console.log('stdToUpdate: ', stdToUpdate);

        if(!stdToUpdate) {
            const err = next({msgCode: 21});
            winston.error(err);
            return err;
        }

        Class.findByIdAndUpdate({_id: classID},
            {$push: {students: stdToUpdate._id}}, 
            function(err) {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 21});
                };

                return res.json({
                    status: 0,
                    messsage: 'Student Successfully added to Class',
                    data:{}
                });
            });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 21})
    }
};
```
#### Delete Class
```
app/modules/admin/routes/admin.controller.js
const deleteClass= async function (req, res, next){
    try {

        Class.findOneAndDelete({_id: req.params.id}, function(err){
            if (err) {
                winston.error(err);
                return next({msgCode: 22});
            }

            return res.json({
                status: 0,
                messsage: 'Deleted Successfully',
                data:{}
            });

        });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 22});
    }
};
```
#### Delete Teacher
```
app/modules/admin/routes/admin.controller.js
// Delete Teacher
const deleteTeacher= async function (req, res, next){
    try {

        userAccount.findOneAndDelete({_id: req.params.id}, function(err){
            if (err) {
                winston.error(err);
                return next({msgCode: 22});
            }

            return res.json({
                status: 0,
                messsage: 'Deleted Successfully',
                data:{}
            });

        });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 22});
    }
};
```
#### Delete Student
```
app/modules/admin/routes/admin.controller.js
// Delete Student
const deleteStudent= async function (req, res, next){
    try {

        userAccount.findOneAndDelete({_id: req.params.id}, function(err){
            if (err) {
                winston.error(err);
                return next({msgCode: 22});
            }

            return res.json({
                status: 0,
                messsage: 'Deleted Successfully',
                data:{}
            });

        });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 22});
    }
};
```


### Head Router
```
app/modules/head/routes/head.routes.js
app.get(version + '/head', headController.head);
app.get(version + '/head/class', headController.getClass);
app.get(version + '/head/results/class/:id', headController.resultsClass);
app.get(version + '/head/results/student/:id', headController.resultsStd);
app.get(version + '/head/materials', headController.materials);
app.get(version + '/head/graph', headController.graph);
```
#### Dashboard
```
app/modules/head/controllers/head.controller.js
const head = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'head',
        data: {}
    });
}
```
#### View classes
```
app/modules/head/controllers/head.controller.js
const getClass = async function(req, res, next) {
    const classes = await Class.find({});

    if (!classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Class Lists Available',
        data:{classes}
    });
}
```
#### View Results
```
app/modules/head/controllers/head.controller.js

```
#### View Individual Results
```
app/modules/head/controllers/head.controller.js
```
#### View Material
```
app/modules/head/controllers/head.controller.js
```
#### View Dashboard
```
app/modules/head/controllers/head.controller.js
```
#### View Graph
```
app/modules/head/controllers/head.controller.js
```

### Student Router
```
app.get(version + '/student', studentController.getstudentDashboard);
app.get(version + '/student/attemptquiz', studentController.attemptQuiz);
app.get(version + '/student/viewassignment', studentController.viewAssignment);
app.get(version + '/student/material', studentController.getMaterials);
app.get(version + '/student/material/:id', studentController.getMaterial);
app.get(version + '/student/result', studentController.getResults);
app.get(version + '/student/result/:subid', studentController.getResult);
app.post(version + '/student/viewquiz', studentController.viewQuiz);
app.post(version + '/student/submitassignment', studentController.submitAssignment);
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

