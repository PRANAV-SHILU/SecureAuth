import { fetchPostById } from "../services/postService";

export const postDetailLoader = async ({ params }) => {
  const { id } = params;
  
  const postPromise = fetchPostById(id).then((res) => res.data);

  return { post: postPromise };
};
