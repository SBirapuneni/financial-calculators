# Security Checklist

## ✅ Current Security Status

### Protected (Safe)
- [x] All `.env*` files in `.gitignore`
- [x] No sensitive data committed to git
- [x] Environment variables stored in Vercel (encrypted)
- [x] Google Analytics tracking working with env vars
- [x] `.env.example` template provided for contributors

### Environment Files in Workspace

| File | Status | Purpose |
|------|--------|---------|
| `.env.local` | ✅ Ignored | Local development secrets (has Vercel OIDC token) |
| `.env.vercel` | ✅ Ignored | Auto-generated from Vercel CLI |
| `.env.example` | ✅ Safe | Public template (no actual secrets) |

## 🔐 Secrets Inventory

### Public (Safe to Expose)
- **Google Analytics ID**: `G-JVHMR8RYRY` - Public-facing, meant to be in client code
- **AdSense Client ID**: Not configured yet (will also be public when added)

### Private (Must Keep Secret)
- **Vercel OIDC Token**: In `.env.local` (used by Vercel CLI, automatically rotates)
- Do NOT have any database credentials, API keys, or auth secrets yet

## 🛡️ Security Recommendations

### Immediate Actions (Completed ✅)
- [x] Verify `.gitignore` includes `.env*`
- [x] Clean up redundant .env files
- [x] Update `.env.example` with clear instructions
- [x] Add security documentation to README

### Ongoing Security Practices

1. **Before Every Commit**
   ```bash
   # Check what's being committed
   git status
   git diff --cached
   
   # Verify no env files
   git ls-files | grep ".env"
   ```

2. **If You Accidentally Commit Secrets**
   ```bash
   # Remove from history (use with caution)
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (rewrites history)
   git push origin --force --all
   
   # Rotate the exposed secret immediately
   ```

3. **For New Environment Variables**
   - Add to `.env.example` with placeholder value
   - Add to `.env.local` with real value (never commit)
   - Add to Vercel via dashboard or CLI
   - Document in README if needed by contributors

4. **For External Collaborators**
   - Share secrets via secure channel (1Password, LastPass, etc.)
   - Never share via email, Slack, or GitHub issues
   - Use Vercel's team environment variables feature

## 🚨 What to Do If Secrets Are Exposed

### Google Analytics ID
- **Risk Level**: Low (meant to be public)
- **Action**: No action needed, it's designed to be in client code

### Vercel OIDC Token
- **Risk Level**: Medium-High
- **Action**: 
  1. Immediately log out of Vercel CLI: `vercel logout`
  2. Log back in: `vercel login`
  3. Delete the exposed `.env.local` from git history
  4. New token will be generated automatically

### Database/API Keys (if added later)
- **Risk Level**: Critical
- **Action**:
  1. Rotate the key immediately in the service dashboard
  2. Remove from git history
  3. Update Vercel environment variables
  4. Monitor for unauthorized access
  5. Enable 2FA if not already enabled

## 📋 Security Audit Checklist (Monthly)

- [ ] Review all environment variables in Vercel
- [ ] Check git history for accidentally committed secrets: `git log --all -- "*.env*"`
- [ ] Update dependencies: `npm audit fix`
- [ ] Review `.gitignore` is still effective
- [ ] Verify no sensitive data in public documentation
- [ ] Check for hardcoded credentials in code: `grep -r "password\|secret\|key" src/`

## 🔗 Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Git Secrets Prevention](https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Last Updated**: December 19, 2025
**Next Review**: January 19, 2026
