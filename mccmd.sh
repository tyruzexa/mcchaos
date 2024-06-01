#!/usr/bin/bash

color_map_json='{                         
  "summon": "green",                                   
  "kill": "red",
  "effect": "dark_aqua",
  "fill": "blue",
  "teleport": "gold",
  "jackpot!": "purple",
  "give": "lime",
  "particle": "cyan",
  "structure": "orange",
  "gamemode": "yellow"
}'
### note- this isn't actually used in this script


# Read the JSON file and get the length of the array
array_length=$(jq '. | length' randomcommands.json)

echo "There are $array_length items"

# Generate a random index within the range of the array length
random_index=$((RANDOM % array_length))


# Select the element at the random index
random_command=$(jq -r --argjson index "$random_index" '.[$index]' randomcommands.json)
echo "$random_index" > "$chaosp/randindex.txt"


TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")


# Path to the output JSON file


# Write the number to the JSON file
echo "{\"number\": $random_index, \"timestamp\": \"$TIMESTAMP\"}" > $JSON_FILE

#### the JSON Files needs to be writeable -- so double check this


# Extract the name and command attributes
mysayname=$(echo "$random_command" | jq -r '.subtitle')
mccmd=$(echo "$random_command" | jq -r '.command')
mytitle=$(echo "$random_command" | jq -r '.title')
titlecolor=$(echo "$random_command" | jq -r '.color')

random_number=$((RANDOM % 255))
mccmd="${mccmd//!RANDOM/$random_number}"

random_number=$((RANDOM % 255))
mccmd="${mccmd//%RANDOM/$random_number}"

random_number=$((RANDOM % 4))
mccmd="${mccmd//!LVL/$random_number}"


# Print the selected name and command
echo "Command: $mccmd"



mysay="title @a title {\"text\":\"$mytitle\",\"color\":\"$titlecolor\"}"
mysay2="title @a subtitle {\"text\":\"$mysayname\",\"color\":\"white\"}"

echo $mysay

sleep 6.5

curl  -H  "Authorization: Bearer $token" -X POST $serveraddr/api/v2/servers/$serverid/stdin  -d "$mysay"
curl  -H  "Authorization: Bearer $token" -X POST $serveraddr/api/v2/servers/$serverid/stdin  -d "$mysay2"



#sleep 1



sleep 0.1
# Read each item in the JSON array to an item in the Bash array
readarray -t my_array < <(echo "$mccmd" | jq --compact-output -r '.[]')


for item in "${my_array[@]}"; do
    echo "$item"
    echo $item
    if [[ $item == *"!SLEEP"* ]]; then
        sleep 30
    else
        curl  -H  "Authorization: Bearer $token" -X POST $serveraddr/api/v2/servers/$serverid/stdin   -d "$item"
        sleep 0.1
    fi


done