import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Header, FormWrapper, Button, Label, Input } from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';
import { Formik } from 'formik';
const initialValues = {
  search: '',
};

export const Searchbar = ({ onSubmit }) => {
  const submitSearch = (value, { resetForm }) => {
    if (value.search.trim() === '') {
      toast.error('Write, what do you want to find');
      return;
    }
    onSubmit(value.search);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={submitSearch}>
        <FormWrapper>
          <Button type="submit">
            <BiSearch />
            <Label>Search</Label>
          </Button>
          <Input
            name="search"
            type="text"
            autoComplete="true"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormWrapper>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
