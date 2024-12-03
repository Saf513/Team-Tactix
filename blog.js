const blogItems = document.querySelectorAll('.blog-item');
const blogDetail = document.getElementById('blog-detail');
const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const blogImage = document.getElementById('blog-image');

function displayBlogDetail(id) {
        const blogPosts = [
        {
            id: 1,
            title: "La domination de Messi au PSG : une ère terminée ?",
            content: "Le départ de Lionel Messi du Paris Saint-Germain marque la fin d'une ère pour le club français. Après avoir apporté de nombreux titres à Paris, l'Argentin se prépare à un nouveau défi en MLS...",
            image: "https:        },
        {
            id: 2,
            title: "Le nouveau phénomène du football : Kylian Mbappé",
            content: "Kylian Mbappé est désormais l'un des meilleurs joueurs au monde. Son avenir au PSG semble incertain, mais sa place parmi les meilleurs de l'histoire du football est assurée...",
            image: "https:        },
        {
            id: 3,
            title: "Les jeunes talents à surveiller en 2024",
            content: "De nombreux jeunes joueurs émergent dans les ligues majeures du football. Quels sont les noms à suivre en 2024 et pourquoi ces talents pourraient devenir les stars du futur ?",
            image: "https:        }
    ];

        const post = blogPosts.find(post => post.id === id);

    if (post) {
                blogTitle.textContent = post.title;
        blogContent.textContent = post.content;
        blogImage.src = post.image;
        blogImage.alt = post.title;         blogDetail.style.display = 'block';     }
}

blogItems.forEach(item => {
    item.addEventListener('click', function() {
        const postId = parseInt(this.getAttribute('data-id'));         displayBlogDetail(postId);     });
});

document.body.addEventListener('click', function(event) {
    if (!event.target.closest('.blog-item') && !event.target.closest('.blog-detail')) {
        blogDetail.style.display = 'none';     }
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

