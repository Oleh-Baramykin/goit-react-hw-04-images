import PropTypes from 'prop-types';
import { ImageGalleryBox } from './imageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ searchResults, lookBigImg }) => {
  return (
    <ImageGalleryBox>
      {searchResults.map(element => (
        <ImageGalleryItem
          key={element.id}
          id={element.id}
          imageLink={element.webformatURL}
          imageName={element.tags}
          onImageClick={lookBigImg}
        />
      ))}
    </ImageGalleryBox>
  );
};

ImageGallery.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  lookBigImg: PropTypes.func.isRequired,
};
