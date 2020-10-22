import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* search( action ) {

    try {
        const results = yield axios.get(`/api/members/search/${action.payload}`)
        yield put({
            type: 'SET_ACTIVE_USERS', payload: results.data
        })

    } catch (error) {
        console.log('member search request failed', error);
    }

}


function* searchSaga() {
    yield takeLatest('SEARCH', search);
  }
  
  export default searchSaga;