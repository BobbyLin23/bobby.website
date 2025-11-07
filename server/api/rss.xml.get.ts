export default defineEventHandler(async (event) => {
  const config = useAppConfig()
  const baseURL = getRequestURL(event).origin

  const blogs = await queryCollection(event, 'blogs').order('date', 'DESC').limit(20).all()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(config.title || 'Bobby Lin - Full Stack Engineer')}</title>
    <description>${escapeXml(config.description || 'Latest blog posts from Bobby Lin')}</description>
    <link>${baseURL}</link>
    <atom:link href="${baseURL}/api/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Nuxt Content</generator>
    ${(blogs || []).map((blog: any) => {
      const blogPath = blog._path?.replace(/^\/blogs\//, '') || blog._id
      const blogURL = `${baseURL}/blogs/${blogPath}`

      return `
    <item>
      <title><![CDATA[${blog.title || 'Untitled'}]]></title>
      <description><![CDATA[${blog.description || ''}]]></description>
      <link>${blogURL}</link>
      <guid isPermaLink="true">${blogURL}</guid>
      <pubDate>${blog.date ? new Date(blog.date).toUTCString() : new Date().toUTCString()}</pubDate>
      ${blog.author?.name ? `<dc:creator><![CDATA[${blog.author.name}]]></dc:creator>` : ''}
      ${blog.image ? `<enclosure url="${escapeXml(blog.image)}" type="image/jpeg"/>` : ''}
    </item>`
    }).join('')}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return rss
})

function escapeXml(unsafe: string): string {
  if (!unsafe)
    return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
