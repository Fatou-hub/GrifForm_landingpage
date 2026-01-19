# GridForm Landing Page - Setup Instructions

## 🚀 What happens when users click?

The landing page now has a **professional email collection modal** that opens when users click any CTA button.

### Current Flow:
1. User clicks "Reserve your spot" button
2. Modal opens with email form
3. User enters name + email
4. Form submits (currently logs to console)
5. Success message shows
6. User data is ready to be sent to your backend

---

## 📊 Option 1: Google Sheets (FREE - RECOMMENDED)

### Step 1: Create Google Apps Script

1. Go to https://script.google.com/
2. Create a new project
3. Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as Web App
5. Copy the deployment URL

### Step 2: Update your landing page

In `gridform-landing.jsx`, replace the TODO section with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        email, 
        timestamp: new Date().toISOString() 
      })
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
    alert('Something went wrong. Please try again.');
  }
};
```

### Step 3: Create your Google Sheet

1. Create a new Google Sheet
2. Add headers: `Timestamp | Name | Email`
3. Copy the spreadsheet ID from the URL
4. Replace `YOUR_SPREADSHEET_ID` in the script

---

## 📊 Option 2: Airtable

### Step 1: Create Airtable Base

1. Create a new base called "GridForm Waitlist"
2. Add fields: `Name`, `Email`, `Timestamp`

### Step 2: Get API credentials

1. Go to https://airtable.com/account
2. Generate personal access token
3. Get your Base ID and Table ID

### Step 3: Update your landing page

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_AIRTABLE_TOKEN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Name: name,
            Email: email,
            Timestamp: new Date().toISOString()
          }
        }]
      })
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
  }
};
```

---

## 📧 Option 3: Email notification (via Formspree)

### Step 1: Sign up to Formspree
1. Go to https://formspree.io/
2. Create a new form
3. Get your form endpoint

### Step 2: Update your landing page

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        _subject: 'New GridForm Waitlist Signup!'
      })
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
    setIsSubmitting(false);
  }
};
```

You'll receive an email every time someone signs up!

---

## 📧 Option 4: Mailchimp Integration

### Step 1: Get Mailchimp credentials
1. Create a new audience in Mailchimp
2. Go to Settings > Audience name and defaults
3. Copy your Audience ID
4. Create an API key

### Step 2: Use server-side endpoint

⚠️ **Important**: Don't expose your Mailchimp API key in frontend code!

Create a simple backend endpoint (Vercel/Netlify function) or use a service like Zapier/Make.

---

## 🔥 Option 5: Simple Backend (Node.js example)

Create a simple Express endpoint:

```javascript
// api/subscribe.js (Vercel function)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, email } = req.body;
  
  // Save to database, send email, etc.
  console.log('New signup:', { name, email });
  
  // Example: Send to your email via SendGrid/Mailgun
  
  res.status(200).json({ success: true });
}
```

Then in your landing page:
```javascript
await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email })
});
```

---

## 📈 Add Analytics (Recommended)

### Google Analytics 4

Add to your `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Track button clicks:
```javascript
const handleCTAClick = () => {
  // Track with GA4
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      button_location: 'hero'
    });
  }
  setShowModal(true);
};
```

### Plausible Analytics (Privacy-friendly alternative)

Add to your `<head>`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🎯 My Recommendation

**Start with Google Sheets** - it's:
- ✅ Free
- ✅ Easy to setup (5 minutes)
- ✅ No coding required
- ✅ You can export to CSV anytime
- ✅ Add Google Analytics for traffic tracking

Once you get 50+ signups, migrate to a proper email service like Mailchimp or ConvertKit.

---

## 🚀 Deployment

Deploy to Vercel (recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or use Netlify drag-and-drop: https://app.netlify.com/drop

---

## ✅ Quick Checklist

- [ ] Choose your data collection method
- [ ] Update the `handleSubmit` function
- [ ] Test the form submission
- [ ] Add Google Analytics
- [ ] Deploy to production
- [ ] Share on Typeform community forums
- [ ] Track your first signups! 🎉

---

## 📊 Measuring Success

**Good smoke test results:**
- 5-10% conversion rate (clicks to email signups)
- 100+ signups in 2 weeks
- People asking questions in comments

**Signals to build:**
- High engagement on social media
- Users asking "when will it launch?"
- Competing solutions mentioned in comments

**Signals to pivot:**
- <2% conversion rate
- No organic sharing
- Users saying "meh, I'll stick with X"

---

Need help? DM me or check the comments in the code!

Good luck with your launch! 🚀
