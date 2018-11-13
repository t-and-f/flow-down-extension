# flow-down-extension

A chrome extension for flow down

### Installing

Clone then `yarn`.

## Deployment

- Build with `yarn webpack`.

- Hot reload (continuous build) with `yarn watch`.

- Open up `chrome://extensions/` in your browser.

- Click `“Developer mode”`.

- Click `“Load unpacked extension…”`.

- Select the extension’s directory `(/dist)`.

- The extension automatically tries to detect a `flow-down` store.

## General

- To refresh, if modifying the layout alone, simply close the `devtools` and reopen them.

- When modifying the manifest, the extension needs a full reload (from the `chrome://extensions` window).

- The new pane is added to all instances of DevTools. In *theory*, it should also be available when using remote debug on a web view.

## Future

As time permits:

- Tigther setup / full integration: *hook into the `createStore` method + proxy all the method calls on the original store.

- Resizable panes.

- Filterable / searchable views.

- Time travel.

- Payload injection.

- Actions view (view dispatch).

...
