export function compactUtils() {
    String.prototype.uppercaseFirst = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    String.prototype.checkRoute = function (string = "", index = 0) {
        return this.includes(string,index);
    };
}