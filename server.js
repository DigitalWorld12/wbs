const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
// const port = 3000;
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const dotenv = require("dotenv");
const { OAuth2Clinet } = require("google-auth-library");

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
// dotenv.config();
// const client = new OAuth2Clinet(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// app.use(express.json);
// const users = [];
// function upsert(array, item) {
//   const i = array.findIndex((_item) => _item.email === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }
// app.post("/api/google-login", async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });
//   const { name, email, picture } = ticket.getPayload();
//   upsert(users, { name, email, picture });
//   res.status(201);
//   res.json({ name, email, picture });
// });
// app.listen(process.env.PORT || 5000, () => {
//   console.log(
//     "server is ready at http://localhost:${process.env.PORT || 5000}"
//   );
// });
