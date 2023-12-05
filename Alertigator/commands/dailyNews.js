const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dailynews')
    .setDescription('Get daily trending news articles')
    .addIntegerOption((option) => option
      .setName('count')
      .setDescription('Number of articles to fetch')
      .setRequired(true)),

  async execute(interaction) {
    const count = interaction.options.getInteger('count');

    // check if count parameter to see if it exceeds the maximum limit
    if (count > 4) {
      interaction.reply('The maximum number of articles I can fetch is 4!');
      return;
    }

    // fetch news articles from NewsAPI and send as a response
    const apiKey = 'd75977b59ee04968ba54db326262277f';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${count}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const { articles } = response.data;

      if (articles.length > 0) {
        const articleText = articles.map((article, index) => `${index + 1}. [${article.title}](${article.url})\n${article.description}`).join('\n\n');

        interaction.reply({
          content: 'Here are the trending news articles:',
          embeds: [
            {
              title: 'Trending News Articles',
              description: articleText,
              color: 0x3498db,
            },
          ],
        });
      } else {
        interaction.reply('No news articles found.');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      interaction.reply('An error occurred while fetching news articles.');
    }
  },
};
