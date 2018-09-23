# shopify_backend_challenge
For the Shopify 2019 Winter Backend Challenge

## API Design and Thought Process
I built all the APIs around what I thought would be useful and realistic for an actual app.

E.G. 
You cannot add line item to order if that line item is not in products

Adding a line item to order results in decrease in stock of line item in products

Before I started working on any of the backend, I created a quick UX/UI diagram, and labeled things that would be required for the backend to do. I was going to also throw together a quick front end with React but ran out of time.

1. Create a shop, with name and description

2. Ability to add, edit, remove, get products and orders once shop is created

3. Ability to add and remove line items to products and orders once they exist



## Documentation

Mongo Layout:

```
shops: {
          {
            shopname: The shop's name (string),
            description: The shop's description (string),
            products: {
              productName: {
                productname: product's name (e.g. Belt) (string),
                price: product's price (number),
                lineitems: {
                  lineitemDetail: {
                    productname: product's name (string),
                    detail: detail of line item (e.g. color, sizing) (string)
                    quantity: stock of the lineitem (number)
                    price: same as the product price (number)
                  }
                }
              }
            }
            orders: {
              orderID: {
                id: order's id (e.g. 30005) (string),
                totalprice: order's total price (number),
                lineitems: {
                  lineitemDetail, productname: {
                    productname: product's name (string),
                    detail: detail of line item (e.g. color, sizing) (string)
                    quantity: stock of the lineitem (number)
                    price: same as the product price (number)
                  }
                }
              }
            }
          }
       }

```




### Interacting with shops:

###### Get All

Get request to <url>/api/getAll

Returns: JSON object with all shops


###### Get Shop

Get request to <url>/api/get_shop/<shopname>

Returns: JSON object with all properties of shop

###### Add Shop

Post request to <url>/api/create_shop

Send JSON with request in following format: '{"shopname": "some shop name", "description": "some description"}'

Returns: Status message

Action: Adds shop, if shop with specified name is already present, no shop will be added.

###### Edit Shop

Post request to <url>/api/edit_shop

Send JSON with request in following format: '{"shopname": "some shop name", "newname": "new name here", "description": "some description"}'

Returns: Status message

Action: Edits shop name and description, If no shop with name specified, no shop will be edited.

###### Delete Shop

Post request to <url>/api/remove_shop

Send JSON with request in following format: '{"shopname": "some shop name"}'

Returns: Status message

Action: Deletes shop



### Interacting with products:

###### Get Products

Get request to <url>/api/get_products/<shopname>

Returns: JSON object with all products of shop

###### Add Product

Post request to <url>/api/add_product

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product", "price": price value here}'

Returns: Status message

Action: Adds product, but specified shop must exist! If product with specified name is already present, no product will be added.

###### Edit Product

Post request to <url>/api/edit_shop

Send JSON with request in following format: '{"shopname": "some shop name", "newname": "new name here", "productname": "old name", "price": new price}'

Returns: Status message

Action: Edits product price and name, **And also deletes line items due to price and name change!** If no shop or product with name specified, nothing will be edited.

###### Delete Product

Post request to <url>/api/delete_product

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product name"}'

Returns: Status message

Action: Deletes product


### Interacting with orders:

###### Get orders

Get request to <url>/api/get_orders/<shopname>

Returns: JSON object with all orders of shop

###### Add Order

Post request to <url>/api/add_order

Send JSON with request in following format: '{"shopname": "some shop name", "orderID": "some id"}'

Returns: Status message

Action: Adds order, but specified shop must exist! If order with specified id is already present, no order will be added.


###### Delete Order

Post request to <url>/api/delete_order

Send JSON with request in following format: '{"shopname": "some shop name", "orderID": "some id"}'

Returns: Status message

Action: Deletes order


### Interacting with Line Items:

###### Add Line Item To Product

Post request to <url>/api/add_lineitem

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product name", "detail": "some unique detail", "quantity": stock}'

Returns: Status message

Action: Adds line item to product, but **the product must exist in the shop specified**! If line item with specified detail is already present, **The stock will be increased by the incoming quantity**.


###### Add Line Item To Order

Post request to <url>/api/add_lineitem

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product name", "detail": "some unique detail", "quantity": stock, "orderID": "some order id"}'

Returns: Status message

Action: Adds line item to order, but **the corresponding product line item must exist, and have sufficient stock in the shop specified**! If line item with specified detail is already present, **the stock will be increased by the incoming quantity**. Also, **stock of product line item will decrease by quantity from order**

###### Delete Line item from Product

Post request to <url>/api/remove_lineitem

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product name", "detail": "some unique detail"}'

Returns: Status message

Action: Deletes line item from product

###### Delete Line item from Product

Post request to <url>/api/remove_lineitem

Send JSON with request in following format: '{"shopname": "some shop name", "productname": "some product name", "detail": "some unique detail", "orderID": "some order id"}'

Returns: Status message

Action: Deletes line item from order specified. Also, **stock of product line item will increase by quantity from order**
