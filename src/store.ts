import { App, inject, reactive, readonly } from "vue";
import {Post} from "@/mocks";
import axios from "axios";


export interface User {
  id: string,
  username: string,
  password: string
}

interface State {
  posts: PostsState
}

export const storeKey = Symbol('store')

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  loaded: boolean
}

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
    this.state.posts.all.set(post.id, response.data)
    this.state.posts.ids.push(post.id)
    console.log('response', response)
  }

  async createUser(user: User){
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
