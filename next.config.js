const data = require("./data.json")
, exportPathMap = () => ({
  "/": {
    "page": "/",
    "query": {data}
  }
})

module.exports = {
  exportPathMap
}