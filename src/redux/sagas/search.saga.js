import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/* let apiKey = process.env.REACT_APP_BGA_CLIENT_ID

function* searchApi(action){
    try {

        let response = yield axios
            .get(`
                https://api.boardgameatlas.com/api/search?name=${action.payload}&limit=4&fuzzy_match=true&client_id=${apiKey}`
            )

        yield put({ type: 'SET_API_SEARCH', payload: response.data.games })


    } catch (error) {
        console.log('Error with API search:', error);
      }
}
 */

function* search( action ) {

    // console.log('searching for: ', action.payload)
    try {
        const results = yield axios.get(`/api/members/search/${action.payload}`)
        console.log('we got', results.data);
        yield put({
            type: 'SET_ACTIVE_USERS', payload: results.data
        })
        // set the national members list
        // yield put({type: 'SET_GAME_SEARCH', payload: results.data})
    
    } catch (error) {
        console.log('member search request failed', error);
    }

}

//THIS WAS USED TO CACHE DATABASE
// function* updateDB() {
//     let response = yield axios
//     .get(`
//         https://api.boardgameatlas.com/api/search?limit=100&client_id=${apiKey}&order_by=popularity&`
//     )
//     .catch(error => {
//         console.log(error);
//     })

//     yield axios.post('/api/games/updateDatabase', response.data);
// }

function* searchSaga() {
    yield takeLatest('SEARCH', search);
  }
  
  export default searchSaga;