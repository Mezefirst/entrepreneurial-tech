# Profile Photo Instructions

## How to Replace the Profile Photo

To replace the current professional placeholder with your actual photo:

1. **Prepare your photo:**
   - Use a high-quality, professional headshot
   - Recommended size: 300x300 pixels or larger (square format works best)
   - Supported formats: JPG, PNG, WebP
   - File size: Keep under 500KB for optimal loading

2. **Replace the file:**
   - Save your photo as `profile-photo.jpg` or `profile-photo.png`
   - Place it in this directory (`/src/assets/images/`)
   - Delete or rename the current `profile-photo.svg`

3. **Update the import (if changing file extension):**
   - Open `/src/App.tsx`
   - Find the line: `import profilePhoto from "@/assets/images/profile-photo.svg"`
   - Change it to: `import profilePhoto from "@/assets/images/profile-photo.jpg"` (or `.png`)

## Photo Guidelines for Professional Impact

- **Background:** Solid color or subtle, professional background
- **Lighting:** Even, soft lighting on your face
- **Expression:** Confident, approachable smile
- **Attire:** Professional clothing appropriate for engineering field
- **Framing:** Head and shoulders visible, centered in frame
- **Quality:** Sharp focus, good resolution

## Current Setup

The avatar component includes:
- Professional ring border effect
- Fallback initials (MZ) if photo fails to load
- Proper alt text for accessibility
- Responsive sizing