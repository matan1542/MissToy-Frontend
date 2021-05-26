
import { httpService } from './http.service.js'

export const toyService = {
    query,
    getById,
    save,
    remove,
}


function query(filterBy) {
    return httpService.get('toy', filterBy);

}
function getById(toyId) {
    return httpService.get(`toy/${toyId}`);
}

// function getByIdFromUrl() {
//     return axios.get(`${BASE_URL}/:toyId`)
//     .then(res => res.data)
//     .catch(err => console.log(err))
// }
function remove(toyId) {
    console.log(toyId);
    return httpService.delete(`toy/${toyId}`);
}
function save(toy) {
    console.log('toy from service', toy)
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy);
    } else {
        return httpService.post(`toy`, toy);
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 500}).then(x => console.log(x))


