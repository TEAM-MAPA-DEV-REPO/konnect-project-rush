import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosProductClaim = async (walletAddress, userProductIndex, name, country, city, address, addressDetail, zip, phone_number, type) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/product_claim`, {
        walletAddress: walletAddress,
        userProductIndex: userProductIndex,
        name: name,
        country: country,
        city: city,
        address: address,
        addressDetail: addressDetail,
        zip: zip,
        phone_number: phone_number,
        type: type
    })

    return result.data;
};
