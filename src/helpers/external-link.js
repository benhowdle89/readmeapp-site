export default async url => {

  let result = { 
    externalLink: {
      image: '',
      title: '',
      description: '',
      site: '',
      link: '',
    },
    showExternal: false,
    showExtImage: false
  }

  const yql = `select * from htmlstring where url='${url}' AND xpath='/html/head/meta'`
  const queryUrl = `//query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(yql)}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
  const data = await fetch(queryUrl)
  const meta = await data.json()
  if (meta.query.results) {
    let metaString = `<html><head>${meta.query.results.result}</head><body></body>`
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(metaString, "text/xml")
    let metas = htmlDoc.getElementsByTagName('meta')
    result.externalLink.site = url
    result.externalLink.link = url
    for(let metaTag of metas) {
      if(metaTag.getAttribute("property") == "og:image") {
        result.externalLink.image = metaTag.getAttribute("content")
        result.showExtImage = true
      }
      if(metaTag.getAttribute("property") == "og:title") {
        result.externalLink.title = metaTag.getAttribute("content").substring(0,60) + '…'
      }
      if(metaTag.getAttribute("property") == "og:description") {
        result.externalLink.description = metaTag.getAttribute("content").substring(0,60) + '…'
      }
      if(metaTag.getAttribute("property") == "og:site_name") {
        result.externalLink.site = metaTag.getAttribute("content").toLowerCase()
      }
    }
    if(result.externalLink.title) {
      result.showExternal = true
    }
  }
  return result
}
