import PaymentMethodList from './PaymentMethodList';
import PAYMENT_METHOD_LIST_DATA from '../../../data/PaymentMethodListData';

import media from '../../../styles/media';

import styled from 'styled-components';

const PaymentMethodListGroup = ({ onChange, checked }) => {
  return (
    <RadioGroupArea>
      {PAYMENT_METHOD_LIST_DATA.map(({ id, name, value, text, src }) => {
        return (
          <PaymentMethodList
            key={id}
            id={id}
            name={name}
            value={value}
            text={text}
            src={src}
            alt={text}
            onChange={onChange}
            checked={checked}
          />
        );
      })}
    </RadioGroupArea>
  );
};
const RadioGroupArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;

  ${media.tablet`
    justify-content: center;
  `}

  ${media.mobile`
    justify-content: center;
  `}
`;
export default PaymentMethodListGroup;
