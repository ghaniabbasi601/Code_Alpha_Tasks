const images = [
    {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Mountain Landscape",
        description: "Beautiful view of mountains during sunrise",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "City Skyline",
        description: "Modern city skyline at dusk",
        category: "city"
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Northern Lights",
        description: "Aurora borealis over a frozen lake",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Desert Dunes",
        description: "Golden sand dunes under the sun",
        category: "travel"
    },
    {
        src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Urban Architecture",
        description: "Modern architectural design in a metropolitan city",
        category: "city"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Colorful Art",
        description: "Abstract painting with vibrant colors",
        category: "abstract"
    },
    {
        src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Coastal View",
        description: "Waves crashing on rocky shore",
        category: "nature"
    },
    {
        src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Historic Town",
        description: "Traditional houses in a European town",
        category: "travel"
    },
    {
        src: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        title: "Colorful Abstract",
        description: "Vibrant abstract patterns and textures",
        category: "abstract"
    }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const imageCounter = document.getElementById('image-counter');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentImageIndex = 0;
let filteredImages = [...images];

function initGallery() {
    renderGallery();
    setupEventListeners();
}

function renderGallery() {
    gallery.innerHTML = '';

    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${image.category}`;
        galleryItem.setAttribute('data-index', index);

        galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" class="gallery-img">
                    <div class="gallery-caption">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                        <span class="category">${image.category}</span>
                    </div>
                `;

        gallery.appendChild(galleryItem);
    });
}


function setupEventListeners() {

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            if (filter === 'all') {
                filteredImages = [...images];
            } else {
                filteredImages = images.filter(image => image.category === filter);
            }

            renderGallery();
        });
    });


    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;

        currentImageIndex = parseInt(galleryItem.getAttribute('data-index'));
        openLightbox(currentImageIndex);
    });

    closeLightbox.addEventListener('click', closeLightboxModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);


    document.addEventListener('keydown', (e) => {
        if (!lightbox.style.display || lightbox.style.display === 'none') return;

        if (e.key === 'Escape') closeLightboxModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxModal();
    });
}

function openLightbox(index) {
    const image = filteredImages[index];
    lightboxImg.src = image.src;
    lightboxCaption.textContent = `${image.title} - ${image.description}`;
    updateImageCounter(index);

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightboxModal() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    openLightbox(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    openLightbox(currentImageIndex);
}

function updateImageCounter(index) {
    imageCounter.textContent = `${index + 1} / ${filteredImages.length}`;
}

document.addEventListener('DOMContentLoaded', initGallery);

