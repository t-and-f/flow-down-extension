import UI from '../lib/ui';
import viewsFactory from '../lib/viewsFactory';
import {
    highlightSyntax
} from '../lib/utils';

import notfoundTpl from '../views/notfound.tpl.html';
import stateTreeTpl from '../views/statetree.tpl.html';


chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        panel.onShown.addListener(function(devpane) {
            const $ = devpane.document.querySelectorAll.bind(devpane.document);
            const ui = new UI($('.display')[0]);

            const notfoundView = viewsFactory.getView(notfoundTpl);
            const stateTreeView = viewsFactory.getView(stateTreeTpl);

            let stateCache = null;

            function poll() {
                chrome.devtools.inspectedWindow.eval(
                    "window.__flowDownStores__ !== undefined ? window.__flowDownStores__.get(0).getState() : null",
                    function(result, exceptionInfo) {
                        if (result) {
                            if (JSON.stringify(result) !== JSON.stringify(stateCache)) {
                                stateCache = Object.assign({}, result);
                                const str = JSON.stringify(result, null, 4);
                                ui.present(stateTreeView.render({
                                    raw: highlightSyntax(str)
                                }));
                            }
                        } else {
                            console.debug(exceptionInfo);
                            ui.present(notfoundView.render());
                        }
                    }
                );
                setTimeout(() => {
                    requestAnimationFrame(poll());
                }, 50);
            }

            poll();
        });
    }
);
