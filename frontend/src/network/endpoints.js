export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  USER: {
    USERS: "/users",
    PROFILE: (username) => username ? `/users/profile/${username}` : "/users/profile",
  },
  POST: {
    POSTS: "/posts",
    CREATE_POST: "/posts",
    INCREASE_POST_VIEW: (id) => `/posts/${id}/increment-view`,
    EDIT_POST: (id) => `/posts/${id}`,
  },
  ADMIN: {
    METRICS: "/admin/matrics",
  },
  CONTACT: {
    SUBMIT: "/contact_support/submit",
    GET_CONTACTS: (isResponded) => isResponded !== null && isResponded !== undefined ? `/contact_support?isResponded=${isResponded}` : "/contact_support",
  },
};
