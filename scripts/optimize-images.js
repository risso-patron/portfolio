const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    { src: 'assets/images/Logo-RP-dorado-sin-fondo.png', dest: 'assets/images/Logo-RP-dorado-sin-fondo.webp' },
    { src: 'assets/images/jorge-luis-perfil-v2.png', dest: 'assets/images/jorge-luis-perfil.webp' },
    // Projects
    { src: 'assets/images/projects/budget-calculator-react/screenshot-desktop.png', dest: 'assets/images/projects/budget-calculator-react/screenshot-desktop.webp' },
    { src: 'assets/images/projects/budget-calculator-react/screenshot-mobile.png', dest: 'assets/images/projects/budget-calculator-react/screenshot-mobile.webp' },
    { src: 'assets/images/projects/homepowerpty.com/screenshot-desktop.png', dest: 'assets/images/projects/homepowerpty.com/screenshot-desktop.webp' },
    { src: 'assets/images/projects/homepowerpty.com/screenshot-detail.png', dest: 'assets/images/projects/homepowerpty.com/screenshot-detail.webp' },
    { src: 'assets/images/projects/homepowerpty.com/screenshot-mobile.png', dest: 'assets/images/projects/homepowerpty.com/screenshot-mobile.webp' },
    // HostPro cleanup (with typos)
    { src: 'assets/images/projects/hostpropanama.com/screenshoot-desktop.png', dest: 'assets/images/projects/hostpropanama.com/screenshot-desktop.webp' },
    { src: 'assets/images/projects/hostpropanama.com/screenshot-mobile .png', dest: 'assets/images/projects/hostpropanama.com/screenshot-mobile.webp' },
    // Somos cleanup (with typos)
    { src: 'assets/images/projects/somosproperties.com/screenshoot-desktop.png', dest: 'assets/images/projects/somosproperties.com/screenshot-desktop.webp' },
    { src: 'assets/images/projects/somosproperties.com/screenshot-mobile .png', dest: 'assets/images/projects/somosproperties.com/screenshot-mobile.webp' },
    { src: 'assets/images/projects/studio-create/screenshot-desktop.png', dest: 'assets/images/projects/studio-create/screenshot-desktop.webp' },
    { src: 'assets/images/projects/studio-create/screenshot-mobile.png', dest: 'assets/images/projects/studio-create/screenshot-mobile.webp' },
    // SEMM International
    { src: 'assets/images/projects/semm-international/screenshot-desktop.png', dest: 'assets/images/projects/semm-international/screenshot-desktop.webp' },
    { src: 'assets/images/projects/semm-international/screenshot-mobile.png', dest: 'assets/images/projects/semm-international/screenshot-mobile.webp' },
    // Provivir Panama
    { src: 'assets/images/projects/provivirpanama.com/screenshot-desktop.png', dest: 'assets/images/projects/provivirpanama.com/screenshot-desktop.webp' },
    { src: 'assets/images/projects/provivirpanama.com/screenshot-mobile.png', dest: 'assets/images/projects/provivirpanama.com/screenshot-mobile.webp' },
    // Icons
    { src: 'assets/icons/android-chrome-512x512.png', dest: 'assets/icons/android-chrome-512x512.webp' },
    { src: 'assets/icons/android-chrome-192x192.png', dest: 'assets/icons/android-chrome-192x192.webp' },
    { src: 'assets/icons/apple-touch-icon.png', dest: 'assets/icons/apple-touch-icon.webp' }
];

async function convert() {
    console.log('--- Starting Conversion to WebP ---');
    for (const img of images) {
        const srcPath = path.resolve(__dirname, '..', img.src);
        const destPath = path.resolve(__dirname, '..', img.dest);
        
        if (fs.existsSync(srcPath)) {
            console.log(`✅ Converting: ${img.src}`);
            try {
                await sharp(srcPath)
                    .webp({ quality: 80 })
                    .toFile(destPath);
                console.log(`   Done: ${img.dest}`);
            } catch (err) {
                console.error(`❌ Error converting ${img.src}:`, err.message);
            }
        } else {
            console.log(`⚠️ Skipping (not found): ${img.src}`);
        }
    }
    console.log('--- Conversion Finished ---');
}

convert();
