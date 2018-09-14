let Adidas = {
    products: {
        'Running Shoes': {
            lineitems: [
                {
                    size: '9',
                    style: 'black',
                    quantity: 20,
                },
                {
                    size: '2',
                    style: 'black',
                    quantity: 24,
                }
            ]
        },
        'Shirt': {
            lineitems: [
                {
                    size: 'Small',
                    style: 'white',
                    quantity: 20,
                },
                {
                    size: 'Medium',
                    style: 'black',
                    quantity: 24,
                }
            ]
        }

    },
    orders: {
        2394213: {
            lineitems: {
                'Shirt': {
                    size: 'Small',
                    quantity: 2,
                    price: 29.00
                }
            }
        },
        2392553: {
            lineitems: {
                'Shirt': {
                    size: 'Small',
                    quantity: 1,
                    price: 29.00
                },
                'Running Shoes': {
                    size: 9,
                    quantity: 1,
                    price: 53.00
                }
            }
        }

    }
}