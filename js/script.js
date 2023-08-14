const titleClickHandler = function(event) {
    event.preventDefault();
    const links = document.querySelectorAll('.titles a.active');
    for(link of links) {
        link.classList.remove('active');
    }
    this.classList.add('active');

    const articles = document.querySelectorAll('.posts article.active');

    for(article of articles) {
        article.classList.remove('active');
    }

    const attributeHref = this.getAttribute('href');
    
    const targetArticle = document.querySelector(attributeHref);
    
    targetArticle.classList.add('active');

}


const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}