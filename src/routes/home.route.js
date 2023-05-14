const router = require('express').Router()
const {
  getDetailPage,
  getNewListPage,
  postNewList,
  getEditPage,
  deleteList,
  updateList,
  updateFavorite,
  getCompanyListPage,
  getMyPage
} = require('../controller/home.controller')

const { postUpdateUsername } = require('../controller/user.controller')


router.get('/', getCompanyListPage)
router.put('/favupdate', updateFavorite)

router.get('/mypage', getMyPage)
router.post('/editUsername', postUpdateUsername)

router.get('/newlist', getNewListPage)
router.post('/createlist', postNewList)

router.get("/:listId", getDetailPage)

router.get('/:listId/edit', getEditPage)
router.put('/:listId/update', updateList)

router.delete('/:listId/delete', deleteList)



module.exports = router


