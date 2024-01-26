import styled from 'styled-components';
import IconButton from '../IconButton/IconButton';
import { useState } from 'react';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import FooterTerms from '../Modal/FooterTerms';
import FooterUserInfo from '../Modal/FooterUserInfo';
import FooterEmailRefusal from '../Modal/FooterEmailRefusal';
import media from '../../styles/media';

/**
 * @default "#none"  - a태그의 링크기능을 무효화 하는것을 의미합니다.
 */

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState(null);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <FooterContainer>
        <div>
          <InnerTopSection>
            <div>
              <ul>
                <li>
                  <InquirySubText>전화주문&nbsp;</InquirySubText>
                  <InquiryNumber>1544-0000</InquiryNumber>
                </li>
                <li>
                  <InquirySubText>창업문의&nbsp;</InquirySubText>
                  <InquiryNumber>1644-0000</InquiryNumber>
                </li>
              </ul>
            </div>
            <InfoArea>
              <ul>
                <li>
                  <InfoAreaTargetButton
                    type="button"
                    onClick={() => {
                      handleModalOpen();
                      setModalState(1);
                    }}
                  >
                    이용약관
                  </InfoAreaTargetButton>
                </li>
                <li>
                  <InfoAreaTargetButton
                    type="button"
                    onClick={() => {
                      handleModalOpen();
                      setModalState(2);
                    }}
                  >
                    개인정보처리방침
                  </InfoAreaTargetButton>
                </li>
                <li>
                  <InfoAreaTargetButton
                    type="button"
                    onClick={() => {
                      handleModalOpen();
                      setModalState(3);
                    }}
                  >
                    이메일무단수집거부
                  </InfoAreaTargetButton>
                </li>
                <li>
                  <InfoAreaTargetLink href="#none">
                    찾아오시는길
                  </InfoAreaTargetLink>
                </li>
              </ul>
            </InfoArea>
            <SnsConnectionArea>
              <ul>
                <li>
                  <a href="#none">
                    <IconButton
                      type="button"
                      content="instagram"
                      size="small"
                      color="white"
                    />
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <IconButton
                      type="button"
                      content="facebook"
                      size="small"
                      color="white"
                    />
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <IconButton
                      type="button"
                      content="blog"
                      size="small"
                      color="white"
                    />
                  </a>
                </li>
                <li>
                  <a href="#none">
                    <IconButton
                      type="button"
                      content="youtube"
                      size="small"
                      color="white"
                    />
                  </a>
                </li>
              </ul>
            </SnsConnectionArea>
          </InnerTopSection>
          <AddressSection>
            <address>
              <ul>
                <AddressDetailList>
                  주식회사 리유니온 대표자 : 류창선
                </AddressDetailList>
                <AddressDetailList>
                  주소 서울특별시 중구 한강대로 416 서울스퀘어 13층
                </AddressDetailList>
                <AddressDetailList>
                  사업자등록번호 000-00-00000
                </AddressDetailList>
                <AddressDetailList>
                  통신판매업신고번호 제 2023-서울중구-0000호
                </AddressDetailList>
                <AddressDetailList>TEL 00-0000-0000</AddressDetailList>
                <AddressDetailList>FAX 00-0000-0000</AddressDetailList>
                <AddressDetailList>
                  광고 제휴 문의 example@example.com
                </AddressDetailList>
              </ul>
            </address>
            <span>© 2009-2023 REUNION.CO.ALL RIGHT RESERVED</span>
          </AddressSection>
        </div>
      </FooterContainer>
      <Portal>
        {isModalOpen && modalState === 1 && (
          <Modal
            title="이용약관"
            size="medium"
            content={<FooterTerms />}
            isCloseBtn={true}
          />
        )}
        {isModalOpen && modalState === 2 && (
          <Modal
            title="개인정보 수집 및 이용 동의"
            size="medium"
            content={<FooterUserInfo />}
            isCloseBtn={true}
          />
        )}
        {isModalOpen && modalState === 3 && (
          <Modal
            title="이메일수집거부"
            size="medium"
            content={<FooterEmailRefusal />}
            isCloseBtn={true}
          />
        )}
      </Portal>
    </>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  padding: 0 75px 30px 75px;
  background-color: ${props => props.theme.grayscaleF};
`;

const InnerTopSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.transparentA};
  padding: 35px 0 30px 0;
  white-space: nowrap;

  ${media.tablet`
      flex-direction: column;
      align-items : center;
  `}

  ${media.mobile`
      flex-direction: column;
  `}
`;

const InquirySubText = styled.span`
  vertical-align: middle;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5px;
  color: ${props => props.theme.grayscaleA};
`;

const InquiryNumber = styled.span`
  vertical-align: middle;
  font-size: 40px;
  font-weight: 900;
  color: ${props => props.theme.grayscaleA};

  ${media.mobile`
    font-size: 30px;
  `}
`;

const InfoArea = styled.div`
  margin-top: 25px;

  & > ul {
    display: flex;
    flex-direction: row;
    white-space: normal;

    & > li {
      &:last-child {
        margin-top: 1px;
      }
    }

    ${media.mobile`
        flex-direction: column;
        align-items : center;

        & > li {
          margin-top : 10px;
          &:last-child {
            margin-top: 10px;
          }
        }
    `}
  }
`;

const InfoAreaTargetButton = styled.button`
  background: none;
  border: none;
  margin-right: 32px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: ${props => props.theme.grayscaleA};

  ${media.laptop`
    margin-right: 10px;  
  `}
`;

const InfoAreaTargetLink = styled.a`
  margin-right: 32px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'sans-serif';
  color: ${props => props.theme.grayscaleA};

  ${media.laptop`
    margin-right: 10px;  
  `}
`;

const SnsConnectionArea = styled.div`
  margin-top: 20px;

  & > ul {
    display: flex;
  }

  & > ul > li {
    margin-right: 32px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const AddressSection = styled.section`
  width: 100%;
  margin-top: 30px;

  & > address {
    & > ul {
      display: flex;
      flex-wrap: wrap;
      line-height: 20px;
    }
  }

  & > span {
    font-size: 11px;
    color: ${props => props.theme.transparentA};
  }
`;

const AddressDetailList = styled.li`
  margin-right: 20px;
  position: relative;
  font-size: 10px;
  font-weight: 700;
  font-family: 'Rubik';
  color: ${props => props.theme.transparentA};

  &:last-child {
    margin-right: 0px;

    &::after {
      display: none;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 8px;
    background: ${props => props.theme.transparentA};
    position: absolute;
    top: 47%;
    right: -10px;
    transform: translate(0, -50%);
  }
`;

export default Footer;
