---
name: git-feature-pr
description: "Use when creating a branch, committing feature work, pushing it, or opening a pull request. Enforces the project branch format and PR title format feat(feature_name): Verb title."
---

# Git Feature PR Workflow

Use this skill when the user asks to create a branch, commit work, push work, or create a pull request.

## Naming

- Branch format: `codex/feat/<feature-name>`.
- Branch feature names use kebab-case, for example `home-dashboard`.
- PR title format:

```text
feat(feature_name): Verb concise title
```

- `feature_name` is the changed screen or feature scope.
- The first word after `:` must be an imperative verb such as `Add`, `Update`, `Refactor`, `Introduce`, or `Improve`.
- Use the same title format for feature commit messages unless the user requests a different commit message.

## Examples

```text
codex/feat/home-dashboard
feat(home): Add recent activity section

codex/feat/auth
feat(auth): Update sign-in validation

codex/feat/profile-avatar
feat(profile): Improve avatar upload flow
```

## Branch Steps

1. Run `git status --short --branch`.
2. If the worktree is dirty, avoid switching away unless the user explicitly approves stashing or moving changes.
3. If currently on `main` with local changes, create the branch from the current state:

```bash
git switch -c codex/feat/<feature-name>
```

4. If the worktree is clean, update `main` first:

```bash
git switch main
git pull --ff-only origin main
git switch -c codex/feat/<feature-name>
```

## Commit Steps

1. Recheck `git status --short`.
2. Stage only relevant files.
3. Run relevant quality gates, usually:

```bash
npm run lint
npx tsc --noEmit
```

4. Commit with:

```bash
git commit -m "feat(feature_name): Verb concise title"
```

## Pull Request Steps

1. Push the branch:

```bash
git push -u origin codex/feat/<feature-name>
```

2. Create the PR:

```bash
gh pr create --base main --head codex/feat/<feature-name> --title "feat(feature_name): Verb concise title" --body "<summary and checks>"
```

3. If GitHub CLI is unavailable or authentication fails, report the exact branch name, title, and command the user can run.
