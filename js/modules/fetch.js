export const fetchAsync = async (options) => {
  let { url, method, success, failed, data } = options;

  try {
    let res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }),
      jsonResponse = await (res.ok ? res.json() : Promise.reject(res));

    success(jsonResponse);
  } catch (err) {}
};
