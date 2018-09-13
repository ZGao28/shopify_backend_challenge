exports.Shop = class {
    constructor(){
        this.products = 'lol';
        this.orders = [];
    }
}

exports.Order = class {
    constructor(_lineItems) {
        this.lineItems = _lineItems;
        this.total = 0;
        for (let i = 0; i < this.lineItems.length; i++){
            this.total += this.lineItems[i].value;
        }
    }
}

exports.Product = class {
    constructor(_value, _name, _quantity) {
        this.value = _value;
        this.name = _name;
        this.quantity = _quantity;
    }
}

exports.LineItem = class {
    constructor(_product) {
        this.name = _product.name;
        this.value = _product.value;
    }
}
