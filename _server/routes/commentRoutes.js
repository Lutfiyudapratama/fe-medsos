
const { body } = require("express-validator")
const { authenticateJWT } = require("../middleware/authMiddleware")
const comment_ctrl = require("../controllers/comment_ctrl")
const { post } = require('../models')

module.exports = (app) => {
    const router = app.Router()

    router.post('/create-comment', authenticateJWT, [
        body('content_comment_text').notEmpty(),
        body('post_id').notEmpty(async (value) => {
            let postCheck = await post.findOne({
                where: {
                    id: value
                }
            })

            if (!!postCheck == false) {
                throw new Error('post not is register!');
            }
        })
    ], comment_ctrl.save)

    return router
}