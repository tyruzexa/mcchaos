# Minecraft Chaos Mode

In order to use this, you'll need a server running with Crafty Controller.  The commands wwe have here are tailored for java, but all of the code here will work no matter whether you are using vanilla, java, bedrock, or moded servers.

to get full effect, you'll need the following:

## Environment
- Crafty Controller
- A webserver of some sort (if you want the spinner)
  -- we used Caddy as our webserver, but compiled with a python CGI plugin.
- Systemd
- Python3
- Java Minecraft (or two)
- a sane Shell environment (we used stock debian bookworm)


# notes:
I'm running under controlled environment (all the severs are behind a common firewall). Security isn't that big a push, so one could do much better




# The CHAOS file
``
  {
    "subtitle": "this text is dispayed in the screen smaller",
    "title": "the short title or category of the command",
    "command": [
      "here, an array of commands sent to Crafty Controller",
      "no slashes needed for some reason",
      "Crafty will wait between each one",
      "I also have some built in substuttions to randomize the results"
    ],
    "color": "red"
  },
``


# usage
Deployment can be as simple as using Ansible- I've included a playbook that will deply to your sever of choice. There is a user-space systemd plugin, which can handle the initialization and scheduling of the timer. You could install it as a root service, but it made more sense to me in user space.

In order to pipe standard input command to Crafty Controller, you first need to establish a token from the server. I have it set up to login with plain text, and store the token in an environment variable, from the intialization systemd serverice, which is then used by the timer server to connect each time.

You'll need to specify the full UUID path to the server you want to use. In principle, you could have more than one server running, but the systemd service assumes you only have one.

There is also a simple webpage with some custom CSS and Javascript that will render a spinner that will make it a little more fun. Use case we tried was having a second screen display the spinner while we played the game. It certainly made for a more exciting experience.

The webpage is totally optional, and once you have the environment variables all setup, you could also simply run the mcchaos.sh 
