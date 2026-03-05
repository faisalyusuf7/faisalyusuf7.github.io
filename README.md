# faisalughratdar.github.io

Personal portfolio website — [faisalughratdar.github.io](https://faisalughratdar.github.io)

Built with HTML, CSS, and JavaScript.

## Structure

```
.
├── index.html
├── css/style.css
├── js/main.js
└── assets/
    ├── images/   ← drop photos here
    └── videos/   ← drop videos here
```

## Adding media

**Photos** — put the file in `assets/images/` then swap the placeholder div in `index.html` with an `<img>` tag.

**Videos** — put the file in `assets/videos/` and use a `<video>` tag, or paste a YouTube embed iframe.

**Profile photo** — save as `assets/images/me.jpg` and replace the placeholder in the About section.

## Making changes

```bash
git add .
git commit -m "what you changed"
git push
```

GitHub Pages redeploys automatically within about a minute.

## GitHub Pages setup

### Step 1 — Create a GitHub Account (if you don't have one)

### Step 1 — Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com) and click **Sign up**
2. Choose a username — pick something professional (e.g. `faisalughratdar` or `mechengineerfaisal`)
3. Verify your email address

---

### Step 2 — Install Git on your computer
1. Download Git from [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer using all default settings
3. Open **Git Bash** (it installs alongside Git) or use the **VS Code terminal**
4. Verify it works: `git --version`

---

### Step 3 — Configure Git with your identity
Open Git Bash or a terminal and run:
```bash
git config --global user.name  "Faisal Yusuf Ughratdar"
git config --global user.email "fughra2@uic.edu"
```

---

### Step 4 — Create a new GitHub Repository
1. Log in to [github.com](https://github.com)
2. Click the **+** button (top right) → **New repository**
3. Name it exactly: `faisalughratdar.github.io`  
   *(replace `faisalughratdar` with your actual GitHub username)*
4. Set it to **Public**
5. **Do NOT** check "Add a README file" (we already have one)
6. Click **Create repository**

> ⚠️ The repository name MUST follow the pattern `<username>.github.io` for GitHub Pages to automatically host it.

---

### Step 5 — Upload your website files
Open a terminal (Git Bash, VS Code terminal, or PowerShell) and run these commands **in order**:

```bash
# Navigate to your website folder
cd "C:\Users\faisa\OneDrive - University of Illinois Chicago\Desktop\Website&Portfolio"

# Initialise git in this folder
git init

# Add all your files
git add .

# Create the first commit
git commit -m "Initial commit — portfolio website"

# Connect to your GitHub repository
# (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

# Push to GitHub
git push -u origin main
```

If Git asks you to log in, use your GitHub username and password (or a Personal Access Token).

---

### Step 6 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top menu of the repo)
3. Scroll down to the **Pages** section (left sidebar → Pages)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, choose `main` and `/ (root)` → click **Save**
6. Wait ~2 minutes, then visit:  
   `https://YOUR_USERNAME.github.io`

That's it — your website is live! 🎉

---

### Step 7 — Update your website in the future
Whenever you make changes (add photos, update text, etc.):

```bash
cd "C:\Users\faisa\OneDrive - University of Illinois Chicago\Desktop\Website&Portfolio"

git add .
git commit -m "Update: describe what you changed"
git push
```

GitHub Pages will automatically re-deploy within a minute or two.

---

## 📁 File Structure

```
Website&Portfolio/
├── index.html              ← Main page (edit content here)
├── css/
│   └── style.css           ← All styles / colours / layout
├── js/
│   └── main.js             ← Animations, particles, interactions
├── assets/
│   ├── images/             ← Add your photos here (jpg/png/webp)
│   └── videos/             ← Add your videos here (mp4/webm)
└── README.md               ← This file
```

---

## 🖼️ How to Add Photos & Videos

### Adding a photo
1. Place your image in `assets/images/` (e.g. `robot1.jpg`)
2. Open `index.html` in VS Code
3. Find the `media-item` block you want to replace
4. Replace the `<div class="media-placeholder">...</div>` with:
   ```html
   <img src="assets/images/robot1.jpg" alt="Pentagon Robot assembly">
   ```

### Adding your profile photo
1. Place your photo in `assets/images/me.jpg`
2. In the **About** section, replace:
   ```html
   <div class="photo-placeholder">...</div>
   ```
   with:
   ```html
   <img src="assets/images/me.jpg" alt="Faisal Yusuf Ughratdar">
   ```

### Adding a video
1. Place your video in `assets/videos/demo.mp4`
2. Replace the placeholder with:
   ```html
   <video src="assets/videos/demo.mp4" controls></video>
   ```

### Embedding a YouTube video
```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

---

## 🎨 Customisation Tips

| What                     | Where to change                              |
|--------------------------|----------------------------------------------|
| Colours / theme          | `css/style.css` → `:root` variables (top)    |
| Hero text / roles        | `js/main.js` → `roles` array (line ~53)      |
| Add/remove projects      | `index.html` → `#projects` section           |
| Add/remove experience    | `index.html` → `#experience` section         |
| Contact info             | `index.html` → `#contact` section            |
| LinkedIn / GitHub links  | `index.html` → search for `linkedin.com`     |
| Update GitHub link       | `index.html` → find `href="https://github.com/"` and replace with your profile URL |

---

## 🌐 Custom Domain (Optional)
If you own a domain (e.g. `faisalughratdar.com`):
1. In your repo go to **Settings → Pages → Custom domain** and enter your domain
2. With your domain registrar, add a CNAME record pointing to `YOUR_USERNAME.github.io`
3. Check **Enforce HTTPS**

---

## 📞 Questions?
If you run into any issues with the GitHub setup, email **fughra2@uic.edu** or check [GitHub Pages docs](https://docs.github.com/en/pages).
