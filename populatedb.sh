./run_curl_shopify.sh '{"shopname": "BestBuy", "description": "A tech shop that sells tech stuff"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Blockbuster", "description": "The largest chain DVD rental store ;)"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "description": "An expensive store for people that want clout"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "keychain", "price": 250}' api/add_product
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "leather wallet", "price": 1500}' api/add_product