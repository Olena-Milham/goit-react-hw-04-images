import { Component } from 'react';
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

export class App extends Component {
  state = {
    page: 1,
    search: '',
    loading: false,
    images: [],
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });

      getImages(this.state.page, this.state.search)
        .then(({ hits }) => {
          this.setState(prevState => ({
            images: prevState.images.concat(hits),
            loading: false,
          }));
        })
        .catch(this.setState({ loading: false }));
    }
  }

  submitHandler = ({ search }, { setSubmitting }) => {
    if (this.state.search === search) {
      toast.warning('Please enter a new query');
      return;
    }
    this.setState({ page: 1, search, loading: true });
    getImages(1, search)
      .then(({ total, hits }) => {
        toast.success(`We found ${total} images`);
        this.setState({ images: hits, total, loading: false });
        setSubmitting(false);
      })
      .catch(() => {
        this.setState({ loading: false });
        setSubmitting(false);
      });
  };
  onLoadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    const { images, total, loading, page } = this.state;
    // console.log(loading);
    return (
      <>
        <AppContainer>
          <Header>
            <Container>
              <SearchForm onSubmit={this.submitHandler} />
            </Container>
          </Header>

          {page === 1 && loading && <Loader />}
          {images.length > 0 && <ImageList data={this.state.images} />}
          {images.length !== 0 && images.length < total && (
            <PrimaryButton onClick={this.onLoadMoreHandler} disabled={loading}>
              {loading && page > 1 ? <Loader size="small" /> : 'Load more'}
            </PrimaryButton>
          )}

          <ToastContainer autoClose={3000} />
        </AppContainer>
      </>
    );
  }
}
