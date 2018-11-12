chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(global) {
            const $ = global.document.querySelectorAll.bind(global.document);
            alert($('.display').length);
        });
    }
);
