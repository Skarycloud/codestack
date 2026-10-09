# Environments

| Environment | URL | Branch | Data | Who can access |
| --- | --- | --- | --- | --- |
| Local | http://localhost:3000 | any | Seed data | Developers |
| Preview | [per pull request] | PR branches | Seed data | Team |
| Staging | [url] | main | Anonymized copy | Team |
| Production | [url] | release tags | Real | [names] |

## Configuration differences

- [Variable] differs: [local value] vs [production source]

## Rules

- Production credentials never leave the production platform.
- Agents work against local or preview only.
