# Authentication and authorization

## Authentication

- Provider / library: [ ]
- Methods: [email and password, magic link, OAuth providers, passkeys]
- Sessions: [cookie or token, lifetime, rotation]
- Password and MFA policy: [ ]

## Roles

| Role | Description |
| --- | --- |
| [owner] | [ ] |
| [member] | [ ] |

## Permissions

| Action | owner | member | guest |
| --- | --- | --- | --- |
| [Invite members] | yes | no | no |

## Where checks happen

- Every server handler calls [authorization helper] before reading or writing data.
- Resource ownership comes from the server-side session, never from the request body.
- UI hides actions the user can't take, but the server always enforces.

## Tests

- [Test file] proves each role can't exceed its permissions.
