import OAuth from 'oauth';
import dotenv from 'dotenv';

dotenv.config();

console.log("CONSUMER_KEY:", process.env.SPLITWISE_CONSUMER_KEY);
console.log("CONSUMER_SECRET:", process.env.SPLITWISE_CONSUMER_SECRET);
console.log("CALLBACK_URL:", process.env.CALLBACK_URL);

export const oauth = new OAuth.OAuth(
  'https://secure.splitwise.com/api/v3.0/get_request_token',
  'https://secure.splitwise.com/api/v3.0/get_access_token',
  process.env.SPLITWISE_CONSUMER_KEY,
  process.env.SPLITWISE_CONSUMER_SECRET,
  '1.0A',
  process.env.CALLBACK_URL,
  'HMAC-SHA1'
);