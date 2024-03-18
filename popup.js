// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // 从存储中获取数据并显示在 popup 页面上
    chrome.storage.sync.get(['removedItems'], function(result) {
        var removedItems = result.removedItems || [];

        // 如果没有存储的数据，显示提示信息
        if (removedItems.length === 0) {
            var message = document.createElement('p');
            message.textContent = '没有存储的数据';
            document.body.appendChild(message);
            return;
        }

        // 创建一个列表来展示存储的数据
        var list = document.createElement('ul');

        // 遍历存储的数据，创建列表项并添加到列表中
        removedItems.forEach(function(item) {
            var listItem = document.createElement('li');
            listItem.textContent = '问题ID：' + item.questionID + '，作者数据：' + JSON.stringify(item.authorData);
            list.appendChild(listItem);
        });

        // 将列表添加到 popup 页面中
        document.body.appendChild(list);
    });
});
