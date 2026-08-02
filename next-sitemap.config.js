/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://goddome.org',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  exclude: ['/admin', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
  },
};
