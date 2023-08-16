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
  optTitleListSelector = '.titles', // jak musi być w zmiennych/stałych... to niech jest...
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
    document.querySelector(optTitleListSelector).innerHTML = '';
    const allArticles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(optArticleSelector + customSelector);
    let html = '';
    for(article of allArticles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        html += '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    }
    document.querySelector('.titles').innerHTML = html;
}


generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}


function generateTags() {
    const articles = document.querySelectorAll(optArticleSelector);
    for(article of articles) {
        const articleTagsWrapper = article.querySelector('.post-tags .list');
        const articleTags = article.getAttribute('data-tags');
        const tagsArray = articleTags.split(' ');
        let html = '';
        for (tag of tagsArray) {
            html+='<li><a href="#tag-'+tag+'">'+tag+'</a></li> '
        }
        articleTagsWrapper.innerHTML = html;
    }
}

generateTags();

function tagClickHandler(event) {
    event.preventDefault(); 

    const href = this.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }
    const activeMarkedTags = document.querySelectorAll('a[href="' + href + '"]');
    for (let activeMarkedTag of activeMarkedTags) {
        activeMarkedTag.classList.add('active');
    }
    // console.log(activeMarkedTags);
    // console.log('href', href);
    // console.log('tag', tag);
    // console.log('activeTags', activeTags);
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const allTags = document.querySelectorAll('a[href^="#tag-"]');
    for(let tag of allTags) {
        tag.addEventListener('click', tagClickHandler);
    }
}

addClickListenersToTags();

const generateAuthors = function() {
    const articles = document.querySelectorAll(optArticleSelector);
    for(article of articles) {
        const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
        const articleAuthor = article.getAttribute('data-author');
        let html = '<li><a href="#author-'+articleAuthor+'"><span class="articleAuthor">'+articleAuthor+'</span></a></li>';
        articleAuthorWrapper.innerHTML = html;
    }
}

generateAuthors();

const addClickListenersToAuthors = function() {
    const allAuthors = document.querySelectorAll('a[href^="#author-"]');
    for(let author of allAuthors) {
        author.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors(); 

function authorClickHandler(event) {
    event.preventDefault();
    
    const href = this.getAttribute('href');
    const author = href.replace('#author-', '');

    generateTitleLinks('[data-author="'+author+'"]');
}

