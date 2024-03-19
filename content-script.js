function f1(request, questionID) {
    var listItems = document.querySelectorAll('.List-item');

    listItems.forEach(function (item) {
        var answerItems = item.querySelectorAll('.ContentItem.AnswerItem');
        answerItems.forEach(function (answerItem) {
            // 提取并输出data-zop数据
            var dataZop = answerItem.getAttribute('data-zop');
            var authorData = {};


            var authorInfo = answerItem.querySelector('.AuthorInfo');

            // 在AuthorInfo元素中查找meta标签
            var metaTags = authorInfo.querySelectorAll('meta');

            // 遍历所有meta标签
            metaTags.forEach(function (metaTag) {
                // 获取meta标签中的itemprop和content属性值
                var itemprop = metaTag.getAttribute('itemprop');
                var content = metaTag.getAttribute('content');

                // 将itemprop和content添加到authorData对象中
                if (itemprop && content) {
                    authorData[itemprop] = content;
                }
            });

            if (authorData.name.includes(request.selectedText)) {
                // 将问题 ID 和作者数据存储到插件中
                chrome.storage.sync.get(['removedItems'], function (result) {
                    var removedItems = result.removedItems || [];
                    removedItems.push({
                        questionID: questionID,
                        authorData: authorData
                    });
                    // 将更新后的数据存回插件中
                    chrome.storage.sync.set({removedItems: removedItems}, function () {
                        console.log('数据已存储到插件中');
                    });
                });
                item.remove();
            }
            console.log(authorData);
        });
    });
}

function f2(request, questionID) {
    // ContentItem AnswerItem
    var listItems = document.querySelectorAll('.ContentItem.AnswerItem');
    listItems.forEach(function (e) {
        var authorInfo = e.querySelector('.AuthorInfo');

        // 在AuthorInfo元素中查找meta标签
        var metaTags = authorInfo.querySelectorAll('meta');
        var authorData = {};

        // 遍历所有meta标签
        metaTags.forEach(function (metaTag) {
            // 获取meta标签中的itemprop和content属性值
            var itemprop = metaTag.getAttribute('itemprop');
            var content = metaTag.getAttribute('content');

            // 将itemprop和content添加到authorData对象中
            if (itemprop && content) {
                authorData[itemprop] = content;
            }
        });

        if (authorData.name.includes(request.selectedText)) {
            // 将问题 ID 和作者数据存储到插件中
            chrome.storage.sync.get(['removedItems'], function (result) {
                var removedItems = result.removedItems || [];
                removedItems.push({
                    questionID: questionID,
                    authorData: authorData
                });
                // 将更新后的数据存回插件中
                chrome.storage.sync.set({removedItems: removedItems}, function () {
                    console.log('数据已存储到插件中');
                });
            });
            e.remove();
        }
    });

}

function remove(request, questionID) {
    f1(request, questionID);
    f2(request, questionID);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "Custom ContextMenus Action") {
        console.log(request)
        var currentUrl = document.URL;

        var questionID = null;

        // https://www.zhihu.com/question/19929473/answer/3434748918
        if (currentUrl.includes('answer')) {
            var ucl = currentUrl.match(/question\/(\d+)/);
            if (ucl && ucl.length > 1) {
                console.log("提取的问题ID为：" + ucl[1]);
                questionID = ucl[1];
            } else {
                console.log("无法提取问题ID。");
            }
        } else {

            console.log("当前网页的URL是：" + currentUrl);
            var match = currentUrl.match(/\d+$/);
            if (match) {
                var lastNumber = match[0];
                questionID = lastNumber;
                console.log("最后一个数字是：" + lastNumber);
            } else {
                console.log("未找到数字");
            }


        }
        // 获取所有class为"List-item"的元素
        remove(request, questionID);
    }

});


function remove_ad() {
    var elements = document.querySelectorAll('.Pc-Business-Card-PcTopFeedBanner');

    elements.forEach(function (element) {
        element.remove();
    });
    var elements = document.querySelectorAll('.Pc-card.Card');
    elements.forEach(function (element) {
        element.remove();
    });
    var elements = document.querySelectorAll('.TopstoryItem--advertCard');
    elements.forEach(function (element) {
        element.remove();
    });
    var elements = document.querySelectorAll('.Business-Card-PcRightBanner-link');
    elements.forEach(function (element) {
        element.remove();
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "page complete") {
        remove_ad();


        console.log(request)
        var currentUrl = document.URL;
        console.log("当前网页的URL是：" + currentUrl);


        var questionID = null;
        if (currentUrl.includes('answer')) {
            var ucl = currentUrl.match(/question\/(\d+)/);
            if (ucl && ucl.length > 1) {
                console.log("提取的问题ID为：" + ucl[1]);
                questionID = ucl[1];
            } else {
                console.log("无法提取问题ID。");
            }
        } else {

            var match = currentUrl.match(/\d+$/);
            if (match) {
                var lastNumber = match[0];
                questionID = lastNumber;
                console.log("最后一个数字是：" + lastNumber);


            } else {
                console.log("未找到数字");
            }
        }

        chrome.storage.sync.get(['removedItems'], function (result) {
            var removedItems = result.removedItems || [];
            var authorDataCollection = [];
            for (var i = 0; i < removedItems.length; i++) {
                if (removedItems[i].questionID === questionID) {
                    var u = removedItems[i].authorData.url;
                    authorDataCollection.push(removedItems[i].authorData);

                    c(u)
                }
            }
            if (authorDataCollection.length > 0) {
                console.log("找到的数据", authorDataCollection);
            } else {
                console.log("没找到数据");
            }
        });

    }

});


function c(u) {
    var listItems = document.querySelectorAll('.List-item');

    listItems.forEach(function (item) {
        var answerItems = item.querySelectorAll('.ContentItem.AnswerItem');
        answerItems.forEach(function (answerItem) {
            // 提取并输出data-zop数据
            var dataZop = answerItem.getAttribute('data-zop');
            var authorData = {};


            var authorInfo = answerItem.querySelector('.AuthorInfo');

            // 在AuthorInfo元素中查找meta标签
            var metaTags = authorInfo.querySelectorAll('meta');

            // 遍历所有meta标签
            metaTags.forEach(function (metaTag) {
                // 获取meta标签中的itemprop和content属性值
                var itemprop = metaTag.getAttribute('itemprop');
                var content = metaTag.getAttribute('content');

                // 将itemprop和content添加到authorData对象中
                if (itemprop && content) {
                    authorData[itemprop] = content;
                }
            });

            if (authorData.url == u) {
                item.remove();
            }
            console.log(authorData);
        });
    })
}


// a()
//
// function a() {
//     console.log("=1231=31=231=1231=31=231=1231=31=231=1231=31=231=1231=31=231")
// }

window.addEventListener('scroll', function (event) {
    // 在页面滚动时执行你的操作
    console.log('页面被滚动了！');
    remove_ad();
});