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

    const res = await axios.get(`https://api.tvmaze.com/shows/${id}/crew`);
    createShowCrew(res.data);
}

const createShowCrew = (showCrew) => {
    if (showCrew.length === 0) {
        const crewContainer = document.getElementById('crewContainer');
        const errorImage = document.createElement('img');
        crewContainer.appendChild(errorImage);
        errorImage.src = 'error.jpg';
        errorImage.style.width = '100%';
        errorImage.style.height = '100%';
    }

    for (let result of showCrew) {

        let name = result.person.name;
        let birthday = result.person.birthday;
        let gender = result.person.gender;
        let imageUrl = result.person.image.medium;
        let type = result.type;


        const crewDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newName = document.createElement('h1');
        const newType = document.createElement('p');
        const newGender = document.createElement('p');
        const newDOB = document.createElement('p');

        const crewContainer = document.getElementById('crewContainer');
        crewContainer.appendChild(crewDiv);
        crewDiv.appendChild(newImage);
        crewDiv.appendChild(newName);
        crewDiv.appendChild(newType);
        crewDiv.appendChild(newDOB);
        crewDiv.appendChild(newGender);

        crewDiv.setAttribute('class', 'castDiv');
        newImage.src = imageUrl;
        newImage.setAttribute('class', 'castImage');
        newName.innerHTML = name;
        newType.innerHTML = `<b>Role:</b> ${type}`;
        newGender.innerHTML = `<b>Gender:</b> ${gender}`;
        newDOB.innerHTML = `<b>DOB:</b> ${birthday}`;
    }
}