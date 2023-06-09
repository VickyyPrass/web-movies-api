// menggunakan ajax


$('.search-button').on('click', function() {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=8b6cca08&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);

            // ketika tombol di klik
            $('.modal-detail-button').on('click', function() {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=8b6cca08&i=' + $(this).data('imdbid'),
                    success: m => {
                        console.log('ok');
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});


// menggunakan fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function() {
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=8b6cca08&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             // ketika tombol di klik
//             const modalDetailButtton = document.querySelectorAll('.modal-detail-button');
//             modalDetailButtton.forEach(btn => {
//                 btn.addEventListener('click', function() {
//                     const imdbid = this.dataset.imdbid;

//                     fetch('http://www.omdbapi.com/?apikey=8b6cca08&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
//         });
// });










function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img class="card-img-top" src="${m.Poster}" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}


function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" alt="" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} (${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Genre : ${m.Genre}</strong></li>
                            <li class="list-group-item"><strong>Actors : ${m.Actors}</strong></li>
                            <li class="list-group-item"><strong>Released : ${m.Released}</strong></li>
                            <li class="list-group-item"><strong>Language : ${m.Language}</strong></li>
                        </ul>
                    </div>
                </div>
            </div>`;
}