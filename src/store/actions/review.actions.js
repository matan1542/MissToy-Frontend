import { reviewService } from '../../services/review.service'


export function loadReviews(toyId) {
  console.log('loading reviews...')
  return async dispatch => {
    try {
      const reviews = await reviewService.query(toyId)
      dispatch({ type: 'SET_REVIEWS', reviews })

    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
  }
}

export function addReview(review) {
  return async dispatch => {
    try {
      const addedReview = await reviewService.add(review)
      console.log(addedReview)
      dispatch({ type: 'ADD_REVIEW', review: addedReview })
      return addedReview
    } catch (err) {
      console.log('ReviewActions: err in addReview', err)
    }
  }
}

export function removeReview(reviewId) {
  return async dispatch => {
    try {
      await reviewService.remove(reviewId)
      dispatch({ type: 'REMOVE_REVIEW', reviewId })
    } catch (err) {
      console.log('ReviewActions: err in removeReview', err)
    }
  }
}
