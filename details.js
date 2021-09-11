window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    getDetails(data.id);
}

const getDetails = async (id) => {
    if (id === 'null') {
        const showContainer = document.getElementById('showContainer');
        const errorImage = document.createElement('img');
        showContainer.appendChild(errorImage);
        errorImage.src = 'error.jpg';
        errorImage.style.width = '100%';
        errorImage.style.height = '100%';
    }
    const config = {
        params: { thetvdb: id }
    }

    const res = await axios.get('https://api.tvmaze.com/lookup/shows', config);
    let show = {
        name: res.data.name,
        type: res.data.type,
        language: res.data.language,
        genres: res.data.genres[0],
        image: res.data.image.medium,
        premiered: res.data.premiered,
        officialSite: res.data.officialSite,
        status: res.data.status,
        summary: res.data.summary
    };
    console.log(show);

    const showDiv = document.createElement('div');
    const newImage = document.createElement('img');
    const newName = document.createElement('h1');
    const newType = document.createElement('p');
    const newGenres = document.createElement('p');
    const newPremired = document.createElement('p');
    const newLanguage = document.createElement('p');
    const newStatus = document.createElement('p');
    const newSummary = document.createElement('p');
    const detailLink = document.createElement('a');

    const showContainer = document.getElementById('showContainer');
    showContainer.appendChild(showDiv);
    showDiv.appendChild(newImage);
    showDiv.appendChild(newName);
    showDiv.appendChild(newType);
    showDiv.appendChild(newGenres);
    showDiv.appendChild(newPremired);
    showDiv.appendChild(newLanguage);
    showDiv.appendChild(newStatus);
    showDiv.appendChild(newSummary);
    showDiv.appendChild(detailLink);

    showDiv.setAttribute('class', 'individualShowDiv');
    newImage.src = show.image;
    newImage.classList.add('indiviualShowDivImage');
    newName.innerHTML = show.name;
    newType.innerHTML = `<b>Type:</b> ${show.type}`;
    newGenres.innerHTML = `<b>Genere:</b> ${show.genres}`;
    newPremired.innerHTML = `<b>Premeried:</b> ${show.premiered}`;
    newLanguage.innerHTML = `<b>Language:</b> ${show.language}`;
    newStatus.innerHTML = `<b>Status:</b> ${show.status}`;
    newSummary.innerHTML = `<b>Summary:</b> ${show.summary}`;
    detailLink.innerHTML = 'Read more ....'
    detailLink.href = show.officialSite;
    detailLink.target = '_blank';

    document.getElementById('showNameHeading').innerHTML = `${show.name} >>>`;
}