const titleClickHandler = function(event) {
    event.preventDefault();
    const links = document.querySelectorAll('.titles a.active');
    for(link of links) {
        link.classList.remove('active');
    }
    this.classList.add('active');

    const articles = document.querySelectorAll(optArticleSelector);

    for(article of articles) {
        article.classList.remove('active');
    }

    const attributeHref = this.getAttribute('href');
    
    const targetArticle = document.querySelector(attributeHref);
    
    targetArticle.classList.add('active');

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles'; // jak musi być w zmiennych/stałych... to niech jest...

const generateTitleLinks = function(event) {
    document.querySelector(optTitleListSelector).innerHTML = '';
    const allArticles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for(article of allArticles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        html += '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    }

    document.querySelector('.titles').innerHTML = html;

    console.log(html);
}


generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}