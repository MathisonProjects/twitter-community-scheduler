const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const schedule = require('node-schedule');
const data = require('./data.json');
const fs = require('fs').promises;
const path = require('path');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function uploadMedia(mediaPaths) {
  const mediaIds = [];
  for (const mediaPath of mediaPaths) {
    const mediaData = await fs.readFile(path.join(__dirname, `images/${mediaPath}`));
    const mediaId = await client.v1.uploadMedia(mediaData, { mimeType: 'image/jpeg' });
    mediaIds.push(mediaId);
  }
  return mediaIds;
}

async function postTweetToCommunity(status, mediaPaths) {
  try {
    const mediaIds = await uploadMedia(mediaPaths);
    const tweet = await client.v2.tweet({
      community_id: process.env.TWITTER_COMMUNITY_ID,
      text: status,
      media: { media_ids: mediaIds }
    });
    console.log('Tweet posted successfully to community:', tweet);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

const readline = require('readline');

function scheduleTweet(status, mediaPaths, date) {
  schedule.scheduleJob(date, function() {
    postTweetToCommunity(status, mediaPaths);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledData = shuffleArray(data).slice(0, 4);


shuffledData.forEach(item => {
  const status = item.status;
  const mediaPaths = item.media || [];
  rl.question('At what time should we post this tweet? (HH:MM format) ', (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    scheduleTweet(status, mediaPaths, date);
  });
});
