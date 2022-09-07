import { Grid } from 'react-loader-spinner';
import styled from 'styled-components';

const GridLoader = styled.div`
  margin: 0 auto;
  /* position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 500px; */
`;

export const Loader = ({ size = 'normal' }) => {
  return (
    <GridLoader>
      <Grid
        ariaLabel="loading-indicator"
        visible={true}
        color="#3f51b599"
        height={(size = 'small' ? 25 : 50)}
        width={(size = 'small' ? 25 : 50)}
      />
    </GridLoader>
  );
};
