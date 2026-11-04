export function sortPostsByTitleLengthDesc(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

export function sortCommentsByAuthorName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}

export function pickUserFields({ id, name, username, email, phone }) {
  return { id, name, username, email, phone };
}

export function simplifyUsers(users) {
  return users.map(pickUserFields);
}

export function filterIncompleteTodos(todos) {
  return todos.filter((todo) => !todo.completed);
}
