const jsonConfig = {
  API_URL: "https://backend.nextly.shop",
  WEBSITE_URL: "https://nextly.shop",
  IMG_URL: "https://backend.nextly.shop",

  maillerConfig: {
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // tls: { rejectUnauthorized: true },
    service: "Gmail",
    auth: {
      user: "noreplytryco@gmail.com",
      pass: "sagopakajmer38",
    },
  },

  languageData: [
    {
      languageId: "english",
      locale: "en",
      name: "English",
      icon: "us",
    },
    {
      languageId: "turkish",
      locale: "tr",
      name: "Türkçe",
      icon: "tr",
    },
  ],

  defaultLanguage: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
};

if (process.env.NODE_ENV == "development") {
  jsonConfig.API_URL = "http://localhost:5001";
  jsonConfig.WEBSITE_URL = "http://localhost:3001";
  jsonConfig.IMG_URL = "http://localhost:5001";
}

module.exports = jsonConfig;
