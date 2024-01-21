import { css } from '@emotion/react';

let apiEndpoint;
if (window.location.hostname === 'localhost') {
  // 개발 환경
  apiEndpoint = 'http://localhost:8000';
} else {
  // 배포 환경
  apiEndpoint = '';
}

export const APP_THEME_COLOR = '#17BE94';
export const APP_SUB_COLOR = '#009DE1';
export const APP_SHADOW_COLOR = lightenColor(APP_THEME_COLOR, 0.7);
export const APP_BACKGROUND_COLOR = '#F5F6F6';

export const API_ENDPOINT = apiEndpoint;


function hexToRGB(hex) {
  // 3자리 16진수 코드를 6자리로 확장
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

export function lightenColor(color, percentage) {
  let hexColor;

  // 색상 이름을 16진수 코드로 변환 (예: 'red' -> '#FF0000')
  if (!color.startsWith('#')) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    hexColor = ctx.fillStyle;
  } else {
    hexColor = color;
  }

  // RGB 변환 및 밝기 조절
  const { r, g, b } = hexToRGB(hexColor);
  const rLight = Math.min(255, Math.floor(r + (255 - r) * percentage));
  const gLight = Math.min(255, Math.floor(g + (255 - g) * percentage));
  const bLight = Math.min(255, Math.floor(b + (255 - b) * percentage));

  return `#${rLight.toString(16).padStart(2, '0')}${gLight.toString(16).padStart(2, '0')}${bLight.toString(16).padStart(2, '0')}`;
}

// ajax 공통 함수
export async function ajax(url, method, data) {
  let fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 쿠키 포함
  };

  // GET 요청일 경우, URL에 쿼리 문자열 추가
  if (method.toUpperCase() === 'GET' && data) {
    const queryParams = new URLSearchParams(data).toString();
    url = `${url}?${queryParams}`;
  } else if (data) {
    fetchOptions.body = JSON.stringify(data);
  }
  const response = await fetch(`${API_ENDPOINT}${url}`, fetchOptions);
  return await response.json();
}