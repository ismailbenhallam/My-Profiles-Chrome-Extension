chrome.storage.sync.get(["name"], (data) => {
  let nameSpan = document.getElementById("name-span");
  if (!data.name) location.href = "edit.html";
  nameSpan.textContent = data.name;
});

let list = document.getElementById("social-icons-list");
networks.forEach((n) => {
  chrome.storage.sync.get([n], (data) => {
    if (data[n])
      list.insertAdjacentHTML(
        "beforeend",
        `<div class="col">
        <a href="${data[n]}" target="_blank">
            <img src="../icons/${icons[n]}" height="55" width="55"/>
        </div>
    </li>`
      );
  });
});

// Add event listener on "Enter"
document.addEventListener(
  "keyup",
  (event) => {
    if (event.key == "e") document.getElementById("edit").click();
  },
  true
);
