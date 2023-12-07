# Alertigator
CSCI 499 Capstone Project

# Instructions on how to start the bot
1. Create a discord server if you do not already have one
2. Paste the following link onto your browser: "https://discord.com/api/oauth2/authorize?client_id=1147989226852458556&permissions=441781316848&scope=bot%20applications.commands"
3. Once redirected to discord, select the server you want to add the bot to.
4. Check your channel permissions to see if Alertigator is allowed to be in the channel you want to use the bot in. 
5. After the bot is added to the channel, open the terminal and cd into the main folder
-  cd Alertigator-main
-  cd Alertigator (change directories into the main folder)
6. Install the dependencies and packages for the commands
- npm i 
- npm i node.js discord.js
7. Run "node commandsHandler.js" to refresh the slash commands
8. Then you can run "node ." to turn on the bot

# Discord Remind Bot

Features:

/help 
- Provides a list of commands and descriptions on how to use the commands

/remind
- Users can set a specific day for their reminder
- Time Format: MM/DD/YYYY 24:00 format
- User Mentions: Users can set a reminder for other users in the same server (or text channel)
- User Mentions: Enable users to mention other members when setting reminders for them to ensure they receive notifications.
- Hidden Reminder: Users can use a special indicator to hide their reminder command for a surprise reminder!

/countdown
- Users can count down from a specific number

/count 
- Users can make the bot count until they stop the count
- Users can make the bot count up to the number they included in the parameter

/convert
- Users can convert currency values

/currencylist
- Users can view which currency they can convert

/dailynews
- Users can grab daily popular news (max 4) 
