# Lantern Service Portal

> **Where I left off:**\
> Apache proxy appears to be working. Next, I need to resolve the Next.js app errors (Prisma DB doesn't exist or something like that). Once that is complete, it would be worth trying to see if I can connect to the docker hosts from my regular browser

## Objectives

- [ ] Windows Integrated Auth via Kerberos
  - [Installing a KDC](https://web.mit.edu/kerberos/krb5-1.12/doc/admin/install_kdc.html#install-and-configure-the-master-kdc)
  - [Defaults](https://web.mit.edu/kerberos/krb5-1.12/doc/mitK5defaults.html#paths)
  - [kadmin](https://web.mit.edu/kerberos/krb5-1.12/doc/admin/admin_commands/kadmin_local.html#ktadd)
  - [kadm5.acl](https://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/kadm5_acl.html)
  - [kdc.conf](https://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/kdc_conf.html#encryption-types)
  - [krb5.conf](https://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/krb5_conf.html)

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
