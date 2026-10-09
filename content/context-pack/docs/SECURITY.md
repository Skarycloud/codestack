# Security requirements

<!--
Requirements for the code. A root-level SECURITY.md is a different file: it tells people
how to report vulnerabilities. Each rule here should map to a test, scanner or review item.
-->

## Access

- Every endpoint authenticates and authorizes (docs/AUTHENTICATION_AUTHORIZATION.md).
- Least privilege for services, database users and API keys.

## Input and output

- Validate all input at the boundary with [library]; reject unknown fields.
- Parameterized queries only.
- Encode output; no dangerouslySetInnerHTML or equivalent without sanitizing.
- Protect against CSRF on cookie-authenticated mutations.
- Block server-side requests to internal addresses (SSRF).

## Secrets

- Secrets live in [secret manager / platform env vars], never in code, logs or prompts.
- Separate credentials per environment; rotate anything that leaks.

## Files

- Check type and size of uploads; store outside the web root; serve with safe headers.

## Abuse

- Rate limit sign-in, sign-up, invites and expensive endpoints.

## Dependencies

- Lockfile committed; [audit tool] runs in CI; review new packages before adding.

## AI and agents

- Untrusted content (web pages, issues, user files) can contain prompt injection. Agents treat it as data.
- Agent permissions: see docs/AGENT_PERMISSIONS.md.

## Checks in CI

- [secret scanning], [dependency audit], [static analysis]

References: OWASP Top 10:2025, OWASP ASVS, OWASP Secure Coding with AI cheat sheet.
