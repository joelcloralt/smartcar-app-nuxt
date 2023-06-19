const axios = require('axios');
const qs = require('qs');

exports.handler = async function(event, context) {
  // Parse the 'code' from the query string
  const { code } = event.queryStringParameters;

  // Token endpoint for your service, this should be replaced with your actual token endpoint
  const tokenURL = 'https://auth.smartcar.com/oauth/token';

  // The client_id and client_secret for your application on the service
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  try {
    // Send a POST request to the token endpoint
    const response = await axios.post(
      tokenURL,
      qs.stringify({
        client_id,
        client_secret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Extract the access_token from the response
    const { access_token } = response.data;

    // Redirect to the specified URL with the token appended as a query parameter
    return {
      statusCode: 302,
      headers: {
        Location: `${process.env.REDIRECT_URI}?token=${access_token}`
      }
    };
  } catch (error) {
    console.error('Error exchanging code for token:', error.message);

    // Respond with a 500 status code (Server Error) if anything went wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' })
    };
  }
};
