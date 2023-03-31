let image = null;

document.getElementById('image-input').addEventListener('change', (event) => loadImage(event));
document.getElementById('download-16x16').addEventListener('click', () => downloadImage(16));
document.getElementById('download-32x32').addEventListener('click', () => downloadImage(32));
document.getElementById('download-48x48').addEventListener('click', () => downloadImage(48));
document.getElementById('download-128x128').addEventListener('click', () => downloadImage(128));

function loadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        image = new Image();
        image.src = e.target.result;

        // Display the preview
        const preview = document.getElementById('preview');
        preview.innerHTML = '<h3>Preview:</h3>';
        const previewImage = new Image();
        previewImage.src = e.target.result;
        previewImage.style.maxWidth = '300px';
        previewImage.style.maxHeight = '300px';
        preview.appendChild(previewImage);
    };
    reader.readAsDataURL(file);
}

function downloadImage(size) {
    if (!image) {
        alert('Please select an image to resize.');
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, size, size);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `image-${size}x${size}.png`;
    link.click();
}
