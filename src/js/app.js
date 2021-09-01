const url = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";
    const postsContainer = document.querySelector(".latest-posts");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.map(post => {

            const date = new Date(post.date).toLocaleDateString('en-GB', {  
                day:   'numeric',
                month: 'short',
                year:  'numeric',
            });
            const author = post._embedded.author[0];
            const authorName = author.name;
            const title = post.title.rendered;

            if (author.name == "") { authorName = "Anonymus"; }
            if (title == "") { title = "Blog Post Title";}

            let category_index = 0;
            let categories = "";
            let category = post._embedded["wp:term"][0][category_index];

            while (typeof category !== 'undefined') {
                categories += category.name + " ";
                ++category_index;
                category = post._embedded["wp:term"][0][category_index];
            }

            let topic_index = 0;
            let topics = "";
            let topic = post._embedded["wp:term"][2][topic_index];

            while (typeof topic !== 'undefined') {
                topics += topic.name + " ";
                ++topic_index;
                topic = post._embedded["wp:term"][2][topic_index];
            }

            if (topics == "") topics = "Blog Post Topic";

            const innerContent = `
            <div class="p-card col-4">
                <p class="p--heading-4 topic">${topics}</p>
                <hr class="hr-dotted">
                <a href="${post.link}"><img width="380" src="${post.featured_media}" alt=""/></a>
                <p class="p-heading--3 p-card__title">
                        <a href="${post.link}" class="blue">${title}</a>
                </p>
                <p><em>By <a href="${author.link}" class="blue">${authorName}</a> on ${date}</em></p>
                <hr class="hr-dotted">
                <p class="p-heading--5 blog-category">${categories}</p>
            </div>
            `
            postsContainer.innerHTML += innerContent;
        })
    });