import { useState, useEffect } from 'react';

import { API } from '../../../config';
import { customAxios } from '../../../API/API';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styled from 'styled-components';

// 주문방법선택 페이지 내의 배너를 위한 컴포넌트
const DeliverySwiper = () => {
  //deliverySwiperItem의 값을 받기 위하여 State를 생성합니다.
  const [deliverySwiperItem, setDeliverySwiperItem] = useState([]);

  //페이지 렌더링시 제일처음 deliverySwiperItem을 보여주기 위하여 생성합니다.
  useEffect(() => {
    getDeliverySwiperItemInfoData();
  }, []);

  const getDeliverySwiperItemInfoData = async () => {
    try {
      const request = await customAxios.get(API.DELIVERY_SWIPER); //API.DELIVERY_SWIPER 로 GET 요청을 보냅니다.
      setDeliverySwiperItem(request.data.result);
    } catch (error) {
      alert('리스트 생성에 실패했습니다.'); //요청이 실패시 alert생성.
    }
  };

  return (
    // 구동방식 - 자동재생(2초)
    <Swiper
      modules={[Autoplay]}
      spaceBetween={3}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
    >
      {deliverySwiperItem.map(({ id, img, alt }) => (
        <SwiperSlide key={id}>
          <SwiperImgWrap>
            <img src={img} alt={alt} />
          </SwiperImgWrap>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperImgWrap = styled.div`
  width: 100%;
  height: 156px;
  cursor: pointer;
`;

export default DeliverySwiper;
