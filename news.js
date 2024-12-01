
const newsItems = document.querySelectorAll('.news-item');

const newsDetail = document.getElementById('news-detail');
const newsTitle = document.getElementById('news-title');
const newsContent = document.getElementById('news-content');
const newsImage = document.getElementById('news-image');


function displayNewsDetail(id) {
    const articles = [
        {
            id: 1,
            title: "Finale de la Coupe du Monde 2022 : Une victoire historique pour l'Argentine",
            content: "Le 18 décembre 2022, l'Argentine a remporté la Coupe du Monde 2022 après une finale épique contre la France. Lionel Messi a été l'un des héros de la compétition, menant son équipe à la victoire avec un doublé en finale.",
            image: "https://th.bing.com/th/id/OIP.rBI5cv0FNgcJicq7Dk87QQHaE8?rs=1&pid=ImgDetMain"
        },
        {
            id: 2,
            title: "Transfert de Kylian Mbappé : Rester au PSG ou rejoindre le Real Madrid ?",
            content: "Les rumeurs de transfert de Kylian Mbappé continuent d'agiter le marché. Le jeune attaquant français pourrait quitter le Paris Saint-Germain pour rejoindre le Real Madrid cet été, après une saison impressionnante avec le PSG.",
            image: "https://th.bing.com/th/id/OIP.0R0Ja8pz5iPIFiKbyHfZGwHaJh?rs=1&pid=ImgDetMain"
        },
        {
            id: 3,
            title: "La finale de la Ligue des champions 2023 : Manchester City couronné champion d'Europe",
            content: "Le 10 juin 2023, Manchester City a remporté sa première Ligue des champions en battant l'Inter Milan 1-0 en finale. Un seul but de Rodri a suffi pour offrir à Pep Guardiola et ses hommes ce titre tant convoité.",
            image: "https://www.les-transferts.com/wp-content/uploads/2023/06/Ligue-des-Champions-600x401.jpg"
        }
    ];
    const article = articles.find(a => a.id === id);
    
    if (article) {
        newsTitle.textContent = article.title;
        newsContent.textContent = article.content;
        newsImage.src = article.image;
        newsImage.alt = article.title; 
        newsDetail.style.display = 'block'; 
    }
}


newsItems.forEach(item => {
    item.addEventListener('click', function() {
        const articleId = parseInt(this.getAttribute('data-id')); 
        displayNewsDetail(articleId); 
    });
});



document.body.addEventListener('click', function(event) {
    if (!event.target.closest('.news-item') && !event.target.closest('.news-detail')) {
        newsDetail.style.display = 'none'; 
    }
});
