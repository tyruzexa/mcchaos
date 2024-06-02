# Minecraft Chaos Mode
## Environment
- Crafty Controller
- A webserver of some sort (if you want)
- Systemd
- Python3
- Java Minecraft (or two)


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
