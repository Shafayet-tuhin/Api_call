const btn = document.getElementById('clickme');
const result = document.getElementById('results');
const favBTn = document.getElementById('fav');
const favResult = document.getElementById('favorite-results');
const clrBtn = document.getElementById('clear') ;
 
btn.addEventListener('click', () => {
  let p = fetch('https://jsonplaceholder.typicode.com/posts');
  p.then((response) => {
    return response.json()
  }).then((value) => {
    display(value);
  })
})


function display(value) {
  for (const info of value) {
    const div = document.createElement('div');
    // console.log(info);

    div.innerHTML = `
    <h2> post :${info.title}  </h2>
    <h3> User-ID :${info.userId}  </h3>
    <p> User-ID :${info.body}  </p>
    <button  id="add-fav"  style="padding: 5px 10px; background-color: #1ec868; color: #fff; border: none; cursor: pointer; border-radius: 5px;"> Add to Favorites</button>
    `;

    result.appendChild(div);
   
    const addFav = div.querySelector('#add-fav'); 
    addFav.addEventListener('click', () => {
       console.log(info)
      addToFavorites(info);
    });
  }    
}


  // In your case, you are creating multiple "Add to Favorites" buttons with the same id inside a loop in the display function. 
    // Since id values should be unique within a document, it's not guaranteed that document.getElementById('add-fav') will consistently
    //  select the correct button, especially if there are multiple buttons generated.
    //  On the other hand, when you use div.querySelector('#add-fav'), it restricts the search for the element with the specified id to t
    //  he context of the div element you created within the loop. This is why div.querySelector('#add-fav') works correctly because it searches
    //   for the element with the id "add-fav" only within the specific div element you are currently working with in the loop.


    // function addToFavorites(postData) {
    //   let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //   favorites.push(postData);
    //   localStorage.setItem('favorites', JSON.stringify(favorites));
    // }


    function addToFavorites(info) {
      let favorite = JSON.parse(localStorage.getItem('items')) || [] ; 
      favorite.push(info) ; 
      localStorage.setItem('items' , JSON.stringify(favorite)) ;
      alert('Added to favorites List ');
    }
    

// now to showcase 


favBTn.addEventListener('click' , () => {
  result.innerHTML = '' ; 

  const myList = JSON.parse(localStorage.getItem('items')) || [] ; 

  favResult.innerHTML = '' ;  

  if ( myList.length > 0 ) {
    for ( const info of myList ) 
    {
      const div = document.createElement('div') ; 
      div.innerHTML = `
      <h2> post :${info.title}  </h2>
      <h3> User-ID :${info.userId}  </h3>
      <p> User-ID :${info.body}  </p>
      `;
      favResult.appendChild(div) ; 
    }
  }
  else {
    alert('You have no favorites List ');
  }

});



clrBtn .addEventListener('click' , () => {

  favResult.innerHTML = '' ; 
  localStorage.removeItem('items') ; 
  alert('Your favorites list has now been cleared.');
})