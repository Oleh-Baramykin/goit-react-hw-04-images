import { Header, Form, Button, Label, Input } from './Searchbar.styled';

export const Searchbar = () => {
  return (
    <Header>
      <Form>
        <Button type="submit">
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};
