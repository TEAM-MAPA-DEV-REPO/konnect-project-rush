import axios from "axios";
import {appInfo} from '../recoil-states/app-state';

export const axiosAsyncOnChainExportTokenToLazyMint = async (account, nftId, IPFSMetadataIPFSURL, userProductIndex, userProduct) => {
    const result = await axios.post(`${appInfo.BACKEND_API_URL}/kct/export-token-to-lazy-mint`, {
        account,
        nftId,
        IPFSMetadataIPFSURL,
        userProductIndex,
        userProduct
    })

    return result.data;
};
