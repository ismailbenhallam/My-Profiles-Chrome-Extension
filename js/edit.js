let form = document.getElementById("form");
let saveBtn = document.getElementById("save");
let nameInput = document.getElementById("name");

// Load the username if it exist
chrome.storage.sync.get(["name"], (data) => {
  nameInput.value = data.name || "";
});

// Create inputs for networks and Load any existing network
networks.forEach((n, ind) => {
  chrome.storage.sync.get([n], (data) => {
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="form-group">
          <label for="${n}">${n}</label>
          <input
            type="url"
            class="form-control"
            id="${n}"
          />
        </div>`
    );

    document.getElementById(n).value = data[n] || "";

    if (ind === networks.length - 1)
      // Add submit button
      form.insertAdjacentHTML(
        "beforeend",
        `<div class="container">
          <div class="row d-flex justify-content-center">
            <input
              id="save"
              type="submit"
              class="btn btn-success"
              value="Save"
            />
          </div>
        </div>`
      );
  });
});

let formSubmitedCallback = () => {
  // Save the new name
  chrome.storage.sync.set({ name: nameInput.value });

  // Save networks
  networks.forEach((n, idx) => {
    chrome.storage.sync.set({ [n]: document.getElementById(n).value }, () => {
      if (idx === networks.length - 1) {
        location.href = "popup.html";
      }
    });
  });
};

// Listener on form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formSubmitedCallback();
});

// Add event listener on "Enter"
document.addEventListener(
  "keyup",
  (event) => {
    if (event.key == "Enter") formSubmitedCallback();
  },
  false
);

nameInput.focus();
