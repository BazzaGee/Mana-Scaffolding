# 🚀 Mana Scaffolding - Deployment Checklist

## ✅ Pre-Deployment Verification

### 1. **Build Verification**
```bash
npm run build
```
- ✅ Build completes without errors
- ✅ Output in `dist/` directory
- ✅ Server chunks generated

### 2. **Local Testing**
```bash
npm run dev
```
- ✅ Navigate to `http://localhost:4321/contact`
- ✅ Fill out and submit form
- ✅ Check console for dev mode logs
- ✅ Verify redirect to `/contact/thanks`

### 3. **Configuration Check**
- ✅ `wrangler.jsonc` has correct project name: `mana-scaffolding`
- ✅ `RESEND_API_KEY` is set in `wrangler.jsonc`
- ✅ KV namespaces configured
- ✅ `.env` file has all required variables

---

## 📤 Deployment Steps

### Option A: GitHub Actions (Recommended) ⭐

**Already configured in `.github/workflows/cloudflare-pages.yml`**

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add Astro Actions contact form with Resend email"
   git push origin main
   ```

2. **Automatic Deployment**
   - GitHub Actions will trigger automatically
   - Builds the project
   - Deploys to Cloudflare Pages
   - Creates preview URL for testing

3. **Monitor Deployment**
   - Go to GitHub → Actions tab
   - Watch build progress
   - Check for any errors

4. **Verify Live Site**
   - Visit: `https://mana-scaffolding.pages.dev/contact`
   - Test form submission
   - Check email received at `buttersnoco@gmail.com`
   - Verify KV storage in Cloudflare Dashboard

---

### Option B: Manual Deploy with Wrangler

1. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **Build Project**
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy dist --project-name=mana-scaffolding
   ```

4. **Verify Deployment**
   - Check deployment URL in terminal
   - Visit and test contact form

---

## 🔍 Post-Deployment Testing

### 1. **Form Submission Test**
- [ ] Navigate to contact page
- [ ] Fill out all required fields
- [ ] Submit form
- [ ] Verify redirect to thank you page

### 2. **Email Delivery**
- [ ] Check inbox at `buttersnoco@gmail.com`
- [ ] Verify email received within 1-2 minutes
- [ ] Check email format and content
- [ ] Test reply-to functionality

### 3. **KV Storage**
- [ ] Go to Cloudflare Dashboard
- [ ] Navigate to Workers & Pages → mana-scaffolding
- [ ] Go to KV → CONTACT_SUBMISSIONS
- [ ] Verify submission stored with all data

### 4. **Error Handling**
- [ ] Submit form with invalid email
- [ ] Verify validation error shown
- [ ] Submit form with missing required fields
- [ ] Verify browser validation works

---

## 📊 Monitoring Setup

### Cloudflare Dashboard
1. **Workers & Pages** → **mana-scaffolding**
   - View deployment history
   - Check build logs
   - Monitor traffic and errors

2. **KV Storage**
   - Navigate to **Storage & Databases** → **KV**
   - Select **CONTACT_SUBMISSIONS**
   - View all form submissions
   - Export data if needed

### Resend Dashboard
1. **Login to Resend** at https://resend.com
2. **Go to Logs**
   - Filter by recipient email
   - View delivery status
   - Check for bounces or failures
3. **API Keys**
   - Verify API key is active
   - Rotate keys periodically for security

---

## 🛠️ Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite .astro
npm run build
```

### Email Not Sending
1. Check Resend API key is correct
2. Verify API key hasn't expired
3. Check Resend dashboard for errors
4. Ensure not exceeding free tier limits (3K/month)

### KV Storage Not Working
1. Verify KV namespaces exist in Cloudflare
2. Check binding names match in wrangler.jsonc
3. Ensure KV has write permissions
4. Test with: `npx wrangler kv:key put --binding=CONTACT_SUBMISSIONS test "value"`

### Form Submission Fails
1. Check browser console for errors
2. Verify Astro Actions endpoint is accessible
3. Check Cloudflare Logs for server errors
4. Test with different browsers

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | wrangler.jsonc + .env | Email sending via Resend |
| `CONTACT_EMAIL` | wrangler.jsonc + .env | Recipient email address |
| `PUBLIC_SITE_URL` | .env | Site URL for environment detection |
| `DASHSCOPE_API_KEY` | .env | Image generation (existing) |
| `OPENROUTER_API_KEY` | .env | Image generation (existing) |

### KV Bindings

| Binding | Purpose | Auto-created |
|---------|---------|--------------|
| `CONTACT_SUBMISSIONS` | Store form submissions | Yes |
| `SESSION` | Session storage | Yes |
| `ASSETS` | Static assets | Yes |

---

## 🎯 Success Criteria

✅ **Form submits successfully**  
✅ **Email received at buttersnoco@gmail.com**  
✅ **Submission stored in Cloudflare KV**  
✅ **User redirected to thank you page**  
✅ **Validation errors display correctly**  
✅ **No console errors**  
✅ **Build completes without errors**  
✅ **Deployment successful on Cloudflare Pages**  

---

## 📞 Support Resources

- **Astro Actions Docs**: https://docs.astro.build/en/guides/actions/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Resend API**: https://resend.com/docs
- **Wrangler CLI**: https://developers.cloudflare.com/workers/wrangler/

---

## 🔄 Rollback Procedure

If deployment fails or causes issues:

1. **Identify Last Good Version**
   ```bash
   git log --oneline
   ```

2. **Revert Changes**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Or Deploy Previous Build**
   ```bash
   # In Cloudflare Dashboard
   # Go to Deployments → Production → Click previous version → Rollback
   ```

---

**Last Updated:** April 18, 2026  
**Project:** Mana Scaffolding  
**Contact Form Version:** 2.0 (Astro Actions + Resend)
