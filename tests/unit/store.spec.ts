import axios from 'axios';
import { Post, today } from "../../src/mocks"
import { Author, State, Store, User } from "../../src/store"
import moment from "moment";

const mockPost: Post = {
  ...today
}

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
// jest.mock('axios', () => ({
//   get: () => {
//     return {
//       data: [mockPost]
//     }
//   },
// }))

describe('store', function () {
  describe('fetchPosts()', () => {
    it('fetches post and updates state', async () => {
      mockedAxios.get.mockResolvedValue({ data: [mockPost] })
      const store = new Store({
        posts: {
          ids: [],
          all: new Map(),
          loaded: false
        },
        authors: {
          ids: [],
          all: new Map(),
          currentUserId: undefined,
          loaded: false
        }
      })

      await store.fetchPosts()

      const expected: State = {
        posts: {
          ids: ['1'],
          all: new Map([['1', mockPost]]),
          loaded: true
        },
        authors: {
          ids: [],
          all: new Map(),
          currentUserId: undefined,
          loaded: false
        }
      }

      expect(expected).toEqual(store.getState())
    })
  })
  describe('createPost()', () => {
    it('creates post and updates state', async () => {
      const post: Post = {
        ...mockPost,
        html:'__html__',
        markdown: '__markdown__'
      }
      mockedAxios.post.mockResolvedValue({ data: post })

      const store = new Store({
        posts: {
          ids: [],
          all: new Map(),
          loaded: false
        },
        authors: {
          ids: [],
          all: new Map(),
          currentUserId: undefined,
          loaded: false
        }
      })
      await store.createPost(post)

      const expected: State = {
        authors: {
          ids: [],
          all: new Map(),
          loaded: false,
          currentUserId: undefined
        },
        posts: {
          ids:['1'],
          all: new Map([['1', post]]),
          loaded: false
        }
      }

      expect(store.getState()).toEqual(expected)
    })
  });
  describe('updatePost()', () => {
    it('updates post and state', async () => {
      mockedAxios.put.mockImplementation((url, post: Post) => {
        return Promise.resolve({ data: post })
      })

      const post: Post = {
        id: '__id__',
        title: '__title__',
        created: moment().subtract(1, 'second'),
        html: '__html__',
        markdown: '__markdown__',
        authorId: '__authorId__'
      }

      const store = new Store({
        authors: {
          ids: [],
          all: new Map(),
          loaded: false,
          currentUserId: undefined
        },
        posts: {
          ids: [post.id],
          all: new Map([[post.id, post]]),
          loaded: false,
        }
      })

      const updatedPost = {
        ...post,
        title: '__title__updated__'
      }
      await store.updatePost(updatedPost)

      expect(store.getState()).toEqual({
        authors: {
          ids: [],
          all: new Map(),
          loaded: false,
          currentUserId: undefined
        },
        posts: {
          ids: [updatedPost.id],
          all: new Map([[updatedPost.id, updatedPost]]),
          loaded: false,
        }
      })
    })

  });
  describe('createUser()', () => {
    it('creates user and update state', async () => {
      const author: Author = { id: '__randomId__', username: '__username__' }
      mockedAxios.post.mockResolvedValue({ data: author })

      const store = new Store({
        authors: {
          ids: [],
          all: new Map(),
          loaded: false,
          currentUserId: undefined
        },
        posts: {
          ids: [],
          all: new Map(),
          loaded: false,
        }
      })

      const user: User = {
        id: '-1',
        username: '__username__',
        password: '__password__'
      }

      await store.createUser(user)

      const expected: State = {
        posts: {
          ids: [],
          all: new Map(),
          loaded: false
        },
        authors: {
          ids: [author.id],
          all: new Map([[author.id, author]]),
          loaded: false,
          currentUserId: author.id
        }
      }

      expect(store.getState()).toEqual(expected)
    })
  });
});
