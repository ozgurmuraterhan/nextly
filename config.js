
const jsonConfig = {

    API_URL: "http://localhost:5000",
    WEBSITE_URL: "http://localhost:3000",
    IMG_URL: "http://localhost:5000",

    maillerConfig: {
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        // tls: { rejectUnauthorized: true },
        service: 'Gmail',
        auth: {
            user: 'noreplytryco@gmail.com',
            pass: 'sagopakajmer38'
        }
    },

    languageData: [
        {
            languageId: 'english',
            locale: 'en',
            name: 'English',
            icon: 'us'
        },
        {
            languageId: 'turkish',
            locale: 'tr',
            name: 'Türkçe',
            icon: 'tr'
        },

    ],

    defaultLanguage: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us'
    }
}

if (process.env.NODE_ENV == 'development') {
    jsonConfig.API_URL = "http://localhost:5000"
    jsonConfig.WEBSITE_URL = "http://localhost:3000"
    jsonConfig.IMG_URL = "http://localhost:5000"
}


module.exports = jsonConfig