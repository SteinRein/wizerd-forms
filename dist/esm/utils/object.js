export var ObjValues = function (obj) {
    return (!Object.values) ?
        Object.keys(obj).map(function (e) { return obj[e]; }) :
        Object.values(obj);
};
export var ObjEntries = function (obj) {
    return (!Object.entries) ?
        Object.keys(obj).map(function (key) { return [key, obj[key]]; }) :
        Object.entries(obj);
};
//# sourceMappingURL=object.js.map