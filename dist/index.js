/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 428:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 680:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(428);
const github = __nccwpck_require__(680);

function run() {
  try {
    const reviewers = core.getInput("reviewers").split(",").map(r => r.trim());
    const githubToken = core.getInput("github_token") || process.env["GITHUB_TOKEN"];
    const timeGrain = core.getInput("time_grain") || "weekly";

    const octokit = new github.getOctokit(githubToken);
    const context = github.context;

    if (context.payload.pull_request == null) {
      core.setFailed("Pull Request not exist");
      return;
    }

    const selectedReviewer = selectReviewer(reviewers, timeGrain);

    const prNumber = context.payload.pull_request.number;
    const params = {
      pull_number: prNumber,
      reviewers: [selectedReviewer],
      ...context.repo,
    };

    octokit.pulls.requestReviewers(params);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

function selectReviewer(reviewers) {
  const now = time.Now();
  const week = now.getFullYear() * 52 + getWeek(now);
  const index = week % reviewers.length;

  return reviewers[index];
}

const getWeek = (date) => {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();

  return Math.ceil((currentDate + firstDay) / 7);
};

})();

module.exports = __webpack_exports__;
/******/ })()
;