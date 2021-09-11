
const button = document.getElementsByTagName('button')[0]
button.addEventListener('click',(event)=>{
    event.preventDefault();
    const searchText = document.getElementById('searchText').value;
    clearScreen(searchText);
    getMovies(searchText);
    setTimeout(()=>{
        window.location.href='#resultHeadingDiv';
    },800);
});

const getMovies = async (searchText) => {
    const config = {
        params : { q : searchText }
    }
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);  
    createImage(res.data,searchText);   
}

const clearScreen = (searchText)=>{
    const imageContainer = document.getElementById('imageContainer');
    if(imageContainer.children.length === 0){
        console.log('empty container');
    }
    else{
        imageContainer.innerHTML='';
        document.getElementById('resultHeading').innerHTML='';
    }
};

const createImage = (shows,searchText) => {

    if(shows.length === 0 ){
            const imageContainer = document.getElementById('imageContainer');
            const errorImage = document.createElement('img');
            imageContainer.appendChild(errorImage);
            errorImage.src='error.jpg';
            errorImage.style.width='100%';
            errorImage.style.height='100%';
            let capitailSearchTextError = searchText.charAt(0).toUpperCase()+searchText.slice(1);
            document.getElementById('resultHeading').innerHTML=`Oops no results found for ${capitailSearchTextError} > `;
    }
    
    for(let result of shows){
        let imageUrl = result.show.image.medium;
        let name = result.show.name;
        let language = result.show.language;
        let rating = result.show.rating.average;
        let url = result.show.url; 
        let id = result.show.externals.thetvdb; 
        
        const imageDiv = document.createElement('div');
        const newImage = document.createElement('img');
        const newName = document.createElement('h2');
        const newRating = document.createElement('h4');
        const newLanguage = document.createElement('p');
        const detailLink = document.createElement('a');
        const clickOnImage = document.createElement('p');


        const imageContainer = document.getElementById('imageContainer');
        imageContainer.appendChild(imageDiv);
        imageDiv.appendChild(newImage);
        imageDiv.appendChild(newName);
        imageDiv.appendChild(newRating);
        imageDiv.appendChild(newLanguage);
        imageDiv.appendChild(detailLink);
        imageDiv.appendChild(clickOnImage);

        imageDiv.setAttribute('class','imageDiv');
        newImage.src = imageUrl;
        newImage.classList.add('square');
        newName.innerHTML = name;
        newRating.innerHTML = `<b>Rating:</b> ${rating}`;
        newLanguage.innerHTML = `<b>Lang:</b> ${language}`;
        detailLink.innerHTML = 'Read more ....'
        detailLink.href = url;
        detailLink.target='_blank'; 

        let capitailSearchText = searchText.charAt(0).toUpperCase()+searchText.slice(1);
        document.getElementById('resultHeading').innerHTML = `Showing results for ${capitailSearchText} >`;
        
        imageDiv.addEventListener('mouseover' , ()=>{
            console.log('mouseover');
            clickOnImage.innerHTML='<b style="color:blue;">CLICK IMAGE FOR MORE DETAILS</b>';
        });
        imageDiv.addEventListener('mouseout' , ()=>{
            console.log('mouseout');
            clickOnImage.innerHTML='';
        });
        newImage.addEventListener('click' , ()=>{
             testJS(id);
        });
    }
};

var testJS = (id)=>{
    console.log(id);
    var url = './details.html?id=' + encodeURIComponent(id);
    window.open(url);
};



