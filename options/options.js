// Saves options to chrome.storage
function saveOptions() {
  const useNightTheme = document.querySelector('.night-theme-checkbox').checked;
  chrome.storage.sync.set({
    useNightTheme,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Night theme on by default
  chrome.storage.sync.get({
    useNightTheme: true,
  }, (settings) => {
    document.querySelector('.night-theme-checkbox').checked = settings.useNightTheme;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.night-theme-checkbox').addEventListener('change', saveOptions);
