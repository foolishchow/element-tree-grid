const indexOf = (val, arr) => {
    var has = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            has = i;
            break;
        }
    }
    return has;
}

const descendantsIds = (id, data, parentKey, treeKey) => {
    var result = [],
        compare = [id],
        length = -1;
    while (length != compare.length) {
        length = compare.length;
        data.forEach(function(item) {
            if (indexOf(item[parentKey], compare) > -1 && indexOf(item[treeKey], compare) == -1) {
                result.push(item[treeKey])
                compare.push(item[treeKey])
            }
        });
    }
    return result;
}
export default {
    indexOf,
    descendantsIds
}
