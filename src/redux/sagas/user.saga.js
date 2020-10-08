import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Saga for retrieving all of the current user's personal info
// and storing it in a reducer
function* fetchUserInfo() {
  try {
    // setting our response to what 
    const response = yield axios.get('/api/user/profile')
    console.log('response from get info:', response.data);
    yield put({ type: 'SET_USER_INFO', payload: response.data });

    //store same data in a edit reducer for the userinfo edits
    yield put({ type: 'SET_EDIT_USER_INFO', payload: response.data });


  } catch (error) {
    console.log('User info get request failed', error);
  }
}

// Saga for posting a new user's info to DB
function* createUser(action) {
  try {
    console.log('posting new student: ', action.payload);
    yield axios.post('/api/user/profile', action.payload)
  } catch (error) {
    console.log('User post request failed', error);
  }
}

// saga listens for then a put request should be done for user_data
function* updateUserData(action) {
  try {
    console.log('updating user_data: ', action.payload);
    // PUT request for the edit changes 
    yield axios.put('/api/user/edit', action.payload)
    //GET the new data that data! 
    yield put({ type: 'FETCH_USER_INFO' })
  } catch (error) {
    console.log('User_data PUT request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_USER_INFO', fetchUserInfo);
  yield takeLatest('CREATE_USER', createUser);
  yield takeLatest('UPDATE_USER_DATA', updateUserData)

}

export default userSaga;
