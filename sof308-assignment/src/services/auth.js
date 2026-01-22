import { getUsers, setUsers, getSession, setSession, clearSession, emitSessionChanged } from './storage'

function nowISO() {
  return new Date().toISOString()
}
function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

export function isAuthenticated() {
  return !!getSession()
}

export function currentUser() {
  return getSession()
}

export function register({ name, email, password }) {
  const users = getUsers()
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  if (exists) throw new Error('Email đã tồn tại.')

  const user = {
    id: uid(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    avatar: '',
    createdAt: nowISO(),
  }
  users.push(user)
  setUsers(users)
  setSession({ id: user.id, name: user.name, email: user.email, avatar: user.avatar })
  emitSessionChanged()
  return user
  

}

export function login({ email, password }) {
  const users = getUsers()
  const user = users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  )
  if (!user) throw new Error('Sai email hoặc mật khẩu.')
  setSession({ id: user.id, name: user.name, email: user.email, avatar: user.avatar })
  emitSessionChanged()
  return user
  

}

export function logout() {
  clearSession()
  emitSessionChanged()
}

export function updateProfile({ name, email, password, avatar }) {
  const session = getSession()
  if (!session) throw new Error('Chưa đăng nhập.')

  const users = getUsers()
  const idx = users.findIndex((u) => u.id === session.id)
  if (idx === -1) throw new Error('User không tồn tại.')

  const nextEmail = email.trim().toLowerCase()
  const emailTaken = users.some((u) => u.id !== session.id && u.email.toLowerCase() === nextEmail)
  if (emailTaken) throw new Error('Email đã được dùng bởi tài khoản khác.')

  users[idx] = {
    ...users[idx],
    name: name.trim(),
    email: nextEmail,
    password: password ? password : users[idx].password,
    avatar: avatar ?? users[idx].avatar,
  }
  setUsers(users)

  setSession({ id: users[idx].id, name: users[idx].name, email: users[idx].email, avatar: users[idx].avatar })
  emitSessionChanged()
  return users[idx]
}
