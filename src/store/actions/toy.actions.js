import { toyService } from '../../services/toy.service.js'

export function loadToys(filterBy = { name: '', type: 'all', inStock: 'all' }) { // Action Creator
    return async dispatch => {
        try {
            const toys = await toyService.query(filterBy)
            const action = {
                type: 'SET_TOYS',
                toys
            }
            dispatch(action);
        } catch (err) {
            console.log('Error toyActions in loadToys :', err);
        }


    }
}

export function setToys(toys) {
    return dispatch => {
        const action = {
            type: 'SET_TOYS',
            toys
        }
        dispatch(action);
    }
}


export function removeToy(toyId) { // Action Creator
    console.log(toyId)
    return async dispatch => {
        try {
            await toyService.remove(toyId)
            const action = {
                type: 'REMOVE_TOY',
                toyId
            }
            dispatch(action)
        } catch (err) {
            console.log('Error on toyActions in remove :', err);
        }

    }
}

export function setSelectedToy(toy) {
    console.log('setSelected', toy)
    return dispatch => {
        const action = {
            type: 'SET_SELECTED_TOY',
            toy
        }
        dispatch(action)
    }
}

export function saveToy(toy) { // Action Creator
    return async dispatch => {
        try {
            const savedToy = await toyService.save(toy)
            const action = {
                type: 'ADD_TOY',
                toy: savedToy
            }
            dispatch(action)
        } catch (err) {
            console.log('Error in toyActions on save :', err);
        }
    }
}
export function setFilterBy(filterBy) {
    return dispatch => {
        const action = {
            type: 'SET_FILTER_BY',
            filterBy
        }
        dispatch(action)
    }
}

export function updateToy(toy) { // Action Creator
    return async dispatch => {
        try {
            const savedToy = await toyService.save(toy)
            const action = {
                type: 'UPDATE_TOY',
                toy: savedToy.updateToy,
                idx: savedToy.idx
            }
            dispatch(action)
        } catch (err) {
            console.log('Error in toyActions on update :', err);
        }
    }
}