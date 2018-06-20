'use strict';

function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function flattenArray(values) {
    return values.reduce(function (acc, currentValue) {
        if (Array.isArray(currentValue)) currentValue = flattenArray(currentValue);
        return acc.concat(currentValue);
    }, []);
}


function sortArrayByOccurrences(values) {
    // Map occurrences
    var occurObj = values.reduce(function (acc, currentValue) {
        acc[currentValue] = (acc[currentValue]) ? acc[currentValue] + 1 : 1;
        return acc;
    }, {});

    // Sortable array
    var sortable = [];
    for (var item in occurObj) {
        sortable.push([item, occurObj[item]]);
    }

    // Sort the array
    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

    return occurObj;
}
