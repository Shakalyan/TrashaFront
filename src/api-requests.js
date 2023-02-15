import { backendHost, sendQuery, sendJSONQuery } from './api-utils.js';

function getToken() {
    return localStorage.getItem('token');
}

function getUrl(endpoint) {
    return backendHost + endpoint;
}

export function translateWord(body) {
    return sendJSONQuery(getUrl("/translate"), "POST", body, getToken());
}

export function getUserDictionaries() {
    return sendQuery(getUrl("/dictionaries"), "GET", getToken());
}

export function createNewDictionary(request) {
    return sendJSONQuery(getUrl("/dictionaries"), "POST", request, getToken());
}

export function deleteDictionary(dictionaryId) {
    return sendQuery(getUrl(`/dictionaries?id=${dictionaryId}`), "DELETE", getToken());
}

export function getTranslationsFromDictionary(dictionaryId) {
    return sendQuery(getUrl(`/translations?id=${dictionaryId}`), "GET", getToken());
}

export function addNewTranslationToDictionary(request) {
    return sendJSONQuery(getUrl("/translations"), "POST", request, getToken());
}

export function deleteTranslationFromDictionary(translationId) {
    return sendQuery(getUrl(`/translations?id=${translationId}`), "DELETE", getToken());
}

export function authenticate(request) {
    return sendJSONQuery(getUrl('/authenticate'), "POST", request, '');
}

export function register(request) {
    return sendJSONQuery(getUrl('/registration'), "POST", request, '');
}