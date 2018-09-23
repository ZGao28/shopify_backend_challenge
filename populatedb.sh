# Creating shops
./run_curl_shopify.sh '{"shopname": "BestBuy", "description": "A tech shop that sells tech stuff"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "description": "An expensive store for people that want clout"}' api/create_shop
./run_curl_shopify.sh '{"shopname": "MemeStore", "description": "Dont let your memes be dreams"}' api/create_shop
# Populating shops with products
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "plain tshirt", "price": 300}' api/add_product
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "price": 3000}' api/add_product
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "belt", "price": 2250}' api/add_product
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "price": 1250}' api/add_product
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "MacBookPro 15", "price": 3250}' api/add_product
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "price": 400}' api/add_product
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Air Pods", "price": 250}' api/add_product
./run_curl_shopify.sh '{"shopname": "MemeStore", "productname": "Pepe Face", "price": 100000}' api/add_product
./run_curl_shopify.sh '{"shopname": "MemeStore", "productname": "Pepe Poster", "price": 99999}' api/add_product
# Population shops with product line items
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "quantity": 15, "detail": "black"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "quantity": 5, "detail": "gold"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "iPhoneX", "quantity": 100, "detail": "silver"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "MacBookPro", "quantity": 125, "detail": "Spacegrey"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "MacBookPro", "quantity": 25, "detail": "Classic White"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "quantity": 200, "detail": "Sport Strap"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "quantity": 200, "detail": "Leather Strap"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "quantity": 200, "detail": "Vinyl Strap"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "quantity": 200, "detail": "Rose Gold"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Apple Watch", "quantity": 200, "detail": "Limited Edition"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "productname": "Air Pods", "quantity": 0, "detail": "Classic"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "plain tshirt", "quantity": 15, "detail": "small"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "plain tshirt", "quantity": 5, "detail": "medium"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "plain tshirt", "quantity": 100, "detail": "large"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "belt", "quantity": 125, "detail": "Brown"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "belt", "quantity": 25, "detail": "Black"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "quantity": 200, "detail": "Size 7"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "quantity": 200, "detail": "Size 8"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "quantity": 200, "detail": "Size 9"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "quantity": 200, "detail": "Size 10"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "productname": "classic shoe", "quantity": 200, "detail": "Size 11"}' api/add_lineitem
# Adding Orders
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001"}' api/add_order
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002"}' api/add_order
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30003"}' api/add_order
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50001"}' api/add_order
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50002"}' api/add_order
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50003"}' api/add_order
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50004"}' api/add_order
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50005"}' api/add_order
# Adding line items to Orders
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50001", "productname": "plain tshirt", "quantity": 2, "detail": "small"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50002", "productname": "plain tshirt", "quantity": 1, "detail": "large"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50003", "productname": "plain tshirt", "quantity": 1, "detail": "medium"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50004", "productname": "plain tshirt", "quantity": 1, "detail": "small"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50005", "productname": "classic shoe", "quantity": 3, "detail": "Size 9"}' api/add_lineitem

./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50001", "productname": "classic shoe", "quantity": 10, "detail": "Size 10"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50002", "productname": "classic shoe", "quantity": 12, "detail": "Size 11"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50003", "productname": "classic shoe", "quantity": 15, "detail": "Size 8"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50004", "productname": "classic shoe", "quantity": 2, "detail": "Size 9"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50005", "productname": "classic shoe", "quantity": 1, "detail": "Size 11"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50004", "productname": "belt", "quantity": 2, "detail": "Brown"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "Louis Vuitton", "orderID": "50005", "productname": "belt", "quantity": 1, "detail": "Black"}' api/add_lineitem

./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001", "productname": "iPhoneX", "quantity": 1, "detail": "black"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002", "productname": "iPhoneX", "quantity": 1, "detail": "gold"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30003", "productname": "iPhoneX", "quantity": 1, "detail": "silver"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001", "productname": "iPhoneX", "quantity": 1, "detail": "silver"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002", "productname": "iPhoneX", "quantity": 1, "detail": "silver"}' api/add_lineitem

./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001", "productname": "Apple Watch", "quantity": 2, "detail": "Leather Strap"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002", "productname": "Apple Watch", "quantity": 1, "detail": "Sport Strap"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30003", "productname": "Apple Watch", "quantity": 3, "detail": "Limited Edition"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001", "productname": "Apple Watch", "quantity": 2, "detail": "Rose Gold"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002", "productname": "Apple Watch", "quantity": 1, "detail": "Limited Edition"}' api/add_lineitem

./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30001", "productname": "MacBookPro", "quantity": 1, "detail": "Spacegrey"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30002", "productname": "MacBookPro", "quantity": 1, "detail": "Spacegrey"}' api/add_lineitem
./run_curl_shopify.sh '{"shopname": "BestBuy", "orderID": "30003", "productname": "MacBookPro", "quantity": 1, "detail": "Spacegrey"}' api/add_lineitem
