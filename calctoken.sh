if [ "$1" = "stop" ]; then
    echo "token=0" > "$chaosp/token.env"
    exit 0
else
    response=$(curl -s "$serveraddr/api/v2/auth/login" \
        -d "{\"username\":\"$cuser\", \"password\":\"$cpass\"}")

    if [[ $? -ne 0 ]]; then
        echo "Failed to connect to the server."
        exit 1
    fi

    token=$(echo "$response" | jq .data.token -r)

    if [[ -z "$token" || "$token" == "null" ]]; then
        echo "Failed to retrieve token."
        echo "Response: $response"
        exit 1
    fi

    export token
    echo "token=$token" > "$chaosp/token.env"
fi


