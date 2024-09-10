const express = require('express');
const courseController = require('../Controller/courses.controller');
const router = express.Router();
const verifyToken = require('../middleware/verfiyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');
const { validationSchema } = require('../middleware/validationSchema');

router.route('/')
    .get(verifyToken, courseController.getAllCourses)
    .post(verifyToken, courseController.addCourse)

router.route('/:courseId')
    .get(verifyToken, courseController.getCourse)
    .delete(verifyToken, courseController.deleteCourse)
    .patch(verifyToken , courseController.updateCourse)
    

// .delete(verifyToken, allowedTo(userRoles.ADMIN,userRoles.MANGER), courseController.deleteCourse)




module.exports = router;