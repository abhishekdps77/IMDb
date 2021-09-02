
const button = document.getElementsByTagName('button')[0]
button.addEventListener('click', (event) => {
    event.preventDefault();
    const country = document.getElementById('countryCode').value;
    const date = document.getElementById('formDate').value;
    clearScreen();
    getSchedule(country, date);
});

const getSchedule = async (country, date) => {
    const config = {
        params: { country: country, date: date }
    }
    const res = await axios.get(' https://api.tvmaze.com/schedule', config);
    console.log(res.data);
    createSchedule(res.data, country, date);
};

const clearScreen = () => {
    const scheduleContainer = document.getElementById('scheduleContainer');
    if (scheduleContainer.children.length === 0) {
        console.log('empty container');
    }
    else {
        scheduleContainer.innerHTML = '';
    }
};

const createSchedule = (schedules, country, date) => {

    if (schedules.length === 0) {
        const scheduleContainer = document.getElementById('scheduleContainer');
        const errorImage = document.createElement('img');
        scheduleContainer.appendChild(errorImage);
        errorImage.src = 'error.jpg';
        errorImage.style.width = '100%';
        errorImage.style.height = '100%';
    }

    for (let result of schedules) {
        let name = result.show.name;
        let type = result.show.type;
        let language = result.show.language;
        let imageUrl = result.show.image.medium;
        let summary = result.show.summary;
        let airdate = result.airdate;
        let airtime = result.airtime;
        let moreDetail = result.show.url;

        const scheduleDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newName = document.createElement('h2');
        const newType = document.createElement('p');
        const newLanguage = document.createElement('p');
        const newSummary = document.createElement('p');
        const newairdate = document.createElement('p');
        const newairtime = document.createElement('p');
        const detailLink = document.createElement('a');


        const scheduleContainer = document.getElementById('scheduleContainer');
        scheduleContainer.appendChild(scheduleDiv);
        scheduleDiv.appendChild(newImage);
        scheduleDiv.appendChild(newName);
        scheduleDiv.appendChild(newType);
        scheduleDiv.appendChild(newLanguage);
        scheduleDiv.appendChild(newairdate);
        scheduleDiv.appendChild(newairtime);
        scheduleDiv.appendChild(newSummary);
        scheduleDiv.appendChild(detailLink);

        document.getElementById('scheduleHeading').innerHTML = `Broadcast Schedule for ${country} on ${date} !!!`;
        scheduleDiv.setAttribute('class', 'scheduleDiv');
        newSummary.classList.add('summary');
        newImage.src = imageUrl;
        newImage.classList.add('scheduleImage');
        newName.innerHTML = name;
        newType.innerHTML = `<b>Type:</b>${type}`;
        newLanguage.innerHTML = `<b>Language:</b> ${language}`;
        newairdate.innerHTML = `<b>Air Date:</b> ${airdate}`;
        newairtime.innerHTML = `<b>Air Time:</b> ${airtime}`;
        newSummary.innerHTML = summary;
        detailLink.innerHTML = 'Know more ....'
        detailLink.href = moreDetail;
        detailLink.target = '_blank';
    }
}