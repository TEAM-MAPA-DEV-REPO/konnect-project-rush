import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosProductList = async (walletAddress) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/product_list`, {
        walletAddress: walletAddress
    })

    return result.data;
};
