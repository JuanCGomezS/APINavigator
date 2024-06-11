/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendRequest") {
    // Handle the request here
    const url = request.url;
    const method = request.method;
    const auth = request.auth;

    // Send a response back to the popup script
    sendResponse({ result: "Response from background script" });
  }
}); */
/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendRequest") {
    const url = request.url;
    const method = request.method;
    const auth = request.auth;

    fetch(url, {
      method,
      headers: {
        Authorization: auth,
      },
    })
      .then(response => response.json())
      .then(result => {
        sendResponse({ result });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
  }
}); */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendRequest") {
    const url = request.url;
    const method = request.method;
    const auth = request.auth;

    fetch(url, {
      method,
      headers: {
        Authorization: auth,
      },
    })
      .then(response => response.json())
      .then(result => {
        sendResponse({ result }); // Send the response back to the popup script
      })
      .catch(error => {
        sendResponse({ error: error.message }); // Send an error response back to the popup script
      });

    return true; // Indicate that we'll send a response later
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { url, method, headers } = request;

  // Permitir solicitudes a cualquier dominio
  if (url.startsWith("http")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error("Error fetching", error);
          return new Response("Error fetching", { status: 500 });
        })
    );
  }
});

self.addEventListener("message", (event) => {
  if (event.data.action === "sendRequest") {
    const { url, method, auth } = event.data;
    const headers = {};
    if (auth) {
      headers.Authorization = `Bearer ${auth}`;
    }

    fetch(url, {
      method,
      headers,
      mode: "cors",
      cache: "no-cache",
    })
      .then((response) => response.text())
      .then((result) => {
        event.ports[0].postMessage({ result });
      })
      .catch((error) => {
        event.ports[0].postMessage({ error: error.message });
      });
  }
});

