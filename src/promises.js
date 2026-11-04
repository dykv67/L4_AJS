import { ENDPOINTS } from './config.js';
import { simplifyUsers, filterIncompleteTodos } from './transformers.js';
import { printResult, printError } from './logger.js';

function getJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`GET ${url} — статус ${response.status}`);
    }
    return response.json();
  });
}

export function getShortUsers() {
  return getJson(ENDPOINTS.users).then(simplifyUsers);
}

export function getIncompleteTodos() {
  return getJson(ENDPOINTS.todos).then(filterIncompleteTodos);
}

export function runPromisesDemo() {
  return getShortUsers()
    .then((users) => printResult('Пользователи, только нужные поля (promises)', users))
    .catch((error) => printError('Пользователи (promises)', error))
    .then(() => getIncompleteTodos())
    .then((todos) => printResult('Невыполненные задачи (promises)', todos))
    .catch((error) => printError('Задачи (promises)', error));
}
