export const BASE_URL = process.env.REACT_APP_API_USER;

export const getUserApi = async data => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  if (!response.ok) throw new Error(result.message || 'Something went wrong');

  return result;
};
