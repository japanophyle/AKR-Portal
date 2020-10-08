import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets all admins
function* getAdmins() {
    try {
        let response = yield axios.get('/api/admins')
        console.log('Admins:', response.data);
        yield put({type:'SET_ADMINS', payload: response.data});
    } catch (error) {
        console.log('error in getAdmins', error)
    }
}


function* adminsSaga() {
    yield takeLatest('GET_ADMINS', getAdmins);
}

export default adminsSaga;