import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets all admins
function* dojoTransfer(action) {
    try {
        let response = yield axios.put('/api/dojotransfer', action.payload)

        yield put({type:'SET_ADMINS', payload: response.data});
        yield put({ type: 'FETCH_USER_INFO', payload: action.payload.params })

    } catch (error) {
        console.log('error in getAdmins', error)
    }
}


function* adminsSaga() {
    yield takeLatest('DOJO_TRANSFER', dojoTransfer);
}

export default adminsSaga;