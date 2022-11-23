
export default defineEventHandler(async () => {
  const toolList: ApiResponse = await $fetch<ApiResponse>('https://api.zngg.net/portal/tool/1/99').then(res => res)
  let body = "";
  toolList.data.content.forEach((item: { content: string; updateTime: string; }) => {
    let url = "https://www.zngg.net/tool/detail/" + item.content
    body = body + "<url><loc>" + url + "</loc><lastmod>" + item.updateTime.substring(0, 10) + "</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>"
  });
  const articleList: ApiResponse = await $fetch<ApiResponse>('https://api.zngg.net/portal/article/1/999').then(res => res)
  articleList.data.content.forEach((item: { id: string; updateTime: string; }) => {
    let url = "https://www.zngg.net/read/post/" + item.id
    body = body + "<url><loc>" + url + "</loc><lastmod>" + item.updateTime.substring(0, 10) + "</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>"
  });

  body = body + "<url><loc>https://www.zngg.net/read</loc><lastmod>"+articleList.data.content[0].updateTime.substring(0, 10)+"</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>"
  body = body + "<url><loc>https://www.zngg.net/tool</loc><lastmod>"+toolList.data.content[0].updateTime.substring(0, 10)+"</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>"
  body = body + "<url><loc>https://www.zngg.net/</loc><lastmod>"+articleList.data.content[0].updateTime.substring(0, 10)+"</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>"
  let result = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + body + '</urlset>'
  return result;
})
