import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import OrderMethod from './Components/OrderMethod';
import DeliverySwiper from './Components/DeliverySwiper';
import styled from 'styled-components';
import media from '../../styles/media';

/** 배달주소 선택할 수 있는 페이지 입니다. (선택은 불가능) */
const Delivery = () => {
  const navigate = useNavigate();
  return (
    <DeliveryMain>
      <DeliveryWrap>
        <DeliverySwiper />
        <MethodWrap>
          <MethodTitle>주문방법선택</MethodTitle>
          <DeliveryMethod>
            <OrderMethod />
          </DeliveryMethod>
          <DeliveryMethodBottom>
            <DeliveryBottomLeft>
              <li>개인정보 수집 이용 동의 (필수)</li>
              <li>수집정보: 배달지 주소</li>
              <li>수집목적: 제품 배달서비스 제공</li>
              <li>보유기간: 관련 법령에 따라 보관 후 파기</li>
              <li>(전자상거래 등에서의 소비자보호에 관한 법률 5년)</li>
            </DeliveryBottomLeft>
            <DeliveryBottomRight>
              <span>해당 배달 주소로 주문을 진행하시겠습니까?</span>
              <Button
                size="medium"
                content="선택"
                onClick={() => {
                  navigate('/cart');
                }}
              />
            </DeliveryBottomRight>
          </DeliveryMethodBottom>
        </MethodWrap>
      </DeliveryWrap>
    </DeliveryMain>
  );
};

export default Delivery;

const FlexCenter = `
  display: flex;
  justify-content: center;
`;

const FlexBetween = `
  display: flex;
  justify-content: space-between;
`;

const DeliveryMain = styled.main`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: ${props => props.theme.grayscaleB};

  ${media.tablet`
    padding : 0 20px;
  `}

  ${media.mobile`
    padding : 0 10px;
  `}
`;

const DeliveryWrap = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 120px auto;
`;

const MethodWrap = styled.div`
  ${FlexCenter};
  flex-direction: column;
  margin-top: 40px;
`;

const MethodTitle = styled.span`
  ${FlexCenter};
  font-size: 30px;
  font-weight: 800;

  ${media.mobile`
    font-size : 24px;
  `}
`;

const DeliveryMethod = styled.div`
  width: 100%;
  margin: 30px 0;
`;

const DeliveryMethodBottom = styled.div`
  ${FlexBetween};
  margin-bottom: 40px;

  ${media.mobile`
    flex-direction : column;
    align-items : center;
  `}
`;

const DeliveryBottomLeft = styled.ul`
  font-size: 11px;
  color: ${props => props.theme.grayscaleD};
  padding-bottom: 10px;

  & > li {
    line-height: 1.4;

    &::before {
      content: '-';
      margin-right: 5px;
    }

    &:first-child::before,
    &:last-child::before {
      display: none;
    }
  }

  ${media.mobile`
    font-size : 14px;
    text-align : left;
  `};
`;

const DeliveryBottomRight = styled.div`
  ${FlexBetween};
  flex-direction: column;
  font-size: 14px;

  ${media.mobile`
    font-size : 14px;
    padding-top : 20px;
    gap : 10px;
  `}
`;
