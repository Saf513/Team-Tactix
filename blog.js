// On récupère les éléments nécessaires
const blogItems = document.querySelectorAll('.blog-item');
const blogDetail = document.getElementById('blog-detail');
const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const blogImage = document.getElementById('blog-image');

// Fonction pour afficher les détails de l'article
function displayBlogDetail(id) {
    // Simuler des articles
    const blogPosts = [
        {
            id: 1,
            title: "La domination de Messi au PSG : une ère terminée ?",
            content: "Le départ de Lionel Messi du Paris Saint-Germain marque la fin d'une ère pour le club français. Après avoir apporté de nombreux titres à Paris, l'Argentin se prépare à un nouveau défi en MLS...",
            image: "https://th.bing.com/th/id/OIP.01BNcPUHhfTMRwmaa8kj4gHaEK?rs=1&pid=ImgDetMain"
        },
        {
            id: 2,
            title: "Le nouveau phénomène du football : Kylian Mbappé",
            content: "Kylian Mbappé est désormais l'un des meilleurs joueurs au monde. Son avenir au PSG semble incertain, mais sa place parmi les meilleurs de l'histoire du football est assurée...",
            image: "https://th.bing.com/th/id/R.764c72a2ed714d514ab4887283f907f9?rik=2ftcPdaZLuvCew&pid=ImgRaw&r=0"
        },
        {
            id: 3,
            title: "Les jeunes talents à surveiller en 2024",
            content: "De nombreux jeunes joueurs émergent dans les ligues majeures du football. Quels sont les noms à suivre en 2024 et pourquoi ces talents pourraient devenir les stars du futur ?",
            image: "https://th.bing.com/th/id/OIP.OgG1dSojcSdwqs3OlQfvyQHaEK?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.OgG1dSojcSdwqs3OlQfvyQHaEK?rs=1&pid=ImgDetMain"
        }
    ];

    // Chercher l'article par ID
    const post = blogPosts.find(post => post.id === id);

    if (post) {
        // Mettre à jour la section des détails avec les informations de l'article
        blogTitle.textContent = post.title;
        blogContent.textContent = post.content;
        blogImage.src = post.image;
        blogImage.alt = post.title; // Ajout d'une description à l'image
        blogDetail.style.display = 'block'; // Afficher la section des détails
    }
}

// Ajouter un événement de clic à chaque article
blogItems.forEach(item => {
    item.addEventListener('click', function() {
        const postId = parseInt(this.getAttribute('data-id')); // Récupérer l'ID de l'article
        displayBlogDetail(postId); // Afficher les détails de l'article
    });
});

// Fermer la section des détails lorsque l'utilisateur clique ailleurs (facultatif)
document.body.addEventListener('click', function(event) {
    if (!event.target.closest('.blog-item') && !event.target.closest('.blog-detail')) {
        blogDetail.style.display = 'none'; // Masquer la section des détails
    }
});
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
});

window.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

