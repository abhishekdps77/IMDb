const button = document.getElementsByTagName('button')[0]
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const id = document.getElementById('id').value;
            if (id > 4000) {
                document.getElementById('celibrityHeading').innerHTML = 'Enter a valid number';
            }
            clearScreen();
            getCelebrity(id);
        });

        const clearScreen = () => {
            const celebrityContainer = document.getElementById('celebrityContainer');
            const celibrityHeading = document.getElementById('celibrityHeading');
            if (celebrityContainer.children.length === 0) {
                console.log('empty container');
            }
            else {
                celebrityContainer.innerHTML = '';
                celibrityHeading.innerHTML = '';
            }
        };
        const getCelebrity = async (id) => {
            const res = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
            console.log(res.data);
            createShowCast(res.data);
        }

        const createShowCast = (showCast) => {
            if (showCast.length === 0) {
                const celebrityContainer = document.getElementById('celebrityContainer');
                const errorImage = document.createElement('img');
                celebrityContainer.appendChild(errorImage);
                errorImage.src = 'error.jpg';
                errorImage.style.width = '100%';
                errorImage.style.height = '100%';
            }

            let result = showCast[0];

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

            const celebrityContainer = document.getElementById('celebrityContainer');
            celebrityContainer.appendChild(castDiv);
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

            document.getElementById('celibrityHeading').innerHTML = `Wooh Hoo !!! ${name} is your Celibrity Face....`;
        }