import Radio from '../Radio/Radio';
import RADIO_GROUP_DATA from '../../data/RadioGroupData';

import styled from 'styled-components';

const RadioGroup = () => {
  return (
    <RadioGroupArea>
      {RADIO_GROUP_DATA.map(item => {
        return (
          <Radio
            key={item.id}
            name={item.name}
            value={item.value}
            text={item.text}
            defaultChecked={item.defaultChecked}
          />
        );
      })}
    </RadioGroupArea>
  );
};

const RadioGroupArea = styled.div`
  display: flex;
  flex-direction: row;
`;

export default RadioGroup;
