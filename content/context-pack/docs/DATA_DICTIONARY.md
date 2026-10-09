# Data dictionary

<!-- Meaning, not types. Types live in the schema. -->

| Table.field | Meaning | Allowed values | Example | Sensitive | Retention |
| --- | --- | --- | --- | --- | --- |
| users.email | Sign-in email, unique | valid email | a@b.com | Personal | Until account deletion |
| tasks.status | Where the task is in its lifecycle | open, done | open | No | With task |
