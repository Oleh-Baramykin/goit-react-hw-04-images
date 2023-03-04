import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobStyle } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { CoolPage } from './ScrollToTop/ScrollToTop';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { fetchApi } from './api';

export const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [totalResult, setTotalResult] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (!searchName) {
      return;
    }
    const getImage = async () => {
      try {
        setLoaderVisible(true);
        const response = await fetchApi(searchName, currentPage);
        setTotalResult(response.totalHits);

        if (currentPage === 1) {
          response.totalHits === 0
            ? toast.error("Sorry, we didn't find anything")
            : toast.success(`great, we found ${response.totalHits} images`);
        }
        setSearchResults([...searchResults, ...response.hits]);
      } catch {
        toast.error('Something went wrong, please try again');
      } finally {
        setLoaderVisible(false);
      }
    };
    getImage();
  }, [searchName, currentPage]);

  const findImage = word => {
    if (searchName !== word) {
      setSearchName(word);
      setCurrentPage(1);
      setSearchResults([]);
    }
  };

  const togleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onImageClick = e => {
    togleModal();
    const currentElId = Number(e.target.id);
    const currentItem = searchResults.find(
      element => element.id === currentElId
    );
    const modalData = {
      src: currentItem.largeImageURL,
      alt: currentItem.tags,
    };
    setModalData(modalData);
  };

  const loadMoreClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const totalPages = Math.ceil(totalResult / searchResults.length);

  return (
    <GlobStyle>
      <Searchbar onSubmit={findImage} />
      {modalVisible && <Modal dataImage={modalData} closeModal={togleModal} />}
      <ImageGallery searchResults={searchResults} lookBigImg={onImageClick} />
      {loaderVisible && <Loader />}
      {searchResults.length !== 0 && totalPages !== 1 && (
        <Button onClick={loadMoreClick} />
      )}
      <ToastContainer autoClose={3000} />
      <CoolPage />
    </GlobStyle>
  );
};
