export default defineEventHandler(async (event) => {
  const config = useAppConfig()

  const blogs = await queryCollection(event, 'blogs').order('date', 'DESC').limit(20).all()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.title || 'Bobby Lin - Full Stack Engineer'}</title>
    <description>${config.description || 'Latest blog posts from Bobby Lin'}</description>
    <link>${getRequestURL(event).origin}</link>
    <atom:link href="${getRequestURL(event).origin}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Nuxt Content</generator>
    
    ${blogs?.map((blog: any) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <description><![CDATA[${blog.description || ''}]]></description>
      <link>${getRequestURL(event).origin}/blogs/${blog._path?.replace('/blogs/', '')}</link>
      <guid isPermaLink="true">${getRequestURL(event).origin}/blogs/${blog._path?.replace('/blogs/', '')}</guid>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      ${blog.author?.name ? `<author>${blog.author.name}</author>` : ''}
      ${blog.image ? `<enclosure url="${blog.image}" type="image/jpeg"/>` : ''}
    </item>
    `).join('') || ''}
  </channel>
</rss>`

  // 设置响应头
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'max-age=3600')

  return rss
})
