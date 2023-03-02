const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    for (const catergory of categories) {
        const { category_id, category_name } = catergory;
        document.getElementById('categories').innerHTML +=
            `<button onclick="loadNews('${category_id}', '${category_name}')" class="btn">${category_name}</button>`;
    }
}

const loadNews = (category_id, category_name) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayNews(data.data,category_name))
}

const displayNews = (all_news,category_name) => {
    const newsContainer = document.getElementById('news-container');
    const foundMessage = document.getElementById('found-message');

    foundMessage.innerHTML = `${all_news.length} items found for category ${category_name}`;
    newsContainer.innerHTML = '';
    
    for (const news of all_news) {
        newsContainer.innerHTML +=
            `
            <div class="bg-white p-4 rounded row">
                <div class="col-md-3 h-100">
                    <img class="w-100 h-100 rounded" src="${news.image_url}" alt="">
                </div>
                <div class="col-md-9 d-grid align-content-between">
                    <h3>${news.title}</h3>
                    <p class="text-muted">${news.details.slice(0,200)}...</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="d-flex gap-2 align-items-center">
                            <img style="height: 50px;" class="rounded-circle"
                                src="${news.author.img}" alt="">
                            <div>
                                <span>${news.author.name}</span> <br>
                                <span class="text-muted">${news.author.published_date}</span>
                            </div>
                        </div>

                        <div>
                            <i class="bi bi-eye-fill"></i> ${news.total_view}
                        </div>
                        <div>
                            ${news.rating.number}
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>                            
                        </div>

                        <div>
                            <i class="bi bi-arrow-right text-primary"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
}