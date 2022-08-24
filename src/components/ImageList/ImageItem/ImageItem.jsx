import Modal from 'components/ui/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PhotoItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const Photo = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

export const ImageItem = ({ data }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <PhotoItem onClick={toggleModal}>
      {open && (
        <Modal onClose={toggleModal}>
          <img src={data.largeImageURL} alt={data.tags} />
        </Modal>
      )}

      <Photo src={data.webformatURL} alt={data.tags} />
    </PhotoItem>
  );
};

ImageItem.propTypes = {
  data: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
