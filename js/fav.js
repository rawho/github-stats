function addToFavourite() {
    let favourites = document.querySelectorAll(".fav")

    for(let i=0; i<favourites.length; i++){
        favourites[i].addEventListener("click", e => {
            if(e.target.classList.contains("fa-bookmark-o")){
                e.target.classList.remove('fa-bookmark-o')
                e.target.classList.add('fa-bookmark')
            }
            else{
                e.target.classList.add('fa-bookmark-o')
                e.target.classList.remove('fa-bookmark')
            }
        })
        
    }

}

