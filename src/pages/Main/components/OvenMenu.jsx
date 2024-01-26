import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API } from '../../../config';
import { customAxios } from '../../../API/API';
import media from '../../../styles/media';

import Loading from '../../../components/Loading/loading';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

import styled from 'styled-components';

/**
 * Main 페이지에 사용되는 Swiper 컴포넌트 입니다.
 */
const OvenMenu = ({ scrollY }) => {
  /** BigBanner의 데이터를 받아오기 위한 useState 생성 */
  const [bandDataList, setBandDataList] = useState([]);

  /**로딩페이지를 토글할 useState를 정의합니다. */
  const [loading, setLoading] = useState(true);

  /** 화면이 처음 로딩될 때 배너에 대한 정보를 받아오기 위한 useEffect */
  useEffect(() => {
    setLoading(true);
    requestBandDataGet();
  }, []);

  /**
   * Custom Axios를 이용하여 BandSwiper 대한 Data를 Json파일에서 받아온다.
   * response는 변수지정을 하지만 실제로 사용하지 않기 때문에 에러줄을 없애기 위해 eslint-disable-line no-unused-vars를 사용
   * 1. customAxios를 이용하여 API.BAND_SWIPER 대한 Data를 받아온다.
   * 2. 받아온 Data를 setBandDataList 이용하여 bandDataList에 저장한다.
   * 3. 에러가 발생했을 경우 alert를 띄운다.
   * */
  const requestBandDataGet = async () => {
    try {
      const request = await customAxios.get(API.BAND_SWIPER);
      setBandDataList(request.data.result);
      setLoading(false);
    } catch (error) {
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <>
      {loading && <Loading />}
      <BandContainer>
        <TitleWrap
          className={scrollY >= window.innerHeight / 3 && 'pageOffset'}
        >
          <h2>Oven Menu</h2>
        </TitleWrap>
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect={'coverflow'}
          slidesPerView={'4'}
          spaceBetween={100}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          coverflowEffect={{
            rotate: 20, // 슬라이드 회전 각도
            stretch: 0, // 슬라이드 사이의 간격
            depth: 100, // 슬라이드와 슬라이드 사이의 거리
            modifier: 1, // 슬라이드 크기
            slideShadows: false, // 슬라이드 그림자
          }}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {bandDataList.map(({ id, href, src, alt, tag }) => {
            return (
              <SwiperSlide key={id}>
                <SlideInnerWrap>
                  <ImageWrap>
                    <Link to={href}>
                      <img src={src} alt={alt} />
                    </Link>
                  </ImageWrap>
                  <TextWrap>
                    <span>{tag}</span>
                  </TextWrap>
                </SlideInnerWrap>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </BandContainer>
    </>
  );
};

export default OvenMenu;

const BandContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 150px;
  background-color: ${props => props.theme.grayscaleJ};

  & > .mySwiper {
    height: 400px;
  }

  ${media.tablet`
  height: 100vh;
  padding-top: 150px;

  & > .mySwiper {
    height: 350px;
  }
  `}

  ${media.mobile`
    height : 100%;
padding-top: 100px;

    & > .mySwiper {
    height: 250px;
  }
  `}
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 55px;
  font-family: 'Rubik';
  font-weight: 900;
  transition: all 0.3s ease-in-out;
  opacity: 0;

  &.pageOffset {
    opacity: 1;
    top: 10%;
  }

  ${media.tablet`
    font-size: 40px;
  `}

  ${media.mobile`
   font-size: 28px;
  `}
`;

const SlideInnerWrap = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.grayscaleC};

  & > a {
    width: 100%;
    height: 100%;
  }

  & img {
    height: 100%;
    object-fit: cover;
  }
`;

const TextWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.transparentB};

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 25px;
    font-family: 'Rubik';
    font-weight: 700;
    color: ${props => props.theme.grayscaleA};
  }

  ${media.tablet`
  height: 60px;

& span {
  font-size: 20px;
}
  `}

  ${media.mobile`
  height: 35px;

& span {
  font-size: 18px;
}
  `}
`;
