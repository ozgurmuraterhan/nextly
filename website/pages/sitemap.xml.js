import React, { useState, useEffect } from 'react';

import axios from "axios"
import { API_URL, WEBSITE_URL } from "../../config"

import fs from "fs";

const Sitemap = () => { };

export const getServerSideProps = async ({ res }) => {

  const resDataProducts = await axios.get(`${API_URL}/productspublic/all`)
  const resDataTopmenu = await axios.get(`${API_URL}/topmenupublic/not`)

  console.log("resDataTopmenu", resDataTopmenu)
  function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
  }
  const baseUrl = WEBSITE_URL;

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "homepage.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((url) => {
        return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
          `;
      })
      .join("")}

      ${resDataTopmenu.data
      .map((url) => {
        return `
                <url>
                  <loc>${url?.link.replaceAll(" ", "") !== "" ? WEBSITE_URL + escapeHtml(url.link) : WEBSITE_URL + "/" + url.seo}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>0.9</priority>
                </url >
              `;
      })
      .join("")}

      ${resDataProducts.data
      .map((url) => {
        return `
                <url>
                  <loc>${WEBSITE_URL}/${url.seo}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1</priority>
                </url>
              `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};



export default Sitemap;