import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCart } from '../../../Redux/Redux';

import OrderProduct from './OrderProduct';
import Button from '../../../components/Button/Button';
import media from '../../../styles/media';

import styled from 'styled-components';

const OrderDetail = () => {
  /** redux의 dispatch를 사용하기 위한 변수 입니다. */
  const dispatch = useDispatch();
  /** Navigate를 사용하기 위한 변수 입니다. */
  const navigate = useNavigate();

  /** order 페이지에 데이터를 넘겨주기 위해 useSelector를 이요해 state 값을 cartData 변수에 저장합니다. */
  const cartData = useSelector(state => {
    /** state에서 cart라는 name을 가지고 있는 데이터를 반환합니다. */
    return state.cart;
  });

  /** 장바구니에 담긴 데이터를 전체 삭제하는 기능입니다.
   * 1. dispatch를 이용하여 type을 'DELETE_ALL_CART'로 보내줍니다.
   * 2. reducer에서 type이 'DELETE_ALL_CART'일 경우 state를 빈 배열로 초기화 합니다.
   * 3. 장바구니에 담긴 모든 데이터가 삭제됩니다.
   */
  const CartDataAllDelete = () => {
    /** Redux Toolkit을 사용하지 않았을 때의 dispatch 입니다.  */
    // dispatch({
    //   type: 'DELETE_ALL_CART',
    // });

    /** Redux Toolkit을 사용했을 때의 dispatch 입니다.  */
    dispatch(deleteAllCart());
  };

  return (
    <OrderDetailMain>
      <OrderDetailTitleWrap>
        <h3>주문내역</h3>
        <DeleteAllBtnWrap>
          <Button
            size="small"
            color="black"
            content="전체삭제"
            onClick={CartDataAllDelete}
          />
        </DeleteAllBtnWrap>
      </OrderDetailTitleWrap>
      <OrderProductTable>
        <colgroup>
          <col width="40%" />
          <col width="30%" />
          <col width="30%" />
        </colgroup>
        <thead>
          <OrderTableHead>
            <th>메뉴</th>
            <th>수량</th>
            <th>금액</th>
          </OrderTableHead>
        </thead>
        <OrderProduct />
      </OrderProductTable>
      <ButtonWrap>
        <OrderBtnAdd>
          <Button
            size="large"
            color="beige"
            content="+ 메뉴 추가하기"
            onClick={() => {
              navigate('/list');
            }}
          />
        </OrderBtnAdd>
        <OrderBtnRight>
          <OrderBtn>
            <Button size="large" color="beige" content="쿠폰함" />
          </OrderBtn>
          <OrderBtn>
            <Button
              size="large"
              color="black"
              content="주문하기"
              onClick={() => {
                // cartData가 비어있는 배열인지 확인
                if (!cartData || cartData.length === 0) {
                  alert('장바구니가 비어있습니다.');
                } else {
                  navigate('/order', { state: cartData });
                }
              }}
            />
          </OrderBtn>
        </OrderBtnRight>
      </ButtonWrap>
    </OrderDetailMain>
  );
};

export default OrderDetail;

const FlexBetween = `
  display: flex;
  justify-content: space-between;
`;

const OrderDetailMain = styled.div`
  width: 100%;
  padding: 0 10px;
  padding-bottom: 80px;
`;

const OrderDetailTitleWrap = styled.div`
  ${FlexBetween};
  align-items: center;
  padding-bottom: 7px;
  border-bottom: 1px solid ${props => props.theme.grayscaleH};

  & > h3 {
    margin-right: 5px;
    font-size: 19px;
    font-weight: 700;
  }
`;

const DeleteAllBtnWrap = styled.div`
  width: 110px;
  & > button {
    font-size: 13px;
  }
`;

const OrderProductTable = styled.table`
  display: table;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  font-size: 13px;
  border-bottom: 1px solid ${props => props.theme.grayscaleH};
`;

const OrderTableHead = styled.tr`
  border-bottom: 1px solid ${props => props.theme.grayscaleC};

  & > th {
    padding: 12px 0;
  }
`;

const ButtonWrap = styled.div`
  ${FlexBetween};
  margin-top: 30px;

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `}
`;

const OrderBtnRight = styled.div`
  display: flex;
  gap: 10px;
`;

const OrderBtn = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
  position: relative;

  ${media.mobile`
    width: 110px;
  `}
`;

const OrderBtnAdd = styled.div`
  width: 180px;
`;
