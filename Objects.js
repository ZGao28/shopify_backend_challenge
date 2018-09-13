exports.Shop = class {
    constructor(){
        this.products = {};
        this.orders = {};
    }
}

exports.Order = class {
    constructor(lineItems) {
        this.lineItems = lineItems;
        this.total = 0;
        for (let i = 0; i < this.lineItems.length; i++){
            this.total += this.lineItems[i].value;
        }
    }
}


exports.Product = class {
    constructor(value, name, quantity) {
        this.value = value;
        this.name = name;
        this.quantity = quantity;
    }
}

exports.LineItem = class {
    constructor(product, ) {
        this.name = product.name;
        this.value = product.value;
    }
}
