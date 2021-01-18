export var maybeCastArray = function (data) {
    if (!Array.isArray(data)) {
        data = (data) ? [data] : [];
    }
    return data;
};
export default {
    maybeCastArray: maybeCastArray,
};
//# sourceMappingURL=array.js.map