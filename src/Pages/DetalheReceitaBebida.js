import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import { buscarBebidasID } from '../service/BebidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getRecipeIngredients from '../service/getRecipeIngredients';

const defaultParams = {
  strDrink: '',
  strDrinkThumb: '',
  strCategory: '',
  strInstructions: '',
};

export default function DetalheReceitaBebida(props) {
  const { match: { params: { id } } } = props;
  const [recipe, setRecipe] = useState([defaultParams]);
  const [copyMessage, setCopyMessage] = useState(false);
  const [drinkIngredients, setdrinkIngredients] = useState([]);
  const [isLoading, changeLoading] = useState(true);

  useEffect(() => {
    buscarBebidasID(id)
      .then((result) => setRecipe(result))
      .then(() => getRecipeIngredients(recipe))
      .then((ingredients) => setdrinkIngredients(ingredients))
      .then(() => changeLoading(false));

    changeLoading(false);
  }, [id, recipe]);

  const setMessageTime = () => {
    const messageTime = 1000;
    setTimeout(() => {
      setCopyMessage(false);
    }, messageTime);
  };

  const onShareClicked = () => {
    copyToClipBoard(window.location.href);
    setCopyMessage(true);
    setMessageTime();
  };

  const renderRecipe = () => {
    const { strDrink, strDrinkThumb, strCategory, strInstructions } = recipe[0];
    return (
      <>
        <img
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <section>
          <div>
            <h4 data-testid="recipe-title">
              { strDrink }
            </h4>
            <button
              type="button"
              className="share-food-btn-icon"
              onClick={ onShareClicked }
            >
              <img
                data-testid="share-btn"
                className="share-icon"
                src={ shareIcon }
                alt="icone de compartilhar"
              />
            </button>
            <button
              type="button"
              className="favorite-btn-icon"
            >
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="icone de favoritar"
              />
            </button>
          </div>
          <p data-testid="recipe-category">{ strCategory }</p>
        </section>
        <section className="ingredients-section">
          <h5>Ingredients</h5>
          {
            drinkIngredients.map((ingredient, index) => (
              <div key={ `${index}` } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  id={ index }
                />
                <label htmlFor={ index }>
                  { ingredient }
                </label>
              </div>
            ))
          }
          <p data-testid="instructions">{strInstructions}</p>
        </section>
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </>
    );
  };

  return (
    <>
      { isLoading ? <p>Loading...</p> : renderRecipe() }
      { copyMessage
        ? <p className="copy-food-link-message">Link copiado!</p>
        : <p className="copy-food-link-message" /> }
    </>
  );
}

DetalheReceitaBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
