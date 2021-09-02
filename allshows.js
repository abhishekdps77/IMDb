window.addEventListener('load', () => {
    loadAllShows();
});

var loadAllShows = async () => {
    const config = {
        params: { page: 0 }
    }
    const res = await axios.get('https://api.tvmaze.com/shows', config);
    createShows(res.data, 0);
};

var loadAllShowsNumber = async (number) => {
    const config = {
        params: { page: number }
    }
    const res = await axios.get('https://api.tvmaze.com/shows', config);
    createShows(res.data, number);
};

const clearScreen = () => {
    const showIndexContainer = document.getElementById('showIndexContainer');
    if (showIndexContainer.children.length === 0) {
        console.log('empty container');
    }
    else {
        showIndexContainer.innerHTML = '';
    }
};
const createShows = (shows, number) => {

    for (let result of shows) {
        let name = result.name;
        let imageUrl = result.image.medium;
        let url = result.officialSite;
        let id = result.id;

        const showDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newName = document.createElement('p');
        const detailLink = document.createElement('a');

        const showIndexContainer = document.getElementById('showIndexContainer');
        showIndexContainer.appendChild(showDiv);
        showDiv.appendChild(newImage);
        showDiv.appendChild(newName);
        showDiv.appendChild(detailLink);

        document.getElementById('showIndexHeading').innerHTML = `Page ${Number(number)} of 6 !!!`;
        showDiv.setAttribute('class', 'showDiv');
        newName.setAttribute('class', 'showDivTitle');
        newImage.src = imageUrl;
        newImage.classList.add('showDivImage');
        newName.innerHTML = name;
        detailLink.innerHTML = '>>>>>'
        detailLink.href = url;
        detailLink.target = '_blank';

        showDiv.addEventListener('click', () => {
            testJS(id);
        });
    }
};

for (var i = 0; i < document.querySelectorAll('button').length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        clearScreen();
        loadAllShowsNumber(buttonInnerHTML);
    });
}

var testJS = (id) => {
    console.log(id);
    var url = 'file:///C:/Users/abhis/Desktop/IMDB/showcast.html?id=' + encodeURIComponent(id);
    window.open(url);
};