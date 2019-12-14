import fetch from 'unfetch'

export const get = <T, Q>(path: string, params: Q) => {
  return fetch(
    path,
    {
      method: 'GET',
      credentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    },
  ).then(res => res.json())
}
