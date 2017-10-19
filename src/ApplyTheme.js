chrome.storage.sync.get({
  darkTheme: true,
}, (settings) => {
  if (settings.darkTheme) {
    document.documentElement.classList.add('cmce-dark');
  }
});
