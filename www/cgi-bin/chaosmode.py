#!/usr/bin/python3

import cgi
import cgitb
import subprocess

cgitb.enable()  # Enable CGI error reporting

def get_service_status(service_name):
    """Get the status of a systemd service."""
    result = subprocess.run([ 'systemctl', 'is-active', service_name], capture_output=True, text=True)
    return result.stdout.strip()

def control_service(action, service_name):
    """Start or stop a systemd service."""
    result = subprocess.run([ 'systemctl', action, service_name], capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip()

print("Content-Type: text/html")  # HTML is following
print()  # End of headers

# Process form data
form = cgi.FieldStorage()
action = form.getvalue('action')

status_message = ""

if action:
    if action == "start":
        stdout, stderr = control_service('start', 'mcchaos.service')
        status_message = f"Start Service: {stdout if stdout else stderr}"
    elif action == "stop":
        stdout, stderr = control_service('stop', 'mcchaos.service')
        status_message = f"Stop Service: {stdout if stdout else stderr}"

# Get the current status of the service
service_status = get_service_status('mcchaos.service')

# HTML content
print("""
{% raw %}
<html>
<head>
    <title>Chaos Control</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }}
        .container {{
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            margin-top: 0;
        }}
        .status {{
            margin-bottom: 20px;
        }}
        .btn {{
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }}
        .btn:hover {{
            background-color: #0056b3;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Chaos Control</h1>
        <p class="status">Service Status: <strong>{}</strong></p>
        <form method="post" action="/cgi-bin/chaosmode.py">
            <button class="btn" name="action" value="start">Start Chaos</button>
            <button class="btn" name="action" value="stop">Stop Chaos</button>
        </form>
        <p>{}</p>
    </div>
</body>
</html>  {% endraw %}
""".format(service_status, status_message))
