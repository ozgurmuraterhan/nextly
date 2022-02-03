module.exports = {

    /// for server
    // API_URL: "https://backend.nextly.shop",
    // WEBSITE_URL: "https://nextly.shop",
    IMG_URL: "https://backend.nextly.shop",


    //for Locale
    API_URL: "http://localhost:5000",
    WEBSITE_URL: "http://localhost:3000",
    // IMG_URL: "http://localhost:3000",

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