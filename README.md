# Rotate Pull Request Reviewers GitHub Action

![icon](https://img.shields.io/badge/icon-bar--chart-orange)

This GitHub Action helps you rotate Pull Request reviewers in your repository. You can use it to automatically update the list of reviewers for your PRs based on a predefined rotation schedule. This can help distribute the reviewing workload among team members.

## Inputs

### `github_token` (required)

**Description:** GitHub Access Token. You can use the default `GITHUB_TOKEN`.

### `reviewers` (required)

**Description:** Comma-separated GitHub handles of the reviewers who will be part of the rotation.

### `index`

**Description:** The starting index for the rotation. (TODO: Provide more details)

### `time_grain`

**Description:** The time grain for the rotation, e.g., "weekly". (TODO: Provide more details)

### `label`

**Description:** The label to associate with the Pull Request. (TODO: Provide more details)

## Example Usage

Here's an example of how you can use this action in your GitHub Actions workflow:

```yaml
name: Rotate Reviewers

on:
  pull_request:
    types:
      - opened

jobs:
  rotate-reviewers:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Rotate Reviewers
        uses: <your-username>/rotate-reviewers-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          reviewers: user1,user2,user3
          index: 0
          time_grain: weekly
          label: review-me
```

In this example, when a Pull Request is opened, the action will rotate the reviewers according to the specified schedule and add the "review-me" label to the Pull Request.

## License

This GitHub Action is licensed under the [MIT License](LICENSE).
