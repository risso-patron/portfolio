# Skill Registry — portfolio

Generated: 2026-04-14

## User Skills

| Name | Trigger | Path |
|------|---------|------|
| branch-pr | Creating a pull request, opening a PR, preparing changes for review | `~/.copilot/skills/branch-pr/SKILL.md` |
| go-testing | Writing Go tests, using teatest, adding test coverage | `~/.copilot/skills/go-testing/SKILL.md` |
| issue-creation | Creating a GitHub issue, reporting a bug, requesting a feature | `~/.copilot/skills/issue-creation/SKILL.md` |
| judgment-day | "judgment day", "review adversarial", "dual review", "juzgar", "que lo juzguen" | `~/.copilot/skills/judgment-day/SKILL.md` |
| skill-creator | Creating a new skill, adding agent instructions, documenting patterns for AI | `~/.copilot/skills/skill-creator/SKILL.md` |
| skill-registry | "update skills", "skill registry", "actualizar skills", after installing/removing skills | `~/.copilot/skills/skill-registry/SKILL.md` |

> SDD skills (sdd-*) and _shared are infrastructure — excluded from trigger table.

## Project Conventions

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | Prompt Maestro — portfolio transformation context for Jorge Luis Risso Patrón |

## Compact Rules

### branch-pr
- Always check for a linked issue before opening a PR.
- Use conventional commit format in PR title.
- Include a test plan in the PR description.

### issue-creation
- Follow issue-first enforcement: create an issue before branching.
- Label with type (bug/feature/chore) and priority.
- Include acceptance criteria.

### judgment-day
- Launch two independent blind judge sub-agents on the same target.
- Synthesize findings, apply fixes, re-judge until both pass.
- Escalate after 2 failed iterations.

### skill-creator
- Follow Agent Skills spec for frontmatter and structure.
- Include trigger phrases, execution steps, and result contract.
