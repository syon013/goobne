import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteAllCart } from '../../Redux/Redux';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../components/Input/Input';
import SelectBox from '../../components/SelectBox/SelectBox';
import Button from '../../components/Button/Button';
import PaymentMethodListGroup from './components/PaymentMethodListGroup';

import { ORDER_SELECT_BOX_DATA } from '../../data/OrderSelectBoxData';
import { ORDER_RIDER_SELECT_BOX_DATA } from '../../data/OrderRiderSelectBoxData';
import { basic_test } from '../../API/TEST_API';
import media from '../../styles/media';

import styled from 'styled-components';

const Order = () => {
  /** 결제 페이지에 필요한 모든 정보를 담는 useState를 정의합니다. */
  const [userOrderInfo, setUserOrderInfo] = useState({
    storeAddress: '',
    store: '',
    storePhone: '',
    userName: '',
    userPhoneNumber: '',
    rider: '',
    riderDirectRequest: '',
    ceo: '',
    ceoDirectRequest: '',
    paymentOnChange: null,
    name: '',
    price: '',
    count: '',
  });
  /** useNavigate훅을 navigate 변수에 담습니다. */
  const navigate = useNavigate();
  /** useDispatch훅을 dispatch 변수에 담습니다. */
  const dispatch = useDispatch();
  /** useSelector훅을 이용하여 state 값을 cartData 변수에 저장합니다.   */
  const cartState = useSelector(state => {
    return state.cart;
  });
  /**로컬스토리지에 담겨있는 userInfo를 getItem(가져오기)해서 localUserInfo변수에 할당합니다.*/
  const localUserInfo = localStorage.getItem('userInfo');
  /**
   * 1. setUserOrderInfo 함수를 호출, userOrderInfo 상태를 업데이트합니다.
   * 2. 스프레드오퍼레이터 연산자를 사용하여 userOrderInfo 상태를 복사하고, 받아온 cartState의 첫 번째 요소의 속성을 사용하여 업데이트합니다.
   * 3. 받아온 각 속성(name, price, count)을 cartState의 첫 번째 요소의 속성으로 업데이트합니다.
   * 4. 코드가 실행된후 cartState가 변경될 때마다 useEffect가 실행되어 userOrderInfo 상태가 업데이트됩니다.
   */
  useEffect(() => {
    if (localUserInfo) {
      const userInfo = JSON.parse(localUserInfo);
      setUserOrderInfo({
        ...userOrderInfo,
        storeAddress: userInfo.storeAddress,
        storePhone: userInfo.storePhone,
        store: userInfo.store,
        userName: userInfo.name,
        userPhoneNumber: userInfo.userPhone,
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartState]);
  /**
   * 1.요청사항을 업데이트하는 셀렉트박스 함수입니다.
   * 2.인자로는 value와 셀렉트박스 name을 인자로받습니다.
   * 3.userOrderInfo를 스프레드 오퍼레이터(연산자)에 값을 복사해옵니다.
   * 4.셀렉트박스 name일치하는 userOrderInfo 키값에 value값을
   */
  const selectBoxOrderOption = (value, name) => {
    setUserOrderInfo({
      ...userOrderInfo,
      [name]: value,
    });
  };
  /** deliveryFee라는 변수에 배달금액을 할당합니다. */
  const deliveryFee = 3000;
  /** totalPrice변수에 초기 총액을 0로 할당한다. */
  let totalPrice = 0;
  /** cartState 데이터를 map함수를 돌려 해당 값을 받아오고 기존할당한 totalPrice 에 합산하여 재할당한다. */
  cartState.map(({ price, count }) => {
    totalPrice = totalPrice + price * count;
  });
  /** totalAmount변수를 선언하고 상위 선언한 deliveryFee(배달료), totalPrice(제품들의 총합산금액)을 더하여준다. */
  const totalAmount = deliveryFee + totalPrice;
  /**
   * 1.결제 라디오버튼이 변경될때마다 변경되는 함수입니다.
   * 2.value 인자로받습니다
   * 3.userOrderInfo를 스트레트 오퍼레이트(연산자)값을 복사해옵니다.
   * 4.paymentOnChange에 value 업데이트 해줍니다.
   * */
  const handleChangePayment = value => {
    setUserOrderInfo({ ...userOrderInfo, paymentOnChange: value });
  };
  /**
   * 1. 셀렉트박스의 직접입력 선택시 나타나는 textArea의 값이 변경될때마다 업데이트하는 함수를 정의합니다.
   * 2. setUserOrderInfo 함수를 호출하여 userOrderInfo 상태를 업데이트합니다.
   * 3. userOrderInfo를 스트레트 오퍼레이트(연산자)값을 복사해옵니다.
   * 4. 새롭게 입력되는 값을 name 속성에 해당하는 키에 할당하여 업데이트합니다.
   */
  const saveDirectRequest = event => {
    const { name, value } = event.target;
    setUserOrderInfo({ ...userOrderInfo, [name]: value });
  };

  const handleSubmitOrderDataPost = e => {
    e.preventDefault();
    basic_test(200) //테스트용 api입니다. 인자로 원하는 상태값을 넘겨주면됩니다.
      .then(() => {
        alert('주문이 완료되었습니다.');
        dispatch(deleteAllCart());
        navigate('/');
        window.location.reload();
      })
      //에러 케이스를 정의합니다.
      .catch(error => {
        if (error.status === 401) {
          alert('배달요청 사항을 입력하지 않았습니다.');
        }
      });
  };

  return (
    <>
      <OrderContainer>
        <OrderContentWrap>
          <OrderTitle>결제하기</OrderTitle>
          <form>
            <DeliveryInfo>
              <DeliveryInfoTitle>배달정보</DeliveryInfoTitle>
              <DeliveryItemArea>
                <AddressInfoLine>
                  <DeliveryAddress>주소</DeliveryAddress>
                  <DeliveryArea>{userOrderInfo.storeAddress}</DeliveryArea>
                </AddressInfoLine>
                <StoreInfoLine>
                  <DeliveryAddress>주문 매장</DeliveryAddress>
                  <OrderArea>{userOrderInfo.store}</OrderArea>
                  <StoreNumber>
                    주문 매장 번호 : {userOrderInfo.storePhone}
                  </StoreNumber>
                </StoreInfoLine>
                <NameInfoLine>
                  <Input
                    type="text"
                    label="이름"
                    direction="column"
                    isDot={true}
                    value={userOrderInfo.userName}
                  />
                </NameInfoLine>
                <PhoneNumberInfoLine>
                  <Input
                    type="text"
                    label="연락처"
                    direction="column"
                    isDot={true}
                    value={userOrderInfo.userPhoneNumber}
                  />
                </PhoneNumberInfoLine>
                <DeliveryRequest>
                  <RequestTitle>가게사장님께 요청사항</RequestTitle>
                  <SelectArea>
                    <SelectBox
                      data={ORDER_SELECT_BOX_DATA}
                      value="직접입력"
                      onChange={value => selectBoxOrderOption(value, 'ceo')}
                      name="ceo"
                    />
                    {userOrderInfo.ceo === '직접입력' && (
                      <RequestTextArea
                        placeholder="매장 요청사항을 입력해주세요"
                        name="ceoDirectRequest"
                        onChange={saveDirectRequest}
                      />
                    )}
                  </SelectArea>
                </DeliveryRequest>
                <RiderArea>
                  <RiderInfo>
                    <RiderTopArea>배달</RiderTopArea>
                    <span>라이더님께</span>
                  </RiderInfo>
                  <SelectArea>
                    <SelectBox
                      data={ORDER_RIDER_SELECT_BOX_DATA}
                      value="안전하게 와주세요"
                      onChange={value => selectBoxOrderOption(value, 'rider')}
                      name="rider"
                    />
                    {userOrderInfo.rider === '직접입력' && (
                      <RequestTextArea
                        placeholder="매장 요청사항을 입력해주세요"
                        onChange={saveDirectRequest}
                        name="riderDirectRequest"
                      />
                    )}
                  </SelectArea>
                </RiderArea>
              </DeliveryItemArea>
            </DeliveryInfo>
            <PaymentInfo>
              <PaymentMethod>결제방법</PaymentMethod>
              <PaymentItemArea>
                {/* 결제 선택방법 라디오버튼 영역입니다 */}
                <PaymentListInnerDiv>
                  <span>결제방법</span>
                  <PaymentButtonList>
                    <PaymentMethodListGroup onChange={handleChangePayment} />
                  </PaymentButtonList>
                </PaymentListInnerDiv>
                <CashReceipt>
                  {/* <span>※&nbsp;할인 제품의 경우 금액권 적용이 불가합니다.</span> */}
                  <span>
                    ※&nbsp;현금영수증 발행은 매장으로 문의 부탁드립니다.
                  </span>
                </CashReceipt>
                {/* 결제 선택방법 라디오버튼 앤드라인 입니다 */}
              </PaymentItemArea>
            </PaymentInfo>
            {/* 주문내역 영역입니다. */}
            <OrderDetailArea>
              <OrderDetailInfo>주문내역</OrderDetailInfo>
              {cartState.map(({ id, name, count, price }) => {
                const itemTotalPrice = price * count;
                return (
                  <ProductDetailArea key={id}>
                    <ProductDetailInner>
                      <DetailItemName>{name}</DetailItemName>
                      <span>&nbsp;X&nbsp;</span>
                      <span>{count}</span>
                    </ProductDetailInner>
                    <span>{itemTotalPrice?.toLocaleString('ko-KR')}원</span>
                  </ProductDetailArea>
                );
              })}
            </OrderDetailArea>
            {/* 주문내역 영역입니다. */}
            <PaymentAmountArea>
              <PaymentAmountSection>최종결제금액</PaymentAmountSection>
              <PaymentAmountInfo>
                <PaymentAmountItem>
                  <PaymentAmountLeftArea>주문금액</PaymentAmountLeftArea>
                  <span>{totalPrice.toLocaleString('ko-KR')}원</span>
                </PaymentAmountItem>
                <PaymentAmountItem>
                  <PaymentAmountLeftArea>배달비</PaymentAmountLeftArea>
                  <span>{deliveryFee.toLocaleString('ko-KR')}원</span>
                </PaymentAmountItem>
                <PaymentAmountItem>
                  <PaymentAmountLeftArea>
                    할인&nbsp;or&nbsp;쿠폰
                  </PaymentAmountLeftArea>
                  <span>-0원</span>
                </PaymentAmountItem>
                <PaymentAmountItemBottom>
                  <span>총&nbsp;결제금액</span>
                  <span>{totalAmount.toLocaleString('ko-KR')}원</span>
                </PaymentAmountItemBottom>
              </PaymentAmountInfo>
              <StoreStreetInfo>
                ※&nbsp;매장&nbsp;간의&nbsp;거리,&nbsp;상황에&nbsp;따라&nbsp;추가&nbsp;배달비&nbsp;청구&nbsp;및&nbsp;주문이&nbsp;취소가&nbsp;될&nbsp;수&nbsp;있습니다.
              </StoreStreetInfo>
            </PaymentAmountArea>
            <FinalPaymentArea>
              <div>
                <Button
                  type="submit"
                  size="medium"
                  color="black"
                  content="결제하기"
                  onClick={handleSubmitOrderDataPost}
                />
              </div>
            </FinalPaymentArea>
          </form>
          {/* 주문내역 끝나는 지점입니다. */}
        </OrderContentWrap>
      </OrderContainer>
    </>
  );
};
export default Order;

const OrderContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 170px 10px 0 10px;
  background-color: ${props => props.theme.grayscaleB};
`;

const OrderContentWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0px auto;
`;

const OrderTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  font-size: 33px;
  font-weight: 800;
`;

const DeliveryInfo = styled.fieldset`
  padding-bottom: 80px;
  margin: 0 auto;
  max-width: 675px;
  width: 100%;
`;

const DeliveryInfoTitle = styled.legend`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.grayscaleF};
`;

const DeliveryItemArea = styled.div`
  padding-top: 25px;
  border-bottom: 1px solid ${props => props.theme.grayscaleC};
  padding: 5px;
`;

const AddressInfoLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const StoreInfoLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 10px;
`;

const NameInfoLine = styled.div`
  margin-bottom: 24px;
`;
const PhoneNumberInfoLine = styled.div`
  margin-bottom: 24px;

  & > div {
    & > label {
      width: 43%;
    }
  }
`;

const DeliveryAddress = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  padding-left: 10px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.theme.grayscaleH};
  }
`;

const DeliveryArea = styled.span`
  font-size: 15px;

  ${media.mobile`
    font-size : 12px;
  `}
`;

const DeliveryRequest = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 5px;
`;

const RequestTitle = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  padding-left: 11px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 6px;
    left: 0;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.theme.grayscaleH};
  }
`;

const OrderArea = styled.span`
  padding: 5px 10px;
  background-color: ${props => props.theme.grayscaleH};
  color: ${props => props.theme.grayscaleA};
  font-weight: 700;
  font-family: 'Rubik';

  ${media.mobile`
    font-size : 12px;
  `}
`;

const StoreNumber = styled.span`
  font-family: 'Rubik';
  color: #999999;

  ${media.mobile`
    font-size : 12px;
  `}
`;

const SelectArea = styled.div`
  width: 100%;
`;

const RequestTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 13px;
  border: 1px solid ${props => props.theme.grayscaleF};
  border-radius: 5px;
  resize: none;
  font-size: 16px;
  background-color: transparent;
`;

const RiderArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 5px;
`;

const RiderInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 42%;
  padding-left: 10px;

  & > span {
    font-size: 14px;
    font-weight: 700;
  }
`;

const RiderTopArea = styled.span`
  position: relative;
  background-color: #999999;
  width: 50px;
  font-family: 'Noto Sans KR';
  color: ${props => props.theme.grayscaleA};
  text-align: center;
  padding: 2px 0;
  border-radius: 10px;
  margin-bottom: 3px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 100%;
    left: -10px;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.theme.grayscaleH};
  }
`;

const PaymentInfo = styled.fieldset`
  padding-bottom: 80px;
  margin: 0 auto;
  max-width: 675px;
  width: 100%;
`;

const PaymentMethod = styled.legend`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.grayscaleF};
`;

const PaymentItemArea = styled.div`
  padding: 25px 0;
  border-bottom: 1px solid ${props => props.theme.grayscaleC};
`;

const PaymentListInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > span {
    display: inline-block;
    width: 43%;
    font-size: 14px;
    font-weight: 700;
    position: relative;
    padding-left: 10px;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 6px;
      left: 0;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${props => props.theme.grayscaleH};
    }
  }
`;

const PaymentButtonList = styled.div`
  margin-bottom: 10px;

  & > button {
    display: inline-block;
    height: 70px;
    width: 100%;
    border: 1px solid ${props => props.theme.grayscaleG};
    line-height: 90px;
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    background: none;
    cursor: pointer;
  }
`;

const CashReceipt = styled.div`
  display: flex;
  flex-direction: column;

  & > span {
    font-size: 14px;
    font-weight: 700;
  }
`;

const OrderDetailArea = styled.fieldset`
  padding-bottom: 80px;
  max-width: 675px;
  width: 100%;
  margin: 0 auto;
  padding: 5px;
`;

const OrderDetailInfo = styled.legend`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.grayscaleF};
`;

const ProductDetailArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 15px;
  background-color: ${props => props.theme.grayscaleK};

  & > span {
    font-size: 14px;
    font-weight: 700;
    font-family: sans-serif;
  }
`;

const ProductDetailInner = styled.div`
  text-align: center;
  margin: 10px 0;
  & span {
    font-size: 14px;
    font-weight: 700;
    font-family: sans-serif;
  }
`;

const DetailItemName = styled.span`
  position: relative;
  color: ${props => props.theme.grayscaleH};
  font-weight: 700;
  padding-left: 10px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.theme.grayscaleH};
  }
`;

const PaymentAmountArea = styled.fieldset`
  padding-bottom: 80px;
  max-width: 675px;
  width: 100%;
  margin: 0 auto;
`;

const PaymentAmountSection = styled.legend`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.grayscaleF};
`;

const PaymentAmountInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px 15px;
  background-color: ${props => props.theme.grayscaleK};
`;

const PaymentAmountItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 17px 0;

  & > span {
    font-size: 14px;
    font-weight: 700;
    font-family: sans-serif;
  }
`;

const PaymentAmountItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 24px 10px;
  border-top: 1px solid ${props => props.theme.grayscaleH};

  & > span {
    color: ${props => props.theme.primaryColor};
    font-size: 18px;
    font-weight: 700;
    font-family: sans-serif;
  }
`;

const PaymentAmountLeftArea = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  padding-left: 10px;
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${props => props.theme.grayscaleH};
  }
`;

const StoreStreetInfo = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.primaryColor};
  margin-top: 10px;
`;

const FinalPaymentArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  & > div {
    width: 170px;
  }
`;
