export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-x',
        'to': 'https://x.com/BobbyLin23',
        'target': '_blank',
        'aria-label': 'BobbyLin23 on X',
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/BobbyLin23',
        'target': '_blank',
        'aria-label': 'BobbyLin23 on GitHub',
      },
      {
        'icon': 'i-simple-icons-rss',
        'to': '/rss.xml',
        'target': '_blank',
        'aria-label': 'RSS Feed',
      },
    ],
  },
})
