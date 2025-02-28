/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.eurotvpro.com', // Change this to your domain
  generateRobotsTxt: true, // Generates robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  i18n: true, // Enable i18n support
  exclude:['/fr/orders','/en/orders','/de/orders','/es/orders','/ar/orders'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/orders'], // Block search engines from indexing this page
      },
    ],
  },
};
