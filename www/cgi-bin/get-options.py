#!/usr/bin/python3
import json
# Set the Content-Type header to indicate JSON response
print("Content-Type: application/json")
print()


#I should make sure to use {{chaos_path}}

# Read the JSON data from the file
with open("{{chaos_path}}/randomcommands.json") as f:
    data = json.load(f)

# Output the JSON data
print(json.dumps(data))