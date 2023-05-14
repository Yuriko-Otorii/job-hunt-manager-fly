const router = require('express').Router()

const { getCreatePostPage, getEditShareStatusPage } = require('../controller/home.controller')
const { postShareStatus, getAllSharePosts, updateShareStatus, deleteSharePost, postComment, deleteComment } = require('../controller/sharePost.controller') 
const { handleLikeAction } = require('../controller/likePost.controller') 

router.get('/', getAllSharePosts)
router.get('/create', getCreatePostPage)
router.post('/post', postShareStatus)
router.post('/likepost', handleLikeAction)
router.post('/postcomment', postComment)
router.delete('/postcomment/delete', deleteComment)
router.get('/:postId/edit', getEditShareStatusPage)
router.put('/:postId/update', updateShareStatus)
router.delete('/:postId/delete', deleteSharePost)

module.exports = router
