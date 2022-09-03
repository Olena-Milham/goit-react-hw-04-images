import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const mySchema = yup.object().shape({
  search: yup.string().required('This field is required'),
});

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  border-radius: 3px;
  overflow: hidden;
`;

const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

const SearchButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
`;

export const SearchForm = ({ onSubmit }, { isSubmitting }) => {
  return (
    <Formik
      initialValues={{ search: '' }}
      validationSchema={mySchema}
      onSubmit={onSubmit}
    >
      return (
      <StyledForm>
        <InputWrapper>
          <SearchButton type="submit" disabled={isSubmitting}>
            <GoSearch />
          </SearchButton>
          <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </InputWrapper>
        <ErrorMessage name="search" />
      </StyledForm>
      );
    </Formik>
  );
};

// =========== The way it was =================
// export class SearchForm extends Component {
//   render() {
//     return (
//       <Formik
//         initialValues={{ search: '' }}
//         validationSchema={mySchema}
//         onSubmit={this.props.onSubmit}
//       >
//         {props => {
//           return (
//             <StyledForm>
//               <InputWrapper>
//                 <SearchButton type="submit" disabled={props.isSubmitting}>
//                   <GoSearch />
//                 </SearchButton>
//                 <Input
//                   name="search"
//                   type="text"
//                   autoComplete="off"
//                   autoFocus
//                   placeholder="Search images and photos"
//                 />
//               </InputWrapper>
//               <ErrorMessage name="search" />
//             </StyledForm>
//           );
//         }}
//       </Formik>
//     );
//   }
// }

SearchForm.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
