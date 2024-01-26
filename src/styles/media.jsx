import { css } from 'styled-components';

/**
 * media query별 사이즈를 상수로 선언합니다.
 * 다양한 화면의 크기를 위해 mobile, tablet, laptop, desktop을 선언합니다.
 * @param {Object} sizes media query를 사용하기 위한 객체입니다.
 */
const sizes = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

/**
 * 위에서 선언한 상수를 이용하여 media query를 사용하기 위한 함수입니다.
 * Object.keys() 함수로 매개변수로 받은 객체의 키값을 배열로 반환합니다.
 * reduce() 함수로 배열을 순회하면서 media query를 사용하기 위한 함수를 반환합니다.
 * 각 라벨(화면 크기)에 대해서 속성 기능이 할당됩니다.  스타일 규칙 목록을 인수 (...args)로 전달합니다.
 * 인수로 전달된 스타일은 css 함수를 통해 문자열로 변환되어 반환됩니다.
 * @param {Object} size media query를 사용하기 위한 객체입니다.
 * @param {string} label media query를 사용하기 위한 키값입니다.
 * @param {Array} args css를 사용하기 위한 배열입니다.
 * @returns {Function} media query를 사용하기 위한 함수를 반환합니다.
 */

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
