# Profile Photo Instructions

## How to Upload Your Professional Photo

To replace the current placeholder profile photo with your actual professional photo:

### Option 1: Replace the SVG file directly
1. **Save your professional photo** as `profile-photo.jpg`, `profile-photo.png`, or `profile-photo.webp`
2. **Add the file** to this directory (`/src/assets/images/`)
3. **Update the import** in `/src/App.tsx` from:
   ```typescript
   import profilePhoto from "@/assets/images/profile-photo.svg"
   ```
   to:
   ```typescript
   import profilePhoto from "@/assets/images/profile-photo.jpg" // or .png/.webp
   ```

### Option 2: Keep the SVG filename (recommended)
1. **Save your professional photo** with any filename (e.g., `mesfinasfaw-headshot.jpg`)
2. **Add the file** to this directory
3. **Rename your photo file** to `profile-photo.jpg` (or your preferred format)
4. **Delete or rename** the current `profile-photo.svg` file
5. **Update the import** in `/src/App.tsx` accordingly

### Photo Requirements & Best Practices

**Technical Requirements:**
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 400x400px to 800x800px (square aspect ratio)
- **File size**: Keep under 500KB for optimal loading

**Professional Photo Guidelines:**
- **High quality**: Clear, well-lit, professional headshot
- **Background**: Clean, neutral background (solid color or subtle pattern)
- **Composition**: Head and shoulders visible, face centered
- **Expression**: Professional, approachable smile
- **Attire**: Business casual or professional clothing appropriate for your field
- **Lighting**: Even, natural lighting that doesn't cast harsh shadows

**Materials Science Engineer Specific Tips:**
- Consider wearing professional attire that reflects your engineering background
- A lab coat or professional blazer can reinforce your expertise
- Ensure the photo conveys both technical competence and approachability
- Clean, professional appearance that matches the academic/industrial nature of your work

### Current Placeholder
The current `profile-photo.svg` is a professional placeholder that includes:
- Your initials (MZ)
- Materials science themed elements (molecular structure, engineering symbols)
- Professional color scheme matching your site theme
- Clean, academic styling appropriate for a materials science engineer

This placeholder will work well until you upload your actual professional photo.

### Avatar Component Features
The avatar component includes:
- Professional ring border effect with primary color theme
- Fallback initials (MZ) if photo fails to load
- Proper alt text for accessibility
- Responsive sizing (128x128px on desktop)
- Smooth loading transitions