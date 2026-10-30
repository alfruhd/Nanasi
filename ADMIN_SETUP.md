# Admin setup (Firebase)

The menu works without Firebase (it uses `menu-data.js`). To enable the admin editor at `/admin.html`:

1. https://console.firebase.google.com → Add project.
2. **Build → Authentication → Sign-in method** → enable *Email/Password*. Under *Users* add the admin (email + password).
3. **Build → Firestore Database** → Create database (production mode). Paste `firestore.rules` in the *Rules* tab (put the admin email in).
4. **Build → Storage** → Get started (needs the Blaze plan; free tier is plenty). Paste `storage.rules` (admin email in).
5. **Project settings → Your apps → Web (</>)** → copy the config into `firebase-config.js`.
6. **Authentication → Settings → Authorized domains**: add your site's domain.

Admin edits are saved as one document (`menu/main`); "Reset to defaults" deletes it.
Security is enforced by the rules (only the listed admin email can write), not by the page.
