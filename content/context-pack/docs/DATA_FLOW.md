# Data flow

## [Journey, e.g. Create a task]

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Web UI
  participant API as Server
  participant DB as Database
  U->>UI: Submit form
  UI->>API: POST /api/tasks
  API->>API: Validate, check membership
  API->>DB: Insert task
  DB-->>API: Task
  API-->>UI: 201 Created
  UI-->>U: Task appears in list
```

## State management

- Server state: [approach, e.g. fetched on the server, revalidated after mutations]
- Client state: [approach and library]
- Where side effects happen: [ ]
