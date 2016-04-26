let chai = require('chai').use(require('chai-as-promised'));

class World {
    public expect:any;
    constructor() {
        this.expect = chai.expect;
        browser.ignoreSynchronization = true;
    }
}

export = function () {
    this.World = World;
};
