// https://github.com/diegohaz/arc/wiki/API-service
import 'whatwg-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl } from 'config';

const api = {};

export const checkStatus = (response, endpoint, settings) => {
  if (response.status === 400 || response.status === 401) {
    localStorage.removeItem('token');
    const requestObj = {
      endpoint,
      settings
    };

    return api.request('/unchained/cms/auth/login', { method: 'get' }).then((r) => {
      return r.json().then((resp) => {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
        }
        const {
          endpoint,
          settings
        } = requestObj;

        return api.post(endpoint, null, { ...settings });
      });
    });
  }
  return response;
};

export const parseSettings = ({ method = 'get', data, locale, ...otherSettings } = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  const settings = {
    body: data ? JSON.stringify(data) : undefined,
    method,
    headers,
    ...otherSettings,
  };

  const token = localStorage.getItem('token');

  if (token) {
    settings.headers = {
      ...settings.headers,
      Authorization: `JWT ${token}`,
    };
  }

  return settings;
};

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : '';

  return `${url}${querystring}`;
};

api.request = (endpoint, { params, ...settings } = {}) =>
  fetch(parseEndpoint(endpoint, params), parseSettings(settings))
  .then((response) => checkStatus(response, endpoint, settings));

['delete', 'get'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings });
});

['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `JWT ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'get', ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },
});

export default api;
