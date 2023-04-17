
import { fetchPopMovies } from './fetchFromTheMovieDB';
import { fetchMovieInfo } from './fetchFromTheMovieDB';
import { genres } from './genres';
import { handleFormSubmit } from './query-word-searching';
import { fetchMoviesSearcher } from './query-word-searching';
import { api } from './API.js'

import { handlePageBtnClick } from './pop-films-loading'

const refs = {
    btnCloseModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    galary: document.querySelector('.film__gallery'),
    filmCard: document.querySelector('.modal__info'),
    galaryBySearch: document.querySelector('.film__gallery')
}

refs.btnCloseModal.addEventListener("click", holderCloseModal);
refs.modal.addEventListener("click", holderCloseByPressBackdrop);
refs.galary.addEventListener('click', holderOpenModal);

async function holderOpenModal(event) {
    const filmId = event.target.dataset.id;
    if (filmId) {
        refs.modal.classList.remove('visually-hidden');
        const filmInfo = await api.fetchMovieInfo(filmId);
    
        refs.filmCard.innerHTML = createModalCards(filmInfo);
    }
}
    const genresName = [];
        for (const gener of genres) {
            genresName.push(gener.name);
        }

function createModalCards({poster_path, original_title, vote_average, vote_count, popularity, genres,
    overview }) {
    const genresName = [];
    for (const gener of genres) {
        genresName.push(gener.name);
    }

    return `
            <div class="modal__poster">
                <img class="modal__poster-img" src="https://image.tmdb.org/t/p/w500${poster_path}">
                <button class="modal__watch-treller" type="button">Watch the trailer</button>
            </div>
            <div class="modal__info-conteiner">
                <h2 class="modal__movie-title">
                    ${original_title}
                </h2>
                <div class="modal__movie-info">
                    <div class="modal__info-name">
                        <ul class="modal__info-name-list list">
                            <li class="modal__info-name-item">
                                Vote / Votes
                            </li>
                            <li class="modal__info-name-item">
                                Popularity
                            </li>
                            <li class="modal__info-name-item">
                                Original Title
                            </li>
                            <li class="modal__info-name-item">
                                Genre
                            </li>
                        </ul>
                    </div>
                    <div class="modal__info-value">
                        <ul class="modal__info-value-list list">
                            <li class="modal__info-value-item">
                                <span class="modal__span-vote">
                                    ${Math.round(vote_average)}
                                </span> 
                                /
                                <span class="modal__span-votes">
                                    ${vote_count}
                                </span>
                            </li>
                            <li class="modal__info-value-item">
                                ${popularity}
                            </li>
                            <li class="modal__info-value-item">
                                ${original_title}
                            </li>
                            <li class="modal__info-value-item">
                                ${genresName} 
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="modal__about">
                    <h3 class="modal__about-title">
                        About 
                    </h3>
                    <p class="modal__movie-description">
                        ${overview}
                    </p>
                </div>
                <div class="modal__buttons">
                    <ul class="modal__button-list list">
                        <li class="modal__button-item">
                            <button class="modal__button-watched" type="button">
                                add to Watched
                            </button>
                        </li>
                        <li class="modal__button-item">
                            <button class="modal__button-queue" type="button">
                                add to queue
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
    `;
}

    

function holderCloseModal(event) {
    refs.modal.classList.add("visually-hidden")
}

function holderCloseByPressBackdrop(event) {
    if (event.target === refs.modal) {
        refs.modal.classList.add("visually-hidden")
    }
}

    window.addEventListener("keydown", handlerEscPrecc);

function handlerEscPrecc(event) {
    if (event.key === "Escape") {
        refs.modal.classList.add("visually-hidden")
    }
    window.removeEventListener("keydown", handlerEscPrecc);
}
