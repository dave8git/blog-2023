const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML),
    authorsListLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
  }

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
  optArticleAuthorSelector = '.post-author', 
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors'

function generateTitleLinks(customSelector = '') {
    document.querySelector(optTitleListSelector).innerHTML = '';
    const allArticles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(optArticleSelector + customSelector);
    let html = '';
    for(article of allArticles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        html += linkHTML; //'<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    }
    document.querySelector('.titles').innerHTML = html;
}


generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
    const params = {
        max: 0,
        min: 999999
    }

    for(let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + ' times');
        if(tags[tag] > params.max){
            params.max = tags[tag];
        } else {
            params.min = tags[tag];
        }
    }
    return params; 
}

function calculateTagClass(count, params) {
    return Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
}

function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
        const articleTagsWrapper = article.querySelector('.post-tags .list');
        const articleTags = article.getAttribute('data-tags');
        const tagsArray = articleTags.split(' ');
        let html = '';
        for (tag of tagsArray) {
            const linkHTMLData = {tag: tag};
            const linkHTML = templates.tagLink(linkHTMLData);
            //let linkHTML ='<li><a href="#tag-'+tag+'">'+tag+'</a></li> ';
            html+= linkHTML;
            if(!allTags[tag]) {
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
        }
        articleTagsWrapper.innerHTML = html;
        const tagList = document.querySelector(optTagsListSelector);
        //tagList.innerHTML = allTags.join(' ');
        console.log(allTags);
        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams);
        //let allTagsHTML = '';
        const allTagsData = {tags: []};

        for(let tag in allTags) {
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            })
            //allTagsHTML += '<li><a href="#tag-'+tag+'" class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)+'">'+ ' ' + tag + ' ' + '</a>' + '</li>'; //(' + allTags[tag] + ')
        }
        console.log('allTagsData', allTagsData);
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        //tagList.innerHTML = allTagsHTML;
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
    const allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(article of articles) {
        const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
        const articleAuthor = article.getAttribute('data-author');
        const linkHTMLData = {articleAuthor: articleAuthor};
        const html = templates.authorLink(linkHTMLData);
        //let html = '<li><a href="#author-'+articleAuthor+'"><span class="articleAuthor">'+articleAuthor+'</span></a></li>';
        // if(allAuthorsLinks.indexOf(html) == -1) {
        //     console.log(typeof(allAuthorsLinks));
        //     allAuthorsLinks.push(html);
        // }
        if(!allAuthors[articleAuthor]) {
            allAuthors[articleAuthor] = 1;
        } else {
            allAuthors[articleAuthor]++;
        }

        articleAuthorWrapper.innerHTML = html;
    }

    const allAuthorsData = {authors: []};
    for(author in allAuthors) {
        allAuthorsData.authors.push({
            author: author,
        })  
    }

    const linkHTML = templates.authorsListLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);

    console.log('linkHTML', linkHTML);
    // for(let authorLink of allAuthorsLinks) {
    //     allAuthorsData.authors.push({
    //         author: articleAuthor;
    //     })
    // }
    document.querySelector(optAuthorsListSelector).innerHTML = linkHTML;
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

