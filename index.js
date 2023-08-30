const core = require("@actions/core");
const github = require("@actions/github");

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
  const now = new Date();
  const week = now.getFullYear() * 52 + getWeek(now);
  const index = week % reviewers.length;

  return reviewers[index];
}

const getWeek = (date) => {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();

  return Math.ceil((currentDate + firstDay) / 7);
};
