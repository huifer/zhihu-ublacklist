chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        type: 'normal',
        id: 'hello',
        title: '屏蔽用户（知乎）',
        "contexts": ["all"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {

    if (info.menuItemId == "hello") {


        chrome.tabs.sendMessage(tab.id, {
            message: 'Custom ContextMenus Action',
            menuItemId: info.menuItemId,
            selectedText: info.selectionText
        });

    }
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(changeInfo.status)
    // 检查页面是否已经加载完成
    if (changeInfo.status === 'complete') {
        // 在页面加载完成后执行你的操作
        console.log('页面已完成加载');

        chrome.tabs.sendMessage(tab.id, {
            message: 'page complete',
        })
    }
});
