const METHOD = 'http',
    IP = 'localhost',
    PORT = process.env.PORT || 6968,
    FE_PORT = process.env.R_PORT || 6969,
    HOST = "mongodb://localhost:27017/hrms",
    URL = METHOD + "://" + IP,
    URI = URL + ":" + PORT;

module.exports = {
	"METHOD" : METHOD,
    "IP": IP,
    "PORT": PORT,
    "FE_PORT": FE_PORT,
    "mongodb" : {
        "host": HOST,
        "credentials": {
            "username": "",
            "password": ""
        }
    },
    "enableMongoDebugging": true,
    "session": {
        "secret": "HRMS"
    },
    "URL": URL,
    "URI": URI
}