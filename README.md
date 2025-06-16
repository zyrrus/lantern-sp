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

References:

- https://help.hcl-software.com/unica/Campaign/en/12.1.1/Installation/Install/InstallnConfigure_MIT_Kerberos.html
- https://www.adaltas.com/en/2019/11/04/windows-krb5-client-spnego/

#### First Time Setup Instructions

1. Install MIT Kerberos
2. Copy the contents of `krb5/krb5.conf` into `C:\ProgramData\MIT\Kerberos5\krb5.ini`
3. Set the system environment variable `KRB5CCNAME=C:\tmp\krb5cache` (the folder should be created, but the file "krb5cache" should not already exist)
4. Run `which kinit` and `which klist` to ensure that both are using MIT's commands (Windows and Java have commands that can take priority)
5. Configure hosts file to recognize Docker domain:
   - Add the following lines to `C:/Windows/System32/drivers/etc/hosts`. IP addresses may need to be changed to match your system.
     ```
      127.19.0.4    apache.dev.local
      127.19.0.3    kdc.dev.local
      127.19.0.2    nextjs-app.dev.local
     ```
6. Configure browser to use MIT Kerberos
   Firefox:
   - Set `network.negotiate-auth.trusted-uris = .dev.local`
   - Set `network.negotiate-auth.delegation-uris = .dev.local`
   - Set `network.auth.use-sspi = false`

#### Continuing Setup Instructions

1. Use Docker to spin up:
   - A fake Kerberos KDC (`DEV.LOCAL` realm).
   - Apache HTTPD with `mod_auth_kerb` for SSO.
   - A Next.js app served behind Apache.
2. Authenticate with Kerberos:
   > Remember that these commands may not be the MIT Kerberos ones. Be sure to use fully qualified paths to these executables if necessary.
   - Run `kinit -V testuser@DEV.LOCAL` and enter password "UserPass123"
   - Run `klist` to verify that the ticket has been cached
3. Visit `http://apache.dev.local` in a browser

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

```

```
