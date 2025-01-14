import React from 'react';
import styled from 'styled-components';

const StarRating = ({ rating, setRating }) => {
  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <Container>
      <RatingForm>
        <StarGroup>
          {[5, 4, 3, 2, 1].map((value) => (
            <React.Fragment key={value}>
              <Input
                type="radio"
                id={`rating-${value}`}
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => handleRatingChange(value)}
              />
              <Label htmlFor={`rating-${value}`}></Label>
            </React.Fragment>
          ))}
        </StarGroup>
        <Log>{rating}</Log>
      </RatingForm>
    </Container>
  );
};

export const Container = styled.div`
  text-align: center;
  border-radius: 5px;
  width: 100%;
  margin: 3% 0 10% 0;
`;

export const RatingForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7%;
`;

export const StarGroup = styled.fieldset`
  display: inline-flex;
  flex-direction: row-reverse;
  border: none;
  font-size: 2rem;
  padding: 0;
  margin: 0;
`;

export const Input = styled.input`
  display: none;
  & + label {
    cursor: pointer;
    color: #ccc;
    font-size: 90%;
    margin: 0 3px;

    &:before {
      content: '★';
      display: inline-block;
    }
  }

  &:checked ~ label,
  &:checked + label {
    color: ${(props) => props.theme.colors.main};
  }

  &:hover ~ label {
    color: ${(props) => props.theme.colors.main};
  }
`;

export const Label = styled.label`
  cursor: pointer;
`;

export const Log = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #ab0909;
`;

export default StarRating;
