import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getActiveUsers() {
    try {
        let response = yield axios.get('/api/members/active');
        console.log('Active users:', response.data);
        yield put({ type:'SET_ACTIVE_USERS' })
    } catch (error) {
        console.log('error in getActiveUsers():', error);
    }
}

function* getInactiveUsers() {
    try {
        let response = yield axios.get('/api/members/inactive');
        console.log('Inactive users:', response.data);
        yield put({ type:'SET_INACTIVE_USERS' })
    } catch (error) {
        console.log('error in getInactiveUsers():', error);
    }
}

function* membersSaga() {
    yield takeLatest('GET_ACTIVE_USERS', getActiveUsers);
    yield takeLatest('GET_INACTIVE_USERS', getInactiveUsers);
}

export default membersSaga;