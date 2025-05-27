const { body } = require('express-validator')
const auth_ctrl = require('../controllers/auth_ctrl')
const { major, user } = require('../models')
const bcryptjs = require('bcryptjs')
const { authenticateJWT } = require('../middleware/authMiddleware')

module.exports = (app) => {
    const router = app.Router()
    router.get('/me', authenticateJWT, (req, res) => {
        res.status(200).json({ message: "token is valid", user: req.user });
    })

    router.post('/login', [
        body('username').isLength({ min: 6, max: 20 }).isString().notEmpty().custom(async (value) => {
            let userNameCheck = await user.findOne({
                where: {
                    username: value
                }
            })

            if (!!userNameCheck == false) {
                throw new Error('username not register!');
            }
        }),
        body('password').isLength({ min: 6, max: 100 }).isString().notEmpty()
    ], auth_ctrl.login)

    router.post('/register', [
        body('username').isLength({ min: 6, max: 20 }).isString().notEmpty().custom(async (value) => {
            let userNameCheck = await user.findOne({
                where: {
                    username: value
                }
            })

            if (userNameCheck) {
                throw new Error('username has been registered!');
            }
        }),
        body('email').isEmail().isString().custom(async (value) => {
            let emailCheck = await user.findOne({
                where: {
                    email: value
                }
            })

            if (!!emailCheck) {
                throw new Error('Email has been registered!');
            }
        }).notEmpty(),
        body('password').isLength({ min: 6, max: 100 }).isString().notEmpty(),
        body('firstName').isString().notEmpty(),
        body('lastName').isString().notEmpty(),
        body('classes').isString().notEmpty().custom(async (value) => {
            const classValue = ["X", "XI", "XII", "XII"]
            const isValid = classValue.includes(value)

            if (!isValid) {
                throw new Error('classes is not registered!');
            }
        }),
        body('gender').isString().notEmpty().custom(async (value) => {
            const genderVal = ["M", "F"]
            const isValid = await genderVal.includes(value)

            if (!isValid) {
                throw new Error('gender is not registered!');
            }
        }),
        body('major_id').notEmpty().custom(async (value) => {
            const majorValue = await major.findByPk(value)
            if (!!majorValue == false) {
                throw new Error('major id is not registered!');
            }
        }),
    ], auth_ctrl.save)

    return router
}