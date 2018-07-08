var View = {
    getSubtotal: function(item) {
        var subtotal = item.reduce(function(accumulator, eachProduct) {
            var totalPrice = eachProduct.price * eachProduct.qty
            return totalPrice + accumulator;
        }, 0);
        return subtotal;
    },

    render: function(ReceiptData) {
        ReceiptData.subtotal = View.getSubtotal(ReceiptData.item);
        ReceiptData.total = ReceiptData.subtotal + ReceiptData.tax;
        var context = View.formatData(ReceiptData);


        var html = View.getTemplate(context);
        View.appendHtml(html)

    },
    getTemplate: function(context) {

        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(context);
        return html;
    },
    formatData: function(ReceiptData) {
        ReceiptData.subtotal = View.priceStyle(ReceiptData.subtotal);
        ReceiptData.total = View.priceStyle(ReceiptData.total);
        ReceiptData.tax = View.priceStyle(ReceiptData.tax);
        ReceiptData.item = ReceiptData.item.map(function(a) {
            a.price = View.priceStyle(a.price);
            return a;
        })
        return ReceiptData;
    },
    priceStyle: function(a) {
        return '$' + a.toFixed(2);
    },
    appendHtml: function(h) {
        document.getElementById("Receipt").innerHTML = h;
    },
    renderErr: function() {
        View.appendHtml('Input Error');
    }


}