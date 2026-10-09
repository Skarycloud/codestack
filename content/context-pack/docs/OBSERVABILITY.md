# Observability

## Logs

- Structured JSON with request ID, user or workspace ID, no personal data.
- Levels: error (needs action), warn (unexpected), info (key events).

## Metrics

- [Request rate, error rate, latency, queue depth, business metrics]

## Tracing

- [Tool], sampled at [rate].

## Errors

- [Error tracking tool]; source maps uploaded on deploy.

## Alerts

| Alert | Condition | Who | Runbook |
| --- | --- | --- | --- |
| [High error rate] | [5xx over 2% for 5 min] | [on-call] | docs/RUNBOOK.md#[section] |
