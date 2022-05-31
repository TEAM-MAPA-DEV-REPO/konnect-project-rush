import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosUnboxing = async (walletAddress, boxIndex) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/unboxing`, {
        walletAddress: walletAddress,
        boxIndex: boxIndex
    })

    return result.data;
};
