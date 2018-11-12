import {
    template
} from 'lodash';
import notfoundTpl from '../views/notfound.tpl.html';

function empty(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function present(node, snapshot) {
    console.log(snapshot);
    node.innerHTML = snapshot;
}

chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(devpane) {
            const $ = devpane.document.querySelectorAll.bind(devpane.document);
            const $display = $('.display')[0];
            const notfoundView = {
                render: template(notfoundTpl),
            };

            chrome.devtools.inspectedWindow.eval(
                "window.__flowDownStores__ !== undefined ? window.__flowDownStores__.get(0).getState() : null",
                function(result, exceptionInfo) {
                    if (result) {
                        console.log({
                            store: result
                        });
                        empty($display);
                        present($display, notfoundView.render());
                    } else {
                        console.debug(exceptionInfo);
                        empty($display);
                        present($display, notfoundView.render());
                    }
                }
            );
        });
    }
);
