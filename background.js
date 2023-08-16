chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  chrome.tabs.sendMessage(tabId, {
    message: 'urlChanged',
    data: changeInfo,
  });
});
