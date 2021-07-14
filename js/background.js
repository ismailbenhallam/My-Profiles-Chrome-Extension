chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create(
    {
      url: chrome.extension.getURL("views/edit.html"),
    },
    function (tab) {}
  );
});
