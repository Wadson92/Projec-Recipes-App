import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ comida, bebida, index, isFood }) {
  if (isFood) {
    return (
      <section data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ comida.strMealThumb }
          alt="foto de comida"
        />
        <h4 data-testid={ `${index}-card-name` }>{ comida.strMeal }</h4>
      </section>
    );
  }

  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ bebida.strDrinkThumb }
        alt="foto de comida"
      />
      <h4 data-testid={ `${index}-card-name` }>{ bebida.strDrink }</h4>
    </section>
  );
}

Card.propTypes = {
  comida: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }),
  bebida: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  isFood: PropTypes.bool,
};

Card.defaultProps = {
  comida: {
    strMealThumb: '',
    strMeal: '',
  },
  bebida: {
    strDrinkThumb: '',
    strDrink: '',
  },
  index: 0,
  isFood: true,
};
