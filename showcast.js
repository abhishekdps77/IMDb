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

    const res = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
    createShowCast(res.data);
}

const createShowCast = (showCast) => {
    if (showCast.length === 0) {
        const castContainer = document.getElementById('castContainer');
        const errorImage = document.createElement('img');
        castContainer.appendChild(errorImage);
        errorImage.src = 'error.jpg';
        errorImage.style.width = '100%';
        errorImage.style.height = '100%';
    }

    for (let result of showCast) {
        let name = result.person.name;
        let birthday = result.person.birthday;
        let gender = result.person.gender;
        let imageUrl = result.person.image.medium;
        let charName = result.character.name;
        let charImageUrl = result.character.image.medium;

        const castDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newImageChar = document.createElement('img');
        const newName = document.createElement('h1');
        const newNameChar = document.createElement('p');
        const newGender = document.createElement('p');
        const newDOB = document.createElement('p');

        const castContainer = document.getElementById('castContainer');
        castContainer.appendChild(castDiv);
        castDiv.appendChild(newImage);
        castDiv.appendChild(newImageChar);
        castDiv.appendChild(newName);
        castDiv.appendChild(newNameChar);
        castDiv.appendChild(newDOB);
        castDiv.appendChild(newGender);

        castDiv.setAttribute('class', 'castDiv');
        newImage.src = imageUrl;
        newImage.setAttribute('class', 'castImage');
        newImageChar.src = charImageUrl;
        newImageChar.setAttribute('class', 'castImage');
        newName.innerHTML = name;
        newNameChar.innerHTML = `<b>Char Name:</b> ${charName}`;
        newGender.innerHTML = `<b>Gender:</b> ${gender}`;
        newDOB.innerHTML = `<b>DOB:</b> ${birthday}`;

    }
}