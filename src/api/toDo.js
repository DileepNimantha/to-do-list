// import { AES, enc } from "crypto-js";
// import { stringify } from "canonicalize-json";
// import { buildXDR } from '../services/transactionBuilder';

const BASE_URL = process.env.REACT_APP_API_TODO;
// REACT_APP_API_TODO=http://localhost:8080/api/toDo

export const PostTypes = {
  TEXT_POST: 'text',
  PHOTO_POST: 'photo',
  MIXED_POST: 'mixed',
  PROFILEPHOTO_POST: 'profilephoto',
  SHARE_POST: 'share',
  COVERPHOTO_POST: 'coverphoto',
  COMMENT_POST: 'comment'
};

export const TEXT_POST = 'text';
export const PHOTO_POST = 'photo';
export const MIXED_POST = 'mixed';
export const PROFILEPHOTO_POST = 'profilephoto';
export const SHARE_POST = 'share';
export const COVERPHOTO_POST = 'coverphoto';
export const COMMENT_POST = 'comment';

export const PUBLIC_VISIBILITY = 'public';
export const FRIENDS_VISIBILITY = 'friends';

export const REACTION_LIKE = 'like';

export const getTasksApi = async () => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};

export const createTaskApi = async values => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};

export const updateTaskApi = async (id, task) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};

export const deleteTaskApi = async taskId => {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};

export const deleteTasksApi = async ids => {
  const response = await fetch(`${BASE_URL}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids })
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};
