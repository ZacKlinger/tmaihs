
# Add Google Sign-In

## Overview
Add Google OAuth as an alternative sign-in method alongside the existing email/password authentication. This will allow users to sign in with one click using their Google account.

## What You'll Get
- A "Continue with Google" button on the sign-in/sign-up page
- Automatic account creation for new Google users
- Seamless integration with existing authentication flow
- Professional-looking UI that matches the current design

---

## Implementation Steps

### 1. Configure Google OAuth Provider
Set up the Google authentication provider through Lovable Cloud's managed solution (no Google Cloud Console setup required - Lovable handles this automatically).

### 2. Update the Auth Page
Add a Google sign-in button to the authentication form:
- Add a visual separator ("or continue with")
- Add a styled Google button with the Google icon
- Handle the OAuth flow when clicked

### 3. Create OAuth Handler
Implement the Google sign-in function using Lovable Cloud's auth module:
- Use `lovable.auth.signInWithOAuth("google", ...)` 
- Handle redirect after successful authentication
- Display appropriate error messages if sign-in fails

---

## Technical Details

### Files to Modify
| File | Changes |
|------|---------|
| `src/pages/Auth.tsx` | Add Google sign-in button and OAuth handler |

### Files to Create
| File | Purpose |
|------|---------|
| `src/integrations/lovable/index.ts` | Auto-generated Lovable Cloud auth module |

### UI Changes
The auth page will include:
```text
┌─────────────────────────────────────┐
│         Welcome Back / Create       │
│            Account                  │
├─────────────────────────────────────┤
│  [Name field - signup only]         │
│  [Email field]                      │
│  [Password field]                   │
│  [Sign In / Create Account button]  │
│                                     │
│  ─────────── or ───────────         │
│                                     │
│  [G] Continue with Google           │
│                                     │
│  Don't have an account? Sign up     │
└─────────────────────────────────────┘
```

### Authentication Flow
1. User clicks "Continue with Google"
2. Redirected to Google's OAuth consent screen
3. After approval, redirected back to the app
4. Session is established and user is redirected to Learning Studio
