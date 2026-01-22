import { getPosts, setPosts } from './storage'
import { currentUser } from './auth'

function nowISO() {
  return new Date().toISOString()
}
function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

export function listPosts() {
  const u = currentUser()
  if (!u) return []

  const posts = getPosts()
  return posts
    .filter((p) => p.authorId === u.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}


export function getPostById(id) {
  const u = currentUser()
  if (!u) return null

  return getPosts().find((p) => p.id === id && p.authorId === u.id) || null
}


export function createPost({ title, content, image }) {
  const u = currentUser()
  if (!u) throw new Error('Bạn cần đăng nhập.')

  const posts = getPosts()
  const post = {
    id: uid(),
    title: title.trim(),
    content: content.trim(),
    image: (image || '').trim(),
    authorId: u.id,
    authorName: u.name,
    createdAt: nowISO(),
    updatedAt: nowISO(),
    comments: [],
  }
  posts.push(post)
  setPosts(posts)
  return post
}

export function updatePost(id, { title, content, image }) {
  const u = currentUser()
  if (!u) throw new Error('Bạn cần đăng nhập.')

  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) throw new Error('Bài viết không tồn tại.')
  if (posts[idx].authorId !== u.id) throw new Error('Bạn chỉ được sửa bài của mình.')

  posts[idx] = {
    ...posts[idx],
    title: title.trim(),
    content: content.trim(),
    image: (image || '').trim(),
    updatedAt: nowISO(),
  }
  setPosts(posts)
  return posts[idx]
}

export function deletePost(id) {
  const u = currentUser()
  if (!u) throw new Error('Bạn cần đăng nhập.')

  const posts = getPosts()
  const post = posts.find((p) => p.id === id)
  if (!post) throw new Error('Bài viết không tồn tại.')
  if (post.authorId !== u.id) throw new Error('Bạn chỉ được xóa bài của mình.')

  setPosts(posts.filter((p) => p.id !== id))
}

export function addComment(postId, text) {
  const u = currentUser()
  if (!u) throw new Error('Bạn cần đăng nhập.')

  const posts = getPosts()
  const idx = posts.findIndex((p) => p.id === postId)
  if (idx === -1) throw new Error('Bài viết không tồn tại.')

  const c = {
    id: uid(),
    userId: u.id,
    userName: u.name,
    content: text.trim(),
    createdAt: nowISO(),
  }
  posts[idx].comments = [c, ...(posts[idx].comments || [])]
  setPosts(posts)
  return c
}
