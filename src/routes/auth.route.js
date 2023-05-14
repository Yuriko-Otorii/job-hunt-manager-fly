const router = require('express').Router()

const {
  getSignupPage,
  getLoginPage,
  postSignupInfo,
  postLoginInfo,
  postDeleteCookie,
} = require('../controller/user.controller')

router.get('/', getLoginPage)
router.post('/validate', postLoginInfo)

router.get('/signup', getSignupPage)
router.post('/signup/create', postSignupInfo)


router.post('/deleteCookie', postDeleteCookie)


module.exports = router
