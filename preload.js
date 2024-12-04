const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  quitApp: () => ipcRenderer.send('quit-app'),
  getRacine: (index) => ipcRenderer.invoke('racines:get', index),
  getRacineCount: () => ipcRenderer.invoke('racines:getCount'),
  searchRacine: (term) => ipcRenderer.invoke('racines:search', term)
});
