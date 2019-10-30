const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const path = require("path");
const serveStatic = require("serve-static");

const port = process.env.PORT || 5000;
const app = express();

// app.use("/", expressStaticGzip(path.join(`${__dirname}/dist/`), {
//   enableBrotli: true,
//   orderPreference: ["br"],
// }));

app.use(express.static(path.join(__dirname, "/dist/")));
app.get(/.*/, (_, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});


app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Server started...');
});
