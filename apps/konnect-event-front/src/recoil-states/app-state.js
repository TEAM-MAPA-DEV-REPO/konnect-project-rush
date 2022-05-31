import { atom } from 'recoil'

export const appInfo = {
  BASE_API_URL: process.env.REACT_APP_BASE_API,
  BACKEND_API_URL: process.env.REACT_APP_BACKEND_API,
  APP_VERSION: {version_serial: "22042601", version_number: "0.1.0"}
}

export const categoryInfo = atom({
  key: 'categoryInfo',
  default : [],
});

