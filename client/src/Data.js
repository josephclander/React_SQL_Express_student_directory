const api = async (
  path,
  method = "GET",
  body = null,
  requiresAuth = false,
  credentials = null
) => {
  const url = "http://localhost:5000/api" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (requiresAuth) {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );
    options.headers["Authorization"] = `Basic ${encodedCredentials}`;
  }

  return fetch(url, options);
};

export const getCourses = async () => {
  const response = await api("/courses");
  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else if (response.status === 401) {
    return null;
  } else {
    throw new Error();
  }
};

export const getUser = async (username, password) => {
  const response = await api(`/users`, "GET", null, true, {
    username,
    password,
  });
  const data = await response.json();
  if (response.status === 200) {
    return data;
  } else if (response.status === 401) {
    return null;
  } else {
    throw new Error();
  }
};

export const createUser = async (user) => {
  const response = await api("/users", "POST", user);
  const data = await response.json();
  if (response.status === 201) {
    return []; // we return an empty array as a signal that no errors were returned, we are successful
  } else if (response.status === 400) {
    return data.errors;
  } else {
    throw new Error();
  }
};
