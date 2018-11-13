import diff from 'deep-diff';

// Libs
import UI from '../lib/ui';
import viewsFactory from '../lib/viewsFactory';
import {
    highlightSyntax
} from '../lib/utils';

// Templates
import notfoundTpl from '../views/notfound.tpl.html';
import stateTreeTpl from '../views/statetree.tpl.html';

// Create a devtools panel
chrome.devtools.panels.create("FlowDown",
    "",
    "panel.html",
    function(panel) {
        console.log({
            panel,
        });

        // Initialize
        panel.onShown.addListener(function(devpane) {
            const $ = devpane.document.querySelectorAll.bind(devpane.document);
            const ui = new UI($('.display')[0]);

            const notfoundView = viewsFactory.getView(notfoundTpl);
            const stateTreeView = viewsFactory.getView(stateTreeTpl);

            let stateCache = null;
            let delta = null;

            // Poll for store
            function poll() {
                chrome.devtools.inspectedWindow.eval(
                    "window.__flowDownStores__ !== undefined ? window.__flowDownStores__.get(0).getState() : null",
                    function(result, exceptionInfo) {
                        if (result) {
                            if (JSON.stringify(result) !== JSON.stringify(stateCache)) {
                                delta = diff(result, stateCache);
                                stateCache = Object.assign({}, result);

                                const str = JSON.stringify(result, null, 4);
                                const status = JSON.stringify(delta, null, 4);

                                ui.present(stateTreeView.render({
                                    payload: highlightSyntax(str),
                                    status,
                                }));
                            }
                        } else {
                            console.debug(exceptionInfo);
                            ui.present(notfoundView.render());
                        }
                    }
                );
                setTimeout(() => {
                    requestAnimationFrame(poll);
                }, 50);
            }

            // Start
            poll();
        });
    }
);
