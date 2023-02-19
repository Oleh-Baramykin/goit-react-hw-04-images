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
