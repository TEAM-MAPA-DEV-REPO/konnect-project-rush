import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosBoxList = async (walletAddress) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/box_list`, {
        walletAddress: walletAddress
    })

    return result.data;
};
