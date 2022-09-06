import { useState, useEffect } from 'react';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageList } from 'components/ImageList/ImageList';
import { PrimaryButton } from 'components/ui/buttons/PrimaryButton';
import { getImages } from 'api/getImages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/ui/Loader/Loader';
import { Header } from 'components/ui/Header';
import { Container } from 'components/ui/Container';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (prevPage => prevPage === page) {
      setLoading(true);

      getImages(page, search)
        .then(({ hits }) => {
          setImages(prevImages => prevImages.concat(hits));
          setLoading(false);
        })
        .catch(setLoading(false));
    }
  }, [page, search]);

  const submitHandler = ({ search }, { setSubmitting }) => {
    if (search) {
      toast.warning('Please enter a new query');
      return;
    }
    setPage(1);
    setSearch(search);
    setLoading(true);
    getImages(1, search)
      .then(({ total, hits }) => {
        toast.success(`We found ${total} images`);
        setImages(hits);
        setTotal(total);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  const onLoadMoreHandler = () => {
    // setPage(prevPage => prevPage + 1, setLoading(true));
    setPage(prevPage => prevPage + 1);
    setLoading(true);
  };

  return (
    <>
      <AppContainer>
        <Header>
          <Container>
            <SearchForm onSubmit={submitHandler} />
          </Container>
        </Header>

        {page === 1 && loading && <Loader />}
        {images.length > 0 && <ImageList data={images} />}
        {images.length !== 0 && images.length < total && (
          <PrimaryButton onClick={onLoadMoreHandler} disabled={loading}>
            {loading && page > 1 ? <Loader size="small" /> : 'Load more'}
          </PrimaryButton>
        )}

        <ToastContainer autoClose={3000} />
      </AppContainer>
    </>
  );
};
