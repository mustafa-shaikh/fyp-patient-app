import {BehaviorSubject} from 'rxjs';
import {apiUrl, boxToken, boxUrl} from '../../config';
import {fetchWrapper} from '../_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${apiUrl}/client`;

export const accountService = {
  signIn,
  refreshToken,
  signOut,
  forgotPassword,
  resetPassword,
  updateProfile, //modift
  createCase,

  getAllLawyers,
  getAllClients,
  getAllCases,

  getLawyerById,
  getClientById,
  getCaseById,

  updateLawyer,
  updateClient,
  updateCase,

  register, //not needed
  verifyEmail, // not needed
  validateResetToken, //not needed
  getById, //not needed
  create, //not needed
  getAll, //not needed
  delete: _delete, //not needed
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function signIn(email, password) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, {email, password})
    .then(user => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    });
}

function signOut() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  return fetchWrapper.post(`${baseUrl}/revoke-token`, {});
  stopRefreshTokenTimer();
  userSubject.next(null);
}

function refreshToken() {
  return fetchWrapper.post(`${baseUrl}/refresh-token`, {}).then(user => {
    if (user.isVerified) {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      return user;
    } else {
      userSubject.next(user);
      return user;
    }
  });
}

function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

function createCase(params) {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  return fetchWrapper.post(`${baseUrl}/create-case`, params);
}

function verifyEmail(pin, email) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, {pin, email});
}

function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, {email});
}

function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, {token});
}

function resetPassword({token, password, confirmPassword}) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function getAll() {
  return fetchWrapper.get(`${baseUrl}/`);
}

function getAllLawyers() {
  return fetchWrapper.get(`${baseUrl}/lawyers`);
}

function getAllClients() {
  return fetchWrapper.get(`${baseUrl}/clients`);
}

function getAllCases(id) {
  return fetchWrapper.get(`${baseUrl}/cases/${id}`);
}

function getLawyerById(id) {
  return fetchWrapper.get(`${baseUrl}/lawyer/${id}`);
}

function getClientById(id) {
  return fetchWrapper.get(`${baseUrl}/client/${id}`);
}

function getCaseById(id) {
  return fetchWrapper.get(`${baseUrl}/case/${id}`);
}
function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function updateProfile(params) {
  return fetchWrapper.put(`${baseUrl}/${params.id}`, params).then(user => {
    // update stored user if the logged in user updated their own record
    if (user.id === userSubject.value.id) {
      // publish updated user to subscribers
      user = {...userSubject.value, ...user};
      userSubject.next(user);
    }
    return user;
  });
}

function uploadToDrive(params) {
  const data = {
    path: params,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${boxToken}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(`${boxUrl}/files/upload`, requestOptions).then(respons => {
    return respons.text().then(text => {
      const data = text && JSON.parse(text);
      return data.link;
    });
  });
}

function updateLawyer(id, params) {
  return fetchWrapper.put(`${baseUrl}/lawyer/${id}`, params).then(user => {
    return user;
  });
}

function updateClient(id, params) {
  return fetchWrapper.put(`${baseUrl}/client/${id}`, params).then(user => {
    return user;
  });
}

function updateCase(id, params) {
  return fetchWrapper.put(`${baseUrl}/update-case/${id}`, params).then(user => {
    return user;
  });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then(x => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
