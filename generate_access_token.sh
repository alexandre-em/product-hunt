#!/bin/sh

source ./.env

json=$(curl --header "Content-Type: application/json" \
        --request POST \
        --data "{\"client_id\":\"${PRODUCT_HUNT_API_KEY}\",\"client_secret\":\"${PRODUCT_HUNT_API_SECRET}\", \"grant_type\": \"client_credentials\"}" \
    https://api.producthunt.com/v2/oauth/token)

IFS=',' read -r -a array <<< "$json"
IFS=':' read -r -a token <<< "${array[0]}"
IFS='"' read -r -a value <<< "${token[1]}"

echo "PRODUCT_HUNT_TOKEN=${value[1]}" >> .env

cp .env ./back/
