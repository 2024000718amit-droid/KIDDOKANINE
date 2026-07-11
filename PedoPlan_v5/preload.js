const { contextBridge, ipcRenderer } = require('electron');

/**
 * Preload script for secure communication between renderer and main process
 * This script runs in a privileged context before the web page loads
 */

// Security: Only expose specific, safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform information
  platform: process.platform,
  isElectron: true,
  
  // Version information
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  
  // Safe utility functions
  getAppVersion: () => {
    return '5.0.0';
  },
  
  // You can add more safe APIs here as needed
  // Example:
  // sendMessage: (channel, data) => {
  //   // Whitelist channels for security
  //   const validChannels = ['toMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.send(channel, data);
  //   }
  // },
  
  // receiveMessage: (channel, func) => {
  //   const validChannels = ['fromMain'];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }
});

// Security: Log when preload script is loaded (development only)
console.log('PedoPlan preload script loaded');

// Add a visual indicator that the app is running in Electron
window.addEventListener('DOMContentLoaded', () => {
  const isElectron = Boolean(window.electronAPI);
  if (isElectron) {
    console.log('Running in Electron environment');
    console.log('Platform:', window.electronAPI.platform);
    console.log('Versions:', window.electronAPI.versions);
  }
});

// Disable certain keyboard shortcuts for security
document.addEventListener('keydown', (event) => {
  // Prevent opening DevTools in production
  if (event.key === 'F12' || 
      (event.ctrlKey && event.shiftKey && event.key === 'I') ||
      (event.ctrlKey && event.shiftKey && event.key === 'J')) {
    // Allow in development, block in production
    const isDevelopment = window.electronAPI?.versions?.electron;
    if (!isDevelopment) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
});
