import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Gets ranks for logged in user
function* getRanks() {
    try {
        let response = yield axios.get('/api/ranks')
        console.log('Ranks:', response.data);
        yield put({type:'SET_RANKS', payload: response.data});
    } catch (error) {
        console.log('error in getRanks', error)
    }
}

// Adds a rank to the ranks table
function* addRank(action) {
    try {
        yield axios.post('/api/ranks', action.payload )
        yield put({ type: 'GET_RANKS' })
    } catch (error) {
        console.log('error in addRank', error);
    }
}

// Removes a rank from the ranks table
function* removeRank(action) {
    try {
        yield axios.delete(`/api/ranks/${action.payload}`)
        yield put({ type: 'GET_RANKS' })
    } catch (error) {
        console.log('error in removeRank', error);
    }
}

function* ranksSaga() {
    yield takeLatest('GET_RANKS', getRanks);
    yield takeLatest('ADD_RANK', addRank);
    yield takeLatest('REMOVE_RANK', removeRank);
}

export default ranksSaga;