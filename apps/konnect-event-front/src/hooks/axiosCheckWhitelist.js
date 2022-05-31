import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosCheckWhitelist = async (walletAddress) => {
    console.log(walletAddress);
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/check_whitelist`, {
        walletAddress: walletAddress
    })

    return result.data;
};
