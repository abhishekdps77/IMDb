window.addEventListener('load', () => {
    getNewsItems();
});

const getNewsItems = async () => {
    const res = await axios.get('http://api.mediastack.com/v1/news?access_key=1d7eac3fc308df044ada260eb4077dfb&categories=entertainment&languages=en');
    console.log(res.data.data);
    displaynews(res.data.data);
}

const displaynews = (news) => {
    for (let result of news) {
        let author = result.author;
        let title = result.title;
        let description = result.description;
        let publish = result.published_at;
        let imageUrl = result.image;
        let detailLink = result.url;

        const newsDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newTitle = document.createElement('h2');
        const newAuthor = document.createElement('p');
        const newDescription = document.createElement('p');
        const newPublish = document.createElement('p');
        const newdetailLink = document.createElement('a');

        const topActorContainer = document.getElementById('topActorContainer');
        topActorContainer.appendChild(newsDiv);
        newsDiv.appendChild(newImage);
        newsDiv.appendChild(newTitle);
        newsDiv.appendChild(newAuthor);
        newsDiv.appendChild(newPublish);
        newsDiv.appendChild(newDescription);
        newsDiv.appendChild(newdetailLink);

        newsDiv.setAttribute('class', 'scheduleDiv');
        newImage.classList.add('scheduleImage');
        newDescription.classList.add('summary');
        if (imageUrl===null){
            newImage.src = 'news.jpg'
        }
        else{
            newImage.src = imageUrl;
        }
        newTitle.innerHTML = title;
        newAuthor.innerHTML = `Author: ${author}`;
        newPublish.innerHTML = `Published on : ${publish}`;
        newDescription.innerHTML = description;
        newdetailLink.innerHTML = 'Read more >>>>'
        newdetailLink.href = detailLink;
        newdetailLink.target = '_blank';
    }
}