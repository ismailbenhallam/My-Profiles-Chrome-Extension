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
        `<div class="col text-center">
        <a id="sn-${n}" href="${data[n]}" target="_blank" title="${n}">
            <img src="../icons/${icons[n]}" height="55" width="55"/>
        </div>
    </li>`
      );

    // Add shortcuts
    document.addEventListener(
      "keyup",
      (event) => {
        if (event.key == n.charAt(0).toLowerCase()) {
          let sn = document.getElementById("sn-" + n);
          if (sn) sn.click();
        }
      },
      false
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

// Add event listener on "a" to open all the social networks profiles
document.addEventListener(
  "keyup",
  (event) => {
    if (event.key == "a") {
      networks.forEach((n) => {
        let sn = document.getElementById("sn-" + n);
        if (sn) sn.click();
      });
    }
  },
  false
);
