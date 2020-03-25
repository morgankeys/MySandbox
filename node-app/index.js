const https = require("https");

//API-request function
const requester = (route) => {
  const headers = {
    Accept: "application/json",
  };

  const apiUrl = `https://mattblackworld.com/api/${route}`

  https
    .get(apiUrl, { headers }, res => {
      const { statusCode } = res
      const contentType = res.headers["content-type"]

      let error
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          "Invalid content-type.\n" +
          `Expected application/json but received ${contentType}`
        );
      }
      if (error) {
        console.error(error.message)
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding("utf8")
      let rawData = ""
      res.on("data", chunk => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData)
          extractCountryData(parsedData, "United States of America")
        } catch (e) {
          console.error(e.message)
        }
      });
    })
    .on("error", e => {
      console.error(`Got error: ${e.message}`)
    });
};

// Call function
requester("countries");

const extractCountryData = (data, countryName) => {
  const countryData = 
    data.find(item => Object.keys(item)[0] === countryName)[countryName      ]
      .sort((a, b) => { return a.date > b.date ? 1 : -1})

  console.log(
    countryName,
    "Date\t\tTotal Deaths\t\tTotal Cases",
  )
  countryData.map(
    day => console.log(`${day.date}\t\t${day.total_deaths}\t\t${day.total_cases}`)
  )
}

