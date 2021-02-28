export const SET_POSTS = 'APP/SET_POSTS';
export const SET_POST_CURRENT_PAGE = 'APP/SET_POST_CURRENT_PAGE';
export const SET_HOME_INTRO = 'APP/SET_HOME_INTRO';
export const SET_HOME_CATEGORY = 'APP/SET_HOME_CATEGORY';
export const SET_POST = 'APP/SET_POST';

export const initialState = {
  postCurrentPage: 1,
  homeIntro: {},
  homeCategories: [],
  posts: [],
  post: {}
};

export const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case SET_POST_CURRENT_PAGE:
      return {
        ...state,
        postCurrentPage: action.postCurrentPage
      };
    case SET_HOME_INTRO:
      return {
        ...state,
        homeIntro: action.content
      };
    case SET_HOME_CATEGORY:
      return {
        ...state,
        homeCategories: action.categories
      };
    case SET_POST:
      return {
        ...state,
        post: action.post
      };
    default:
      return state;
  }
};

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts
});

export const setPostCurrentPage = (postCurrentPage) => ({
  type: SET_POST_CURRENT_PAGE,
  postCurrentPage
});

export const setHomeIntro = (content) => ({
  type: SET_HOME_INTRO,
  content
});

export const setHomeCategories = (categories) => ({
  type: SET_HOME_CATEGORY,
  categories
});

export const setPost = (post) => ({
  type: SET_POST,
  post
});
