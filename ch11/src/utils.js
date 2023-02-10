export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function patchData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
}

export async function deleteData(url = "") {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.json();
}
