// Setup
// -----------------------------------------------------------------------------
// #############################################################################
const express = require("express");
// require "hbs" ONLY to set up partials
// const hbs = require("hbs");


const app = express();

app.listen(3000, () => {
  console.log("SERVER is good to go. 🛴");
});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");



// Routes
// -----------------------------------------------------------------------------
// #############################################################################

app.get("/", (request, response, next) => {
  response.render("home-page.hbs");
});

// https://www.amazon.com/dp/B01MUAGZ49
app.get("/dp/:productId", (request, response, next) => {
  const productId = request.params.productId;
                // { productId: "B01MUAGZ49" }

  // send the product ID to the hbs file as "myId"
  response.locals.myId = productId;
  response.render("amazon-product.hbs");
});

// https://www.ironhack.com/en/courses/ux-ui-design-part-time
app.get("/:lang/courses/:courseName", (request, response, next) => {
  const lang = request.params.lang;
  // { lang: "fr", courseName: "data-analysis-bootcamp" }
  let title;

  if (lang === "fr") {
    title = "Préparons la prochaine génération de créateurs du digital";
  }
  else if (lang === "de") {
    title = "Vorbereitung der nächsten Generation von Digital Macher";
  }
  else {
    title = "Preparing the next generation of digital creators";
  }

  // send the title to the hbs file as "pageTitle"
  response.locals.pageTitle = title;
  response.render("ironhack-course.hbs");
});

// https://www.youtube.com/watch?v=zGkHRa64sDY
app.get("/watch", (request, response, next) => {
  const v = request.query.v;

  response.locals.videoId = v;
  response.render("video-page.hbs");
});

// https://www.youtube.com/results?search_query=burger
app.get("/results", (request, response, next) => {
  const search_query = request.query.search_query;
                      // { search_query: "burger" }
  let icon;

  if (search_query === "pizza") {
    icon = "🍕";
  }
  else if (search_query === "burger") {
    icon = "🍔";
  }
  else {
    icon = "🏄🏾‍♂️";
  }

  // send the icon to the hbs file as "emoji"
  response.locals.emoji = icon;
  // send the search query to the hbs file as "searchTerm"
  response.locals.searchTerm = search_query;
  response.render("search-results.hbs");
});
