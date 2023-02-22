import PropTypes from 'prop-types';
import { ImageGalleryName, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  imageLink,
  imageName,
  onImageClick,
}) => {
  return (
    <GalleryItem onClick={onImageClick}>
      <ImageGalleryName id={id} src={imageLink} alt={imageName} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
  imageLink: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
};
