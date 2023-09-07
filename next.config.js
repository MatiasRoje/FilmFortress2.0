/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    apiKey: process.env.TMDB_API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};
