// /lib/sanity.js
import sanityClient from '@sanity/client';

// See the image above on how to get your projectId and add a new API token
// I added one called "landing page"
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
  apiVersion: '2022-01-20',
});

export default client;