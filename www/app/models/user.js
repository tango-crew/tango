var User = (function () {
    function User() {
    }
    User.prototype.avatar = function () {
        if (this.integration_type === 1) {
            return "https://graph.facebook.com/" + this.integration_id + "/picture?width=400&height=400";
        }
        else {
            return null;
        }
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map