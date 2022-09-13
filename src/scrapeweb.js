const request = require("request-promise");
const cheerio = require("cheerio");
var fs = require("fs");

request("https://ogawaworld.vn/site-map", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    // console.log(html);
    const $ = cheerio.load(html);
    let datajson = [];
    //const alllink = $("a");

    $("li").each((index, el) => {
      const linktext = $(el).find("a").text();
      const linkURL = $(el).find("a").attr("href");
      //   datajson.push({
      //     linktext,
      //     linkURL,
      //   });

      request(linkURL, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          console.log(linkURL + " ddone!");
        }
      });
    });

    /*------lưu dữ liệu --
    fs.writeFileSync(
      "../public/playground/data/data.json",
      JSON.stringify(datajson)
    ); // lưu dữ liệu vào file data.json
    console.log("Successfully export to /public/playground/data/data.json");

    //const alllinkjson = JSON.stringify(alllink);

    // fs.writeFile("myjsonfile.json", alllinkjson, "utf8", callback);
    ----*/
  } else {
    console.log(error);
  }
});
