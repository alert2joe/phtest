var M_productCategories = {}
M_productCategories.data = [
    { code: 'book', taxType: 'other', name: ['book'] },
    { code: 'pencil', taxType: 'other', name: ['pencils', 'pencil'] },
    { code: 'potato chips', taxType: 'food', name: ['potato chips'] },
    { code: 'shirt', taxType: 'clothing', name: ['shirt'] }
]
M_productCategories.isValidProduct = function(l) {
    filterByCode = M_productCategories.data.filter(function(p) {
        return p.code === l;
    })
    return filterByCode.length != 0;
}

M_productCategories.isValidProducts = function(ps) {
    validProductList = ps.filter(function(p) {
        return M_productCategories.isValidProduct(p.code);
    })

    return validProductList.length == ps.length;
}

M_productCategories.getProductCode = function(pn) {
    var filterByMatchName = M_productCategories.data.filter(function(p) {
        return p.name.indexOf(pn) !== -1;
    })
    if (filterByMatchName.length === 0) {
        return false;
    }
    return filterByMatchName[0].code;
}

M_productCategories.getTaxType = function(pcode) {

    filterByCode = M_productCategories.data.filter(function(p) {
        return p.code === pcode;
    })
    if (filterByCode.length == 0) {
        return false;
    }
    return filterByCode[0].taxType;
}