import { ENDPOINTS } from './config.js';
import {
  sortPostsByTitleLengthDesc,
  sortCommentsByAuthorName,
  simplifyUsers,
  filterIncompleteTodos,
} from './transformers.js';
import { printResult, printError } from './logger.js';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} — статус ${response.status}`);
  }
  return response.json();
}

export async function getSortedPosts() {
  const posts = await getJson(ENDPOINTS.posts);
  return sortPostsByTitleLengthDesc(posts);
}

export async function getSortedComments() {
  const comments = await getJson(ENDPOINTS.comments);
  return sortCommentsByAuthorName(comments);
}

export async function getShortUsers() {
  const users = await getJson(ENDPOINTS.users);
  return simplifyUsers(users);
}

export async function getIncompleteTodos() {
  const todos = await getJson(ENDPOINTS.todos);
  return filterIncompleteTodos(todos);
}

const TASKS = [
  { title: 'Посты по убыванию длины title (async/await)', run: getSortedPosts },
  { title: 'Комментарии по имени автора (async/await)', run: getSortedComments },
  { title: 'Пользователи, только нужные поля (async/await)', run: getShortUsers },
  { title: 'Невыполненные задачи (async/await)', run: getIncompleteTodos },
];

export async function runAsyncAwaitDemo() {
  const results = await Promise.allSettled(TASKS.map((task) => task.run()));

  results.forEach((result, index) => {
    const { title } = TASKS[index];
    if (result.status === 'fulfilled') printResult(title, result.value);
    else printError(title, result.reason);
  });
}
