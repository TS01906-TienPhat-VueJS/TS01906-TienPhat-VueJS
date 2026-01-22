const KEY_USERS = 'sof308_users'
const KEY_SESSION = 'sof308_session'
const KEY_POSTS = 'sof308_posts'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers() {
  return readJSON(KEY_USERS, [])
}
export function setUsers(users) {
  writeJSON(KEY_USERS, users)
}

export function getSession() {
  return readJSON(KEY_SESSION, null)
}
export function setSession(session) {
  writeJSON(KEY_SESSION, session)
}
export function clearSession() {
  localStorage.removeItem(KEY_SESSION)
}

export function getPosts() {
  return readJSON(KEY_POSTS, [])
}
export function setPosts(posts) {
  writeJSON(KEY_POSTS, posts)
}

export function emitSessionChanged() {
  window.dispatchEvent(new Event('session-changed'))
}
