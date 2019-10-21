const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

app.use("/", expressStaticGzip(path.join(`${__dirname}/dist/`), {
  enableBrotli: true,
}));

app.get(/.*/, (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server started...');
});
