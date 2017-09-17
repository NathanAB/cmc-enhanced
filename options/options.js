// Saves options to chrome.storage
function saveOptions() {
  const autoRefresh = document.querySelector('.auto-refresh').value;
  chrome.storage.sync.set({
    autoRefresh,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Night theme on by default
  chrome.storage.sync.get({
    autoRefresh: 15,
  }, (settings) => {
    document.querySelector('.auto-refresh').value = settings.autoRefresh;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.auto-refresh').addEventListener('change', saveOptions);
