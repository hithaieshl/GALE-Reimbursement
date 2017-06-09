import {
  get,
  post,
  del,
} from './utils';

export function getLocalToken() {
  return localStorage.getItem('token');
}

export function setLocalToken(token) {
  localStorage.setItem('token', token);
}

export function removeLocalToken() {
  localStorage.removeItem('token');
}

export async function getGuestTokenAPI() {
  return get('/unchained/cms/auth/login');
}

export async function verifyTokenAPI() {
  return get('/unchained/cms/auth/verify');
}

export async function registerUserAPI(data) {
  return post('/unchained/cms/auth/signup', data);
}

export async function loginUserAPI(data) {
  return post('/unchained/cms/auth/login', data);
}

export async function forgotPasswordAPI(data) {
  return post('/unchained/cms/auth/password/forgot/', data);
}

export async function customerInformationAPI(data) {
  return get('/unchained/cms/auth/profile', data);
}

export async function userLogout() {
  return del('/unchained/cms/auth/logout/', { });
}
