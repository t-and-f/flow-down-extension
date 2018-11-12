class UI {
    constructor(node) {
        this.node = node;
    }

    empty() {
        const {
            node
        } = this;
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    present(snapshot) {
        this.node.innerHTML = snapshot;
    }
}

export default UI;
