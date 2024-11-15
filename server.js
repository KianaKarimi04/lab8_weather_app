const express = require("express");
const app = express();
const axios = require("axios");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get(`/weather`, async (req, res) => {
    console.log(req.query.city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=63f3c05bfc8de92422db12d6f77d759e&units=metric`
    axios
        .get(url)
        .then((response) => {
            const weatherData = {
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            };
            res.json(weatherData);
        })
        .catch((error) => {
            res.status(500).json({ error: "An error occurred" });
        });

    // console.log(response.data);
    // res.json(response.data)
})

app.listen(3000, () => {
    console.log(`the server is up and listening to the port 3000`);
})