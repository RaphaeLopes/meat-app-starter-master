"use strict";
exports.__esModule = true;
var User = (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "raphael@gmail.com": new User('raphael@gmail.com', 'Raphael', 'raphael123'),
    "Juliana@gmail.com": new User('Juliana@gmail.com', 'Juliana', 'juliana123')
};
