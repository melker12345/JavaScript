let lookup = function (obj, key) {
    if (obj.hasOwnProperty(key)) {
        console.log(obj[key]);
    }
};
lookup({ a: 1, b: 2, c: 3 }, "b");
