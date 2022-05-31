import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosAsyncOnChainProductClaimCompleted = async (account, nftId) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/onChainProductClaimCompleted`, {
        account,
        nftId
    })

    return result.data;
};
