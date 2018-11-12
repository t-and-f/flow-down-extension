chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(devwin) {
            const $ = devwin.document.querySelectorAll.bind(devwin.document);
            $display = $('.display')[0];
            $display.innerText = 'toast';

            chrome.devtools.inspectedWindow.eval(
                "window.__flowDownStores__ !== undefined ? window.__flowDownStores__.get(0).getState() : null",
                function(result, exceptionInfo) {
                    if (result) {
                        console.log({
                            store: result
                        });
                    } else {
                        console.debug(exceptionInfo);
                    }
                }
            );
        });
    }
);
