import {
    template
} from 'lodash';

class viewsFactory {
    static getView(tpl) {
        return {
            render: template(tpl),
        };
    }
}

export default viewsFactory;
