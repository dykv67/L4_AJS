 export const BASE_URL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

   export const ENDPOINTS = Object.freeze({
     posts: `${BASE_URL}/posts`,
     comments: `${BASE_URL}/comments`,
     users: `${BASE_URL}/users`,
     todos: `${BASE_URL}/todos`,
   });
