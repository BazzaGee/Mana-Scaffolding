# Contact Form - Astro Actions with Resend Implementation

## ✅ Implementation Complete

Your contact form has been successfully migrated to use **Astro Actions** with **Resend Email API** and **Cloudflare KV** storage.

---

## 🎯 What Was Implemented

### 1. **Cloudflare Adapter** (`@astrojs/cloudflare`)
- Enables server-side rendering for Astro Actions
- Deploys to Cloudflare Pages
- Supports hybrid static/server mode

### 2. **Astro Actions** (`src/actions/`)
- **`src/actions/contact.ts`** - Contact form handler
  - Zod validation for all form fields
  - Email sending via **Resend API** (same as High Spec Painters)
  - KV storage for submission backup
  - Error handling with ActionError
  - Dev mode logging for testing

- **`src/actions/index.ts`** - Actions export
  - Exports `server` object with all actions

### 3. **Configuration Files**

#### `astro.config.mjs`
```javascript
output: 'static',  // Astro 6 default
adapter: cloudflare({
  imageService: 'cloudflare-binding',
  sessionKVBindingName: 'SESSION',
}),
```

#### `wrangler.jsonc`
```jsonc
{
  "name": "mana-scaffolding",
  "compatibility_date": "2025-05-21",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    "CONTACT_EMAIL": "buttersnoco@gmail.com",
    "RESEND_API_KEY": "re_XaLbeAzG_3hnJDcaLwKzQ8JP8Z6oGd8ys"
  },
  "kv_namespaces": [
    {
      "binding": "CONTACT_SUBMISSIONS",
      "id": "contact_submissions"
    },
    {
      "binding": "SESSION",
      "id": "session"
    }
  ]
}
```

#### `.env`
```env
CONTACT_EMAIL=buttersnoco@gmail.com
RESEND_API_KEY=re_XaLbeAzG_3hnJDcaLwKzQ8JP8Z6oGd8ys
PUBLIC_SITE_URL=https://mana-scaffolding.pages.dev
```

### 4. **Updated Contact Page** (`src/pages/contact/index.astro`)
- Uses `Astro.getActionResult()` for server-side result handling
- Form submits via `action={actions.contact}`
- Automatic redirect to `/contact/thanks` on success
- Error display for failed submissions
- `transition:persist` on inputs for better UX

### 5. **Middleware** (`src/middleware.ts`)
- Basic request context setup
- Ready for future enhancements

---

## 📦 Dependencies Added

```json
{
  "@astrojs/cloudflare": "^13.1.10",
  "wrangler": "^4.83.0"
}
```

---

## 🚀 How It Works

### Form Submission Flow

```
User fills form → POST to Astro Action → Zod validation
                                              ↓
                                    Email via Resend API
                                              ↓
                                    Store in KV backup
                                              ↓
                                    Redirect to /thanks
```

### Email Sending
- Uses **Resend.com API** (same as High Spec Painters)
- Proven reliable email delivery
- Free tier: 3,000 emails/month
- From: `Mana Scaffolding <onboarding@resend.dev>`
- To: `buttersnoco@gmail.com`
- Reply-To: Customer's email address

### Data Storage
- All submissions stored in Cloudflare KV (`CONTACT_SUBMISSIONS`)
- Includes timestamp, NZ local time, submission ID, and all form data
- Backup even if email fails
- Accessible via Cloudflare Dashboard

---

## 📝 Form Fields & Validation

| Field | Type | Validation |
|-------|------|------------|
| `name` | text | Min 2 characters |
| `email` | email | Valid email format |
| `phone` | tel | Min 7 characters |
| `project_type` | select | Enum: residential, commercial, industrial, complex, other |
| `message` | textarea | Min 10 characters |

---

## 🛠️ Commands

### Development
```bash
npm run dev
```
- Generates Wrangler types
- Starts Astro dev server with Cloudflare adapter
- Hot reload enabled

### Build
```bash
npm run build
```
- Generates Wrangler types
- TypeScript check
- Builds for Cloudflare Workers
- Output: `dist/` directory

### Preview
```bash
npm run preview
```
- Test production build locally
- Uses Cloudflare `workerd` runtime

### Deploy
```bash
npx wrangler deploy
```
- Deploys to Cloudflare Workers
- Requires: `npx wrangler login`

---

## ⚙️ Cloudflare Setup

### 1. Authenticate
```bash
npx wrangler login
```

### 2. Create KV Namespaces
The KV namespaces will be automatically created on first deploy with the IDs specified in `wrangler.jsonc`.

Alternatively, create manually:
```bash
npx wrangler kv:namespace create "CONTACT_SUBMISSIONS"
npx wrangler kv:namespace create "SESSION"
```

Update the IDs in `wrangler.jsonc` with the returned values.

### 3. Deploy
```bash
npx wrangler deploy
```

---

## 📊 Monitoring

### View Submissions
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **mana-scaffolding**
3. Go to **KV** → **CONTACT_SUBMISSIONS**
4. Browse all form submissions

### Email Logs
1. Go to [Resend Dashboard](https://resend.com)
2. Navigate to **Logs**
3. Filter by recipient: `buttersnoco@gmail.com`
4. View email delivery status, opens, and bounces

### Application Logs
```bash
npx wrangler tail
```

---

## 🔧 Customization

### Change Email Recipient
Edit `wrangler.jsonc`:
```json
"vars": {
  "CONTACT_EMAIL": "your-new-email@example.com"
}
```

### Update Resend API Key
1. Go to [Resend API Keys](https://resend.com/api-keys)
2. Create new API key or copy existing
3. Update in `wrangler.jsonc` and `.env`

### Change Email Sender
Edit `src/actions/contact.ts`:
```typescript
from: 'Mana Scaffolding <onboarding@resend.dev>',
// Change to custom domain after verification:
// from: 'Mana Scaffolding <quotes@manascaffolding.co.nz>',
```

### Add Rate Limiting
Edit `src/middleware.ts`:
```typescript
import { defineMiddleware } from 'astro:middleware';
import { getActionContext } from 'astro:actions';

export const onRequest = defineMiddleware(async (context, next) => {
  const { action } = getActionContext(context);
  
  if (action?.name === 'contact') {
    // Add rate limiting logic here
  }
  
  return next();
});
```

### Add Honeypot Field
1. Add hidden field to form:
```astro
<input 
  name="honeypot" 
  type="text" 
  class="hidden" 
  tabindex="-1" 
  autocomplete="off"
/>
```

2. Check in action:
```typescript
if (input.honeypot) {
  throw new ActionError({
    code: 'BAD_REQUEST',
    message: 'Spam detected',
  });
}
```

---

## 🎨 Email Template

Emails are sent with the following format:

```
New Quote Request from Mana Scaffolding Website
================================================

Name:    John Doe
Email:   john@example.com
Phone:   021 123 4567
Project Type: residential

Message:
I need scaffolding for a 2-story house renovation...

---
Submitted at: Friday, 17 April 2026 11:00 AM
Submission ID: 1234567890-abc123
```

**Email Features:**
- ✅ Professional formatting
- ✅ NZ local time display
- ✅ Reply-To set to customer's email
- ✅ Unique submission ID for tracking
- ✅ Clear subject line with customer name and project type

---

## ⚠️ Important Notes

### Email Sending
- Cloudflare Workers Email requires domain verification for custom sender addresses
- Currently uses `noreply@mana-scaffolding.pages.dev` as sender
- To use custom domain, verify it in Cloudflare Dashboard → Email Routing

### KV Storage
- Writes are eventually consistent (up to 60 seconds globally)
- Free tier: 100,000 reads/day, 1,000 writes/day
- Sufficient for small to medium traffic sites

### Deployment
- Requires Cloudflare Workers plan (free tier available)
- Free tier: 100,000 requests/day
- Bundle size limit: 10 MB

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

### Email Not Sending
1. Check Cloudflare Dashboard → Workers → Logs
2. Verify `CONTACT_EMAIL` in wrangler.jsonc
3. Ensure email service is enabled in Cloudflare

### KV Not Working
1. Verify KV namespaces exist: `npx wrangler kv:namespace list`
2. Check binding names match in `wrangler.jsonc` and action code
3. Ensure KV has write permissions

### Types Missing
```bash
npx wrangler types
```

---

## 📚 Resources

- [Astro Actions Documentation](https://docs.astro.build/en/guides/actions/)
- [Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Cloudflare Workers Email](https://developers.cloudflare.com/workers/runtime-apis/email/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

## ✅ Testing Checklist

- [ ] Run `npm run dev` - dev server starts
- [ ] Navigate to `/contact` - page loads
- [ ] Submit valid form - redirects to `/contact/thanks`
- [ ] Submit invalid form - shows validation errors
- [ ] Check Cloudflare KV - submission stored
- [ ] Check email - received at `buttersnoco@gmail.com`
- [ ] Run `npm run build` - builds successfully
- [ ] Run `npx wrangler deploy` - deploys to Cloudflare

---

**Last Updated:** April 17, 2026  
**Astro Version:** 6.1.5  
**Cloudflare Adapter:** 13.1.10
