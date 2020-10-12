import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets all dojos
function* getDojos() {
    try {
        let response = yield axios.get('/api/dojos')
        console.log('Dojos:', response.data);
        yield put({type:'SET_DOJOS', payload: response.data});
    } catch (error) {
        console.log('error in getDojos', error)
    }
}

// Adds a dojo
function* addDojo(action) {
    try {
        yield axios.post('/api/dojos', action.payload )
        yield put({ type: 'GET_DOJOS' })
    } catch (error) {
        console.log('error in addDojo', error);
    }
}

// Removes a dojo
function* removeDojo(action) {
    try {
        yield axios.delete(`/api/dojos/${action.payload}`)
        yield put({ type: 'GET_DOJOS' })
    } catch (error) {
        console.log('error in removeDojo', error);
    }
}

//Set dues for the dojo saga
function* setDojoDues(action) {
    const dojo_id = action.payload.dojo_id
    try {
        yield axios.put(`/api/dojos/dues`, action.payload)

        // reset the views of the dojo to show new dues
        // yield put({type: 'GET_ACTIVE_USERS', payload: action.payload.dojo_id});
        // yield put({type: 'GET_INACTIVE_USERS', payload: action.payload.dojo_id});
    } catch (err) {
        console.log('Error in setDojoDues saga', err);
    }
}

function* dojosSaga() {
    yield takeLatest('GET_DOJOS', getDojos);
    yield takeLatest('ADD_DOJO', addDojo);
    yield takeLatest('REMOVE_DOJO', removeDojo);
    yield takeLatest('SET_DOJO_DUES', setDojoDues);
}

export default dojosSaga;