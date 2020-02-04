import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';

import styled from 'styled-components';
import FormActions from './actions';
import Utils from './utils';

const Button = styled.div`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
  color: #f5f5f8;
  background-color: #5e5278;
  &:hover {
    background-color: #9b7ddc;
  }
  text-align: center;
`;

const Container = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 100px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: #5e5278;
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 10px;
`;

const InputField = styled.div`
  input[type='text'],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const HeadingContainer = styled.div`
  color: #29175d;
  font-size: 50px;
  margin-bottom: 30px;
`;

const DropDownContainer = styled.div`
  margin-top: 8px;
  input[type='text'],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      // so: null
    };
  }

  handleSubmit = () => {
    const { actions, form } = this.props;
    let error = {};
    if (!Utils.isValidSwedishSSN(form.ssno)) {
      error = {
        ...error,
        ssno: 'Please enter the correct social security number',
      };
    }
    if (!Utils.isValidPhoneNum(form.phoneNum)) {
      error = {
        ...error,
        phoneNum: 'Please enter a valid phone number',
      };
    }
    if (!Utils.emailIsValid(form.emailId)) {
      error = {
        ...error,
        emailId: 'Please enter a valid email address',
      };
    }
    if (!form.country) {
      error = {
        ...error,
        country: 'Please select a country from the dropdown list',
      };
    }
    this.setState({
      error,
    });
    if (Object.keys(error).length === 0) {
      actions.saveFormData();
      console.log('Success');
    }
  };

  handleChange = (key, event) => {
    const { actions, form } = this.props;
    const newFormValue = {
      ...form,
      [key]: event.target.value,
    };
    actions.onChangeFormData(newFormValue);
  };

  handleDropDownChange = country => {
    const { actions, form } = this.props;
    const newFormValue = {
      ...form,
      country,
    };
    actions.onChangeFormData(newFormValue);
  };

  render() {
    const { error } = this.state;
    const { form, countries } = this.props;
    return (
      <Container>
        <Field>
          <HeadingContainer>Rocker</HeadingContainer>
        </Field>

        <Field>
          <Label>
            <Title>Social Security Number</Title>
            <ErrorContainer>{error.ssno}</ErrorContainer>
          </Label>
          <InputField>
            <input
              type="text"
              value={form.ssno || ''}
              onChange={value => this.handleChange('ssno', value)}
            />
          </InputField>
        </Field>

        <Field>
          <Label>
            <Title>Phone Number</Title>
            <ErrorContainer>{error.phoneNum}</ErrorContainer>
          </Label>
          <InputField>
            <input
              type="text"
              value={form.phoneNum || ''}
              onChange={value => this.handleChange('phoneNum', value)}
            />
          </InputField>
        </Field>

        <Field>
          <Label>
            <Title>Email address</Title>
            <ErrorContainer>{error.emailId}</ErrorContainer>
          </Label>
          <InputField>
            <input
              type="text"
              value={form.emailId || ''}
              onChange={value => this.handleChange('emailId', value)}
            />
          </InputField>
        </Field>

        <Field>
          <Label>
            <Title>Country</Title>
            <ErrorContainer>{error.country}</ErrorContainer>
          </Label>
          <DropDownContainer>
            <Select
              value={form.country}
              onChange={this.handleDropDownChange}
              options={countries}
              isClearable={true}
            />
          </DropDownContainer>
        </Field>

        <Field>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Field>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { form } = state;
  return { form: form.data || {}, countries: form.countries };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      saveFormData: FormActions.saveFormData,
      onChangeFormData: FormActions.onChangeFormData,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
