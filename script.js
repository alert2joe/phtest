Common = {}
Common.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}



Command = {
    location: function(t, taxRateLists) {
        locationCode = t.replace("Location:", "");
        return locationCode.trim();
    },
    productsList: function(products) {

        var list = products.map(function(x) {

            var part = x.match(/(\d+) (.+) at ([.0-9]+)/);
            if (part.length != 4) {
                return false;
            }
            return {
                qty: parseInt(part[1]),
                name: part[2],
                price: parseFloat(part[3])
            };
        })
        return list;
    },
    getData: function(inputCode) {
        if (!inputCode) {
            return false;
        }
        var res = inputCode.split(",");
        if (res.length < 2) {
            return false;
        }
        var location = Command.location(res[0]);
        var products = Command.productsList(res.slice(1));

        products = products.map(function(p) {
            p.code = M_productCategories.getProductCode(p.name);
            return p;
        })


        if (location === false || M_taxRate.isValidLocation(location) === false) {
            return false;
        }

        if (products === false || M_productCategories.isValidProducts(products) === false) {
            return false;
        }

        return { location: location, products: products }
    }
}



getTax = function(inputData) {
    var location = inputData.location;
    var taxSum = inputData.products.reduce(function(accumulator, currentValue) {
        var taxType = M_productCategories.getTaxType(currentValue.code);

        var rate = M_taxRate.isExemptType(location, taxType) ? 0 : M_taxRate.getTaxRate(location);

        var roundup = function(num) {
            //rounded up to the nearest 0.05 (e.g. 1.13->1.15, 1.16->1.20, 1.151->1.20)
            return Math.ceil(num * 10 * 2) / 10 / 2;
        }

        var tax = roundup(currentValue.price * currentValue.qty * rate);

        return tax + accumulator;
    }, 0);

    return taxSum;
}