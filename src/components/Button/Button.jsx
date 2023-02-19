import PropTypes from 'prop-types';
import { ButtonLoader } from './Button.styled';

export const Button = ({ onClick }) => {
  return <ButtonLoader onClick={onClick}>Load More</ButtonLoader>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
