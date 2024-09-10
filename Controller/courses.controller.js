// const mongoose = require('mongoose');
const asyncWarraper = require('../middleware/asyncWarraper');
const Course = require('../models/course.model');



const getAllCourses = asyncWarraper(async (req, res, next) => {
    const query = req.query;
    const limit = parseInt(query.limit) || 4;  // Limite par défaut : 4 cours par page
    const page = parseInt(query.page) || 1;    // Page par défaut : 1
    const skip = (page - 1) * limit;           // Calcul de l'offset pour la pagination

    try {
        // Compte total des cours pour calculer le nombre de pages
        const totalCourses = await Course.countDocuments();
        const totalPages = Math.ceil(totalCourses / limit);

        // Récupérer les cours avec pagination
        const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);

        res.json({
            status: "success",
            data: {
                courses: courses,
                totalPages: totalPages,
                currentPage: page,           // Page actuelle
                totalCourses: totalCourses    // Total des cours
            }
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

const getCourse = asyncWarraper(  async (req,res)=>{
    
    const course = await Course.findById(req.params.courseId);
    res.json({status : "seccess" , data : {course}});

});

const addCourse = asyncWarraper(  async (req, res)=>{
    const {title, price} = req.body;
    const newCourse = new Course({title, price});
    await newCourse.save();

    const courses = await Course.find();
    res.json({status : "seccess" , data : {courses}})

});

const updateCourse = asyncWarraper(  async (req,res)=>{
    const courseId = req.params.courseId;
    await Course.findByIdAndUpdate(courseId , {$set : {...req.body}});
    
    const courses = await Course.find();
    res.json({status : "seccess" , data : {courses}})

});


const deleteCourse = asyncWarraper(   async (req,res)=>{
    const courseId = req.params.courseId;
    await Course.deleteOne({_id: courseId});

    const courses = await Course.find();
    res.json({status : "seccess" , data : {courses}})


});



module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
};