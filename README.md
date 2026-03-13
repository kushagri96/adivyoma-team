# adivyoma

# Team Adi Vyoma: Website Editing & Collaboration Guide

This guide explains how to replace the dummy assets on the website and how your team can collaborate on the code without needing to share login passwords.

---

## 🤝 Part 1: How to Collaborate securely (No Password Sharing)

### Option A: Add them as Collaborators (Best for small, trusted teams)
1. Go to your repository on GitHub (`github.com/kushagri96/adivyoma`).
2. Click **Settings** > **Collaborators**.
3. Click **Add people** and invite your team members using their own GitHub usernames.
4. Once they accept, they can clone the repo, make changes, and push directly to it using their own accounts.

### Option B: Forking (Best if you want to review their changes first)
1. Tell your team members to go to your repository on GitHub and click the **Fork** button (top right).
2. This creates a personal copy on their account.
3. They make changes to their copy.
4. When they are ready, they click **Contribute** > **Open Pull Request**.
5. You review their changes and click "Merge" to add them to the main website!

---

## 🖼️ Part 2: Updating Images & Photos

All images are stored in the `images/` folder. The easiest way to update them is to **keep the exact same file names**.

**To update Team Photos:**
1. Collect your team's square or portrait photos.
2. Name them exactly as they appear in the folder (e.g., `krish.jpg`, `priyani.jpg`).
3. Replace the old `.jpg` files in the `images/team/` folder with your new ones.
*Note: If you change the file name or extension (like from `.jpg` to `.png`), you must also open `index.html`, find that person's card, and update the `<img src="...">` path to match.*

**To update Gallery/Sponsors/Earth:**
1. Replace `earth.jpg` in the `images/` folder for the main background.
2. Replace `image1.jpg` through `image4.jpg` in `images/gallery/` for the rocket development section.
3. Replace `sponsor1.svg` through `sponsor5.svg` in `images/sponsors/`.

---

## 🚀 Part 3: Replacing the 3D Rocket Model

Currently, a dummy model made of code shapes is rotating in the "Rocket Model" section. You need a `.gltf` or `.obj` 3D model file of your actual rocket.

**Step-by-Step:**
1. Save your 3D model file (e.g., `my_rocket.gltf`) inside the project folder (you can make an `assets/` or `models/` folder for it).
2. Open `index.html` and add the Three.js loader script right below the main Three.js script at the bottom:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
   ```
3. Open `script.js` and locate the comment block starting with `/* --- ROCKET MODEL PLACEHOLDER --- */`.
4. Delete everything between `/* --- Dummy Model Construction --- */` and `/* --------- */`. (This deletes lines defining `bodyGeometry`, `nose`, `fin1`, etc.).
5. Delete the `rocket.add(...)` lines that added those dummy parts.
6. Add this code to load your model into the existing `rocket` group:
   ```javascript
   const loader = new THREE.GLTFLoader();
   loader.load('my_rocket.gltf', function(gltf) {
       // Optional: scale or position your model so it fits
       gltf.scene.scale.set(1, 1, 1);
       gltf.scene.position.y = -2; // move it down slightly if needed
       
       rocket.add(gltf.scene);
   });
   ```

---

## 📈 Part 4: Adjusting the Flight Trajectory Graph

The flight trajectory is an SVG graphic defined directly in `index.html`. You can easily change the altitudes and distances.

**To change text labels:**
1. Open `index.html` and scroll to `<section id="trajectory-section">`.
2. Look for the `<text>` tags.
3. To change "30k ft" to something else, simply edit the text inside: `<text ...>New Altitude</text>`.

**To change the curve shape:**
Look for this line: 
`<path id="flightPath" class="flight-path" d="M 100 380 Q 425 50 700 380" />`
This uses an SVG Quadratic Curve (Q).
*   `M 100 380`: The start point (bottom left).
*   `Q 425 50`: The peak of the curve. Lower the `50` to make it go higher, increase it to make it flatter. Change `425` to shift the peak left or right.
*   `700 380`: The end point (bottom right).

*The animated rocket will automatically follow whatever curve you draw!*
