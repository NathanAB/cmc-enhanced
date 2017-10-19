// Saves options to chrome.storage
function saveOptions() {
  const autoRefresh = document.querySelector('.auto-refresh').value;
  const darkTheme = document.querySelector('.dark-theme').checked;
  chrome.storage.sync.set({
    autoRefresh,
    darkTheme,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Dark theme on by default
  chrome.storage.sync.get({
    autoRefresh: 15,
    darkTheme: true,
  }, (settings) => {
    document.querySelector('.auto-refresh').value = settings.autoRefresh;
    document.querySelector('.dark-theme').checked = settings.darkTheme;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.auto-refresh').addEventListener('change', saveOptions);
document.querySelector('.dark-theme').addEventListener('change', saveOptions);

