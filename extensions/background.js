chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "createTask",
    type: "normal",
    title: "タスクを作成",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "createTaskFromPopup",
    type: "normal",
    title: "タスクを作成(ポップアップ)",
    contexts: ["selection"]
  });
})

chrome.contextMenus.onClicked.addListener((item) => {
  switch (item.menuItemId) {
    case "createTask": {
      chrome.windows.create({
        url: `chrome-extension://${chrome.runtime.id}/dist/index.html?taskText=${item.selectionText}`,
        type: "popup",
        width: 500,
        height: 600,
      });
      break;
    }
    case "createTaskFromPopup": {
      // セキュリティ上の理由で、右クリックメニューからはポップアップを開けない
      chrome.action.openPopup();
    }
  }
})