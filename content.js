const items = { next: null };

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'urlChanged') {
    if (request.data.url) {
      resetScroll();
      markAsClicked();
      const { parentNode } = findDomNode(request.data.url);
      highlightClickedItem(parentNode);
    }
  }
});

function resetScroll() {
  const tab = document.querySelector('.vacancy');
  tab.scrollIntoView();
}

function findDomNode(url) {
  const newUrl = url.replace('https://jobsearch.az/', '');
  const hrefNode = document.querySelector(`a[href$="${newUrl}"]`);
  const parentNode = hrefNode.parentNode;
  items.next = url;
  return { hrefNode, parentNode };
}

function highlightClickedItem(parentNode) {
  parentNode.style.setProperty('background-color', '#dadada');
}

function markAsClicked() {
  if (!items.next) return;
  const { parentNode } = findDomNode(items.next);
  const text = parentNode.querySelector('.list__item__title');
  parentNode.style.setProperty('background-color', '#fff');
  text.style.setProperty('color', '#c58af9', 'important');
}
