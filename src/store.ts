import { App, inject, reactive, readonly } from "vue";
import {Post} from "@/mocks";
import axios from "axios";

export interface User {
  id: string,
  username: string,
  password: string
}

export type Author = Omit<User, 'password'>

interface BaseState<T> {
  // o(n)
  ids: string[]

  // o(1)
  all: Map<string, T>

  loaded: boolean
}

type PostsState = BaseState<Post>
interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined
}

export interface State {
  authors: AuthorsState
  posts: PostsState
}

export const storeKey = Symbol('store')

export class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  install(app: App){
    app.provide(storeKey, this)
  }
  getState() {
    return readonly(this.state)
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(response.data.id, response.data)
    this.state.posts.ids.push(response.data.id)
  }

  async updatePost(post: Post) {
    const response = await axios.put<Post>('/posts', post)
    this.state.posts.all.set(response.data.id, response.data)
  }

  async createUser(user: User){
    const response = await axios.post<Author>('/users', user)
    this.state.authors.all.set(response.data.id, response.data)
    this.state.authors.ids.push(response.data.id)
    this.state.authors.currentUserId = response.data.id
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts')
    const postsState: PostsState = {
      ids: [],
      all: new Map,
      loaded: true
    }
    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }
    this.state.posts = postsState
  }
}

const all = new Map<string, Post>()

export const store = new Store({
  authors: {
    all: new Map<string, Author>(),
    ids: [],
    loaded: false,
    currentUserId: undefined
  },
  posts: {
    all,
    ids: [],
    loaded: false
  }
})

//Very common convention to use prefix `use` in a reusable function.
//It's often called composables
export function useStore(): Store{
  const _store = inject<Store>(storeKey)
  if(!_store){
    throw Error('Did you forget to call provide?')
  }

  return _store
}
