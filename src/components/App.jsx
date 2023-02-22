import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { CoolPage } from './ScrollToTop/ScrollToTop';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchApi } from './api';

export class App extends Component {
  state = {
    modalVisible: false,
    totalResult: 0,
    searchResults: [],
    currentPage: 1,
    searchName: '',
    loaderVisible: false,
    modalData: {},
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImage();
    }
  }

  fetchRes = async () => {
    const response = await fetchApi(
      this.state.searchName,
      this.state.currentPage
    );
    this.setState({ totalResult: response.totalHits });
    if (this.state.currentPage === 1) {
      response.totalHits === 0
        ? toast.error("Sorry, we didn't find anything")
        : toast.success(`great, we found ${response.totalHits} images`);
    }
    return response;
  };

  findImage = word => {
    this.setState({ error: false });
    if (this.state.searchName !== word) {
      this.setState({ searchName: word, currentPage: 1, searchResults: [] });
    }
  };

  togleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  onImageClick = e => {
    this.togleModal();
    const currentElId = Number(e.target.id);
    const currentItem = this.state.searchResults.find(
      element => element.id === currentElId
    );
    const modalData = {
      src: currentItem.largeImageURL,
      alt: currentItem.tags,
    };
    this.setState({ modalData });
  };

  loadMoreClick = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  getImage = async () => {
    try {
      this.setState({ loaderVisible: true });
      const response = await this.fetchRes();
      this.setState(prevState => ({
        searchResults: [...prevState.searchResults, ...response.hits],
      }));
    } catch {
      toast.error('Something went wrong, please try again');
    } finally {
      this.setState({ loaderVisible: false });
    }
  };

  render() {
    const {
      modalData,
      totalResult,
      searchResults,
      modalVisible,
      loaderVisible,
    } = this.state;

    const totalPages = Math.ceil(totalResult / searchResults.length);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.findImage} />
        {modalVisible && (
          <Modal dataImage={modalData} closeModal={this.togleModal} />
        )}
        <ImageGallery
          searchResults={searchResults}
          lookBigImg={this.onImageClick}
        />
        {loaderVisible && <Loader />}
        {searchResults.length !== 0 && totalPages !== 1 && (
          <Button onClick={this.loadMoreClick} />
        )}
        <ToastContainer autoClose={3000} />
        <CoolPage />
      </div>
    );
  }
}
