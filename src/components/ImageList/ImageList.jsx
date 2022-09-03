// import { Component } from 'react';
import { ImageItem } from './ImageItem/ImageItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PhotoList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export default function ImageList({ data }) {
  return (
    <PhotoList>
      {data.map(item => (
        <ImageItem data={item} key={item.webformatURL} />
      ))}
    </PhotoList>
  );
}

// export class ImageList extends Component {
//   render() {
//     // console.log(this.props.data);
//     return (
//       <PhotoList>
//         {this.props.data.map(item => (
//           <ImageItem data={item} key={item.webformatURL} />
//         ))}
//       </PhotoList>
//     );
//   }
// }

ImageList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
