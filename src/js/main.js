import UI from '../lib/ui';
import viewsFactory from '../lib/viewsFactory';
import notfoundTpl from '../views/notfound.tpl.html';

chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(devpane) {
            const $ = devpane.document.querySelectorAll.bind(devpane.document);
            const ui = new UI($('.display')[0]);

            const notfoundView = viewsFactory.getView(notfoundTpl);

            chrome.devtools.inspectedWindow.eval(
                "window.__flowDownStores__ !== undefined ? window.__flowDownStores__.get(0).getState() : null",
                function(result, exceptionInfo) {
                    if (result) {
                        console.log({
                            store: result
                        });
                    } else {
                        console.debug(exceptionInfo);
                        ui.empty();
                        ui.present(notfoundView.render());
                    }
                }
            );
        });
    }
);
