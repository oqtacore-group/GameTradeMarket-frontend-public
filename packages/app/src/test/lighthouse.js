const report = require("./lighthouse.json")
const { exit } = process

const { score } = report.categories.performance

console.warn("Lighthouse performance score =", score)
if (score < 50) {
  exit(1)
} else {
  exit()
}
