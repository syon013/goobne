import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as GoobstarIcon } from '../../../svg/Main/MainInstar.svg';
import Loading from '../../../components/Loading/loading';

import { API } from '../../../config';
import { customAxios } from '../../../API/API';
import media from '../../../styles/media';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styled from 'styled-components';

const GoobStar = () => {
  /** GoobStar의 데이터를 받아오기 위한 useState 생성 */
  const [goobStarDataList, setGoobStarDataList] = useState([]);

  /**로딩페이지를 토글할 useState를 정의합니다. */
  const [loading, setLoading] = useState(true);

  /** 화면이 처음 로딩될 때 GoobStar에 대한 정보를 받아오기 위한 useEffect */
  useEffect(() => {
    setLoading(true);
    requestGoobStarDataGet();
  }, []);

  /**
   * Custom Axios를 이용하여 GoobStarDataList 대한 Data를 Json파일에서 받아온다.
   * response는 변수지정을 하지만 실제로 사용하지 않기 때문에 에러줄을 없애기 위해 eslint-disable-line no-unused-vars를 사용
   * 1. customAxios를 이용하여 GOOB_STAR 대한 Data를 받아온다.
   * 2. 받아온 Data를 setGoobStarDataList 이용하여 GoobStarDataList 저장한다.
   * 3. 에러가 발생했을 경우 alert를 띄운다.
   * */
  const requestGoobStarDataGet = async () => {
    try {
      const request = await customAxios.get(API.GOOB_STAR);
      setGoobStarDataList(request.data.result);
      setLoading(false);
    } catch (error) {
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <>
      {loading && <Loading />}
      <GoobStarMainContainer>
        <GoobStarInnerWrap>
          <SwiperContainer>
            <TitleWrap>
              <h2>
                <GoobstarIcon /> The Goobstar
              </h2>
            </TitleWrap>
            <Swiper
              spaceBetween={50}
              slidesPerView={7}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                2560: {
                  slidesPerView: 7,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {goobStarDataList.map(({ id, href, src, alt }) => {
                return (
                  <SwiperSlide key={id}>
                    <Link to={href}>
                      <img src={src} alt={alt} />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </SwiperContainer>
        </GoobStarInnerWrap>
      </GoobStarMainContainer>
    </>
  );
};

export default GoobStar;

const GoobStarMainContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.grayscaleB};

  ${media.tablet`
    height : 100%;
  `}

  ${media.mobile`
    height : 100%;
  `}
`;

const GoobStarInnerWrap = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  background-color: ${props => props.theme.grayscaleJ};
  position: relative;
`;

const SwiperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > .mySwiper {
    padding-top: 100px;

    & img {
      border: 2px solid ${props => props.theme.grayscaleH};
    }
  }

  ${media.tablet`
  & > .mySwiper { 
    padding : 100px 0 50px 0;
  }
  `}

  ${media.mobile`
  
  & > .mySwiper { 
    padding : 80px 0 50px 0;
  }
  `}
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    font-size: 52px;
    font-weight: 800;
    font-family: 'Rubik', sans-serif;
  }

  svg {
    width: 64px;
    height: 64px;
    margin-right: 20px;
  }

  ${media.tablet`
  
  & > h2 {
    font-size: 28px;
  }

  svg {
    width: 36px;
    height: 36px;
    margin-right: 20px;
  }
  `}

  ${media.mobile`
  
  & > h2 {
    font-size: 18px;
  }

  svg {
    width: 26px;
    height: 26px;
    margin-right: 10px;
  }
  `}
`;
