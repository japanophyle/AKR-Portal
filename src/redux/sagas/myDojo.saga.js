import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets just the names and ranks of all members
// of the current user's dojo
function* getMyDojo() {
    try {
        let response = yield axios.get('/api/members/mydojo')
        console.log('My Dojo:', response.data);
        yield put({ type:'SET_MY_DOJO', payload: response.data });
    } catch (error) {
        console.log('error in getMyDojo()', error);
    }
}

function* myDojoSaga() {
    yield takeLatest('GET_MY_DOJO', getMyDojo);
}

export default myDojoSaga;