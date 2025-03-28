document.addEventListener("DOMContentLoaded", () => {
  const urlList = document.getElementById("urlList");
  const newUrlInput = document.getElementById("newUrl");
  const addButton = document.getElementById("addUrl");
  const matchFullUrlCheckbox = document.getElementById("matchFullUrl");

  // Load existing URLs and settings
  loadUrls();
  loadSettings();

  // Add new URL
  addButton.addEventListener("click", () => {
    const url = normalizeUrl(newUrlInput.value);
    if (url && isValidUrl(url)) {
      addUrl(url);
      newUrlInput.value = "";
    } else {
      alert("Please enter a valid URL");
    }
  });

  // Handle enter key in input
  newUrlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addButton.click();
    }
  });

  // Setup drag and drop for the container
  urlList.addEventListener("dragover", handleDragOver);
  urlList.addEventListener("dragenter", (e) => e.preventDefault());

  // Handle checkbox changes
  matchFullUrlCheckbox.addEventListener("change", () => {
    saveSettings();
  });
});

function handleDragOver(e) {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  if (!draggingItem) return;

  const siblings = [...urlList.querySelectorAll(".url-item:not(.dragging)")];
  const nextSibling = siblings.find((sibling) => {
    const box = sibling.getBoundingClientRect();
    const offset = e.clientY - box.top - box.height / 2;
    return offset < 0;
  });

  urlList.insertBefore(draggingItem, nextSibling);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function loadUrls() {
  browser.storage.local.get(["startupUrls"]).then((result) => {
    const urls = result.startupUrls || [];
    log("Loading stored URLs:", urls);

    const urlList = document.getElementById("urlList");
    urlList.innerHTML = "";

    urls.forEach((url, index) => {
      createUrlElement(url, index);
    });
  });
}

function createUrlElement(url, index) {
  const urlList = document.getElementById("urlList");
  const div = document.createElement("div");
  div.className = "url-item";
  div.draggable = true;

  // Add drag handle with SVG icon
  const dragHandle = document.createElement("div");
  dragHandle.className = "drag-handle";
  dragHandle.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8 6a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8 6a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"/>
    </svg>
  `;
  dragHandle.title = "Drag to reorder";

  const input = document.createElement("input");
  input.type = "text";
  input.value = url;
  input.addEventListener("change", () => updateUrl(index, input.value));

  // Prevent drag when interacting with input
  input.addEventListener("mousedown", (e) => {
    e.stopPropagation();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => deleteUrl(index));

  // Add drag events
  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
  });

  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
    saveNewOrder();
  });

  div.appendChild(dragHandle);
  div.appendChild(input);
  div.appendChild(deleteButton);
  urlList.appendChild(div);
}

function saveNewOrder() {
  const items = [...document.querySelectorAll(".url-item input")];
  const newUrls = items.map((input) => normalizeUrl(input.value));
  log("Saving new URL order:", newUrls);
  browser.storage.local.set({ startupUrls: newUrls }).then(() => {
    loadUrls();
  });
}

function addUrl(url) {
  log("Adding new URL:", url);
  browser.storage.local.get(["startupUrls"]).then((result) => {
    const urls = result.startupUrls || [];
    urls.push(url);
    browser.storage.local.set({ startupUrls: urls }).then(() => {
      createUrlElement(url, urls.length - 1);
    });
  });
}

function updateUrl(index, newUrl) {
  const normalizedUrl = normalizeUrl(newUrl);
  log(`Updating URL at index ${index} to:`, normalizedUrl);

  if (!isValidUrl(normalizedUrl)) {
    log("Invalid URL, reloading list");
    alert("Please enter a valid URL");
    loadUrls();
    return;
  }

  browser.storage.local.get(["startupUrls"]).then((result) => {
    const urls = result.startupUrls || [];
    log("Current URLs:", urls);
    urls[index] = normalizedUrl;
    log("Updated URLs:", urls);
    browser.storage.local.set({ startupUrls: urls });
  });
}

function deleteUrl(index) {
  log(`Deleting URL at index: ${index}`);
  browser.storage.local.get(["startupUrls"]).then((result) => {
    const urls = result.startupUrls || [];
    log("Current URLs:", urls);
    const deletedUrl = urls[index];
    urls.splice(index, 1);
    log(`Deleted URL: ${deletedUrl}`);
    log("Remaining URLs:", urls);
    browser.storage.local.set({ startupUrls: urls }).then(() => {
      loadUrls();
    });
  });
}

function loadSettings() {
  browser.storage.local.get(["matchFullUrl"]).then((result) => {
    const matchFullUrl = result.matchFullUrl || false;
    document.getElementById("matchFullUrl").checked = matchFullUrl;
  });
}

function saveSettings() {
  const matchFullUrl = document.getElementById("matchFullUrl").checked;
  browser.storage.local.set({ matchFullUrl });
}
