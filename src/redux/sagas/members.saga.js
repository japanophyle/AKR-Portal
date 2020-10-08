import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getActiveUsers(action) {
    console.log(action.payload);

    try {
        let response = yield axios.get(`/api/members/active/${action.payload}`);
        console.log('Active users:', response.data);
        yield put({ type:'SET_ACTIVE_USERS', payload: response.data })
    } catch (error) {
        console.log('error in getActiveUsers():', error);
    }
}

function* getInactiveUsers(action) {
    try {
        let response = yield axios.get(`/api/members/inactive/${action.payload}`);
        console.log('Inactive users:', response.data);
        yield put({ type:'SET_INACTIVE_USERS', payload: response.data })
    } catch (error) {
        console.log('error in getInactiveUsers():', error);
    }
}

// activate user saga
function* activateUser(action) {
    const id = {id : action.payload.user_id}
    console.log(`in activateUser ${action.payload.id}`);
    
    try {
        yield axios.put('/api/members/activate', id)
        //reset dojo list view
        yield put({type: 'GET_ACTIVE_USERS', payload: action.payload.dojo_id});
        yield put({type: 'GET_INACTIVE_USERS', payload: action.payload.dojo_id});
    } catch (err) {
        console.log('error in activateUser', err)
    }
};

//deactivate user saga
function* deactivateUser(action) {
    const id = {id : action.payload.user_id}
    console.log(`in activateUser ${id}`);
    
    try {
        yield axios.put('/api/members/deactivate', id)
        //reset dojo view
        yield put({type: 'GET_ACTIVE_USERS', payload: action.payload.dojo_id});
        yield put({type: 'GET_INACTIVE_USERS', payload: action.payload.dojo_id});
    } catch (err) {
        console.log('error in activateUser', err)
    }
};

function* membersSaga() {
    yield takeLatest('GET_ACTIVE_USERS', getActiveUsers);
    yield takeLatest('GET_INACTIVE_USERS', getInactiveUsers);
    yield takeLatest('ACTIVATE_USER', activateUser); 
    yield takeLatest('DEACTIVATE_USER', deactivateUser);
}

export default membersSaga;