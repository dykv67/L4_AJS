import http from 'node:http';
import https from 'node:https';

import { ENDPOINTS } from './config.js';
import { sortPostsByTitleLengthDesc, sortCommentsByAuthorName } from './transformers.js';
import { printResult, printError } from './logger.js';

function getJson(url, callback) {
  const client = url.startsWith('https:') ? https : http;

  const request = client.get(url, (response) => {
    if (response.statusCode !== 200) {
      response.resume();
      callback(new Error(`GET ${url} — статус ${response.statusCode}`));
      return;
    }

    response.setEncoding('utf8');
    let rawBody = '';
    response.on('data', (chunk) => {
      rawBody += chunk;
    });

    response.on('end', () => {
      let data;
      try {
        data = JSON.parse(rawBody);
      } catch (parseError) {
        callback(parseError);
        return;
      }
      callback(null, data);
    });
  });

  request.on('error', callback);
}

export function getSortedPosts(callback) {
  getJson(ENDPOINTS.posts, (error, posts) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, sortPostsByTitleLengthDesc(posts));
  });
}

export function getSortedComments(callback) {
  getJson(ENDPOINTS.comments, (error, comments) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, sortCommentsByAuthorName(comments));
  });
}

export function runCallbacksDemo(done) {
  getSortedPosts((postsError, posts) => {
    if (postsError) printError('Посты (callbacks)', postsError);
    else printResult('Посты по убыванию длины title (callbacks)', posts);

    getSortedComments((commentsError, comments) => {
      if (commentsError) printError('Комментарии (callbacks)', commentsError);
      else printResult('Комментарии по имени автора (callbacks)', comments);

      done();
    });
  });
}
