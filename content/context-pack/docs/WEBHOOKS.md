# Webhooks

## Incoming

| Provider | Endpoint | Events | Handler |
| --- | --- | --- | --- |
| [Payments] | [/api/webhooks/payments] | [checkout.completed, subscription.updated] | [path] |

Rules:
- Verify the signature with the raw request body before parsing.
- Make handlers idempotent: store processed event IDs and skip repeats.
- Respond fast (2xx) and do slow work in a background job.
- Don't assume events arrive in order; fetch current state when it matters.
- Log event IDs, never full payloads with personal data.

Local testing: [provider CLI command or test-event tool]

## Outgoing

| Event | Payload | Signing | Retries |
| --- | --- | --- | --- |
