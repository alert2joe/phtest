var M_taxRate = {};


M_taxRate.data = {
    CA: { rate: 0.0975, exempt: ['food'] },
    NY: { rate: 0.08875, exempt: ['food', 'clothing'] }
}

M_taxRate.isValidLocation = function(l) {
    return M_taxRate.data[l] !== undefined;
}

M_taxRate.getTaxRate = function(location) {

    return M_taxRate.data[location].rate;
}

M_taxRate.isExemptType = function(location, ptype) {
    var isExempt = M_taxRate.data[location].exempt.filter(function(p) {
        return p === ptype;
    })
    return isExempt.length !== 0;
}