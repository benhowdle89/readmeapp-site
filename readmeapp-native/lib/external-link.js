const { DOMParser } = require("react-native-html-parser");
import axios from "axios";

export default async url => {
  let result = {
    externalLink: {
      image: "",
      title: "",
      description: "",
      site: "",
      link: ""
    },
    showExternal: false,
    showExtImage: false
  };

  const yql = `select * from htmlstring where url='${url}' AND xpath='/html/head/meta'`;
  const queryUrl = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(
    yql
  )}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
  const meta = await axios.get(queryUrl);
  if (meta.data.query.results) {
    let metaString = `<html><head>${
      meta.data.query.results.result
    }</head><body></body>`;
    let doc = new DOMParser().parseFromString(metaString, "text/html");
    let metas = doc.getElementsByTagName("meta");
    result.externalLink.site = url;
    result.externalLink.link = url;
    Array.from(metas).forEach(metaTag => {
      if (metaTag.getAttribute("property") == "og:image") {
        result.externalLink.image = metaTag.getAttribute("content");
        result.showExtImage = true;
      }
      if (metaTag.getAttribute("property") == "og:title") {
        result.externalLink.title =
          metaTag.getAttribute("content").substring(0, 60) + "…";
      }
      if (metaTag.getAttribute("property") == "og:description") {
        result.externalLink.description =
          metaTag.getAttribute("content").substring(0, 60) + "…";
      }
      if (metaTag.getAttribute("property") == "og:site_name") {
        result.externalLink.site = metaTag
          .getAttribute("content")
          .toLowerCase();
      }
    });

    if (result.externalLink.title) {
      result.showExternal = true;
    }
  }
  return result;
};
