/* const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("title is required")
            .isLength({min: 3})
            .withMessage("title at least is 3 digits"),
        body('price')
            .notEmpty()
            .withMessage("price is required")
    
    ]
}

module.exports = {
    validationSchema
} */