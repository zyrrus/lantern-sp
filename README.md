# Lantern Service Portal

## Objectives

- [ ] Windows Integrated Auth via Kerberos

<!--
- RBAC https://authjs.dev/guides/role-based-access-control
- Ticket system
- SMTP server
- Time on tickets
-->

## Local Development

### Dev Environment

Use Docker to spin up:

- A fake Kerberos KDC (`DEV.LOCAL` realm).
- Apache HTTPD with `mod_auth_kerb` for SSO.
- A Next.js app served behind Apache.

### Auth Flow

1. Apache handles the Kerberos login.
2. Passes `REMOTE_USER` to Next.js via `X-Remote-User` header.
3. Uses the keytab for identity.
4. Read `X-Remote-User` from the request headers.
5. Display logged-in user in the app.

## Production Deployment

| Dev                         | Production (AD)                               |
| --------------------------- | --------------------------------------------- |
| Simulated realm (DEV.LOCAL) | Real AD domain (e.g., `CORP.COMPANY.COM`)     |
| Dockerized KDC              | Real AD Domain Controller                     |
| Manually created keytab     | Generated via `ktpass` and tied to AD account |
| Apache in Docker            | IIS or Apache on Windows/Linux                |
