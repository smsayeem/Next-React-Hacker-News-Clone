const next = require("next");
const http = require("http"); // built in node module 'http' to create our server.
const url = require("url");
const path = require("path");

const port = process.env.PORT || 3000;

// which environment | process.env referen to .env where we tell node which environment we are on development / production
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev }); // now next knows we are in dev environment
//next has a request handler call it handle. it has a method called getRequestHandler(). any request comming from
const handle = app.getRequestHandler();

// in order to combine next with our own custom server setup
// we also use http to create our server
// http.createServer()
// every server had request and response
app.prepare().then(() => {
  http
    .createServer((req, res) => {
      /* Parse request url to get its pathname */
      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      /* If a service worker requested, serve it as a static file */
      if (pathname === "/service-worker.js") {
        const filePath = path.join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);

        /* Otherwise, let Next take care of it */
      } else {
        handle(req, res, parsedUrl);
      }
    })
    .listen(port, () => {
      console.log(`Listening on PORT ${port}`);
    });
});
