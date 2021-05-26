import { httpService } from './http.service'
// import { storageService } from './asyncStorageService'
// import userService from './userService'
// import { utilService } from './utilService'

export const reviewService = {
  add,
  query,
  remove
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(toyId) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}`
  return httpService.get(`review`, { _id: toyId })
  // return storageService.query('review')
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
  // return storageService.delete('review', reviewId)
}
async function add(review) {
  console.log('review', review)
  const addedReview = await httpService.post(`review`, review)
  return addedReview
}
