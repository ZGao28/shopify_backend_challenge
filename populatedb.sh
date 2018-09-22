# Creating shops

./run_curl_shopify.sh '{"shopname": "BestBuy", "description": "A tech shop that sells tech stuff"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Blockbuster", "description": "The largest chain DVD rental store ;)"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "description": "An expensive store for people that want clout"}' api/create_shop


# Populating shops
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "keychain", "price": 250}' api/add_product
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "leather wallet", "price": 1500}' api/add_product


# Population shops line items and such
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "quantity": 2, "detail": "black"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "quantity": 1, "detail": "black", "orderID": "28372"}' api/add_lineitem
