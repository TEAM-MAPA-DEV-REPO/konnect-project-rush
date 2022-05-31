import React, { useState,useEffect,useRef } from "react";
import profile from "../assets/mypage/profile.png";
import { CenterModal } from "react-spring-modal";
import { FiChevronDown,FiChevronRight } from "react-icons/fi";
import Carousel  from "react-elastic-carousel"; 
import { NavLink, useHistory } from "react-router-dom";
import styled, {keyframes} from "styled-components";
import { Modal } from 'react-bootstrap';

import blacks from "../assets/mypage/black.png"
import browns from "../assets/mypage/brown.png"
import golds from "../assets/mypage/godl.png"
import silvers from "../assets/mypage/silver.png"
import vsers  from "../assets/mypage/vvvvsv.png"
import btn_logo from "../assets/mypage/btn_logo.png"
import logo from "../assets/mypage/logo_M.png"
import sns1 from "../assets/sns1.png"
import sns2 from "../assets/sns2.png"
import sns3 from "../assets/sns3.png"
import sns4 from "../assets/sns4.png"
import sns5 from "../assets/sns5.png"
import sns6 from "../assets/snsn6.png"
import sns7 from "../assets/snsn7.png"
import locale from '../language/index';
import korea from '../assets/korean_flag.png';
import US from '../assets/american_flag.png';
import {user,nftproduct} from "../data/dummy"
import Init from "../language/index";

import MyBox from "../assets/mypage/MysteryBox.png"
// import video from "../assets/mypage/boxOpen.mp4"
import video from "../assets/mypage/boxOpenShort.mp4"
import wach from "../assets/mypage/wach.png"
import koClaim from "../assets/mypage/claim.png"
import enClaim from "../assets/mypage/en_claim.png"
import around from "../assets/mypage/around.png"

// NFT 카드 이미지 목록용 / 영상용
import black_bg from '../assets/mypage/black_bg.png'
import bronze_bg from '../assets/mypage/bronze_bg.png'
import silver_bg from '../assets/mypage/silver_bg.png'
import gold_bg from '../assets/mypage/gold_bg.png'
import platinum_bg from '../assets/mypage/platinum_bg.png'
import black_blank from '../assets/mypage/black_blank.png'
import bronze_blank from '../assets/mypage/bronze_blank.png'
import silver_blank from '../assets/mypage/silver_blank.png'
import gold_blank from '../assets/mypage/gold_blank.png'
import platinum_blank from '../assets/mypage/platinum_blank.png'

import Lottie from 'react-lottie';
import LottieConfirm from '../assets/lottie_confirm.json';
import moment from 'moment';

// blockchain
import { Container, Row, Col } from "react-bootstrap";
import { useMoralis, useMoralisQuery, useMoralisSubscription } from "react-moralis";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import AccountWallet from '../assets/mypage/accountWallet.png'
import CopyIcon from '../assets/mypage/copy.png'
import { Modal as AntdModal, Spin, Button} from 'antd';
import { KonnectContracts } from '../contracts/index';
import { isMobile } from 'react-device-detect';
import { ethers } from 'ethers';
// 리코일 상태값
import { wallet } from "../recoil-states/user-state" // states
import { useRecoilState } from 'recoil';
import { axiosBoxList } from "../hooks/axiosBoxList";
import { axiosProductList } from "../hooks/axiosProductList";
import { appInfo } from "../recoil-states/app-state";
import { axiosUnboxing } from "../hooks/axiosUnboxing";
import { axiosProductClaim } from "../hooks/axiosProductClaim";
import { axiosAsyncOnChainExportTokenToLazyMint } from "../hooks/axiosAsyncOnChainExportTokenToLazyMint";
import { axiosAsyncOnChainExportTokenToLazyMintCompleted } from '../hooks/axiosAsyncOnChainExportTokenToLazyMintCompleted';
import { axiosAsyncOnChainProductClaimCompleted } from "../hooks/axiosAsyncOnChainProductClaimCompleted";




const lottie_confirm_options = {
  animationData: LottieConfirm,
  loop: false,
  autoPlay: true,
  rendererSettings: {
    className: 'add-class',
    preserveAspectRatio: 'xMidYMid slice'
  }
}

//미스터리 박스 컴포넌트
const MysteryBox = ({grade, brand,product,nftNo,nftParts,cardimgurl,imgurl}) => {
  //등급에 따라 바뀌는 배경 함수

  //클레임 완료 CSS 추가 함수 
  const _claimsFunc = (className) => {
    if(className == undefined ) {
          return "claimcomplte"; 
    }
  }

  return(
    <>
      <div className="nft_card" >
        <p className="nft_card_title">AIR DROP GIFT</p>
        <div className="nft_card_inner">
          <div onClick={() => {console.log(_claimsFunc(),"claimClassCheck") }} className="nft_bg">
            {/* <img src={MyBox}></img> */}
            <img src={imgurl == null ? MyBox : `${appInfo.BACKEND_API_URL}/assets/${imgurl}`}></img>
          </div>
        </div>
      </div>
    </>
  )
}



//  맵 돌리고 있는 컴포넌트
const NftCardList =(props,{grade, brand,product,nftNo,nftParts,cardimgurl,imgurl, className}) => {

  const [viewNFTCard,setviewNFTCard] = useState(false);
  useEffect(() => {
    // console.log(viewCardModal,'viewCardModal');
  }, [])

  // const claimed = () => {
  //   if (_claimLang == 'ko' && claimToggle == true ) {
  //     return (
  //     <img className="nft_card_claim" src={koClaim} width={120}/>
  //     )
  //   } else if (_claimLang == 'en' && claimToggle == true ) {
  //     return (
  //     <img className="nft_card_claim" src={enClaim} width={120}/>
  //     )
  //   }
  // }
  

  //등급에 따라 바뀌는 배경 함수
//   const _bgFunc = () => {
//     if(imgurl == "PLATINUM"){
//            return silvers
//     }else if(imgurl =="blacks"){
//       return blacks
//     }else if(imgurl == "golds"){
//       return golds
//     }else if(imgurl == "vsers"){
//       return vsers 
//     }else if(imgurl == "browns"){
//         return browns
//     }
//  }
 //클레임 완료 CSS 추가 함수 
  const _claimFunc = (className) => {
            if(className == undefined ) {
                 return "claimcomplte"; 
            }
     }






  return(
    <>
    
    <div className="nft_card">
      
      {/* <p className="nft_card_title">AIR DROP GIFT</p> */}
      <div className="nft_card_inner" onClick={() => {setviewNFTCard(true);props.setviewNFTCard(true);console.log(viewNFTCard,'viewNFTCard')}}>
        {/* 완전한 상품 이미지로 대체 */}
        {/* <div onClick={() => {console.log(_claimFunc(),"sddsds"); }} className="nft_bg">
          <img src={_bgFunc()}></img>
        </div>
        <div className="nft_content">
          <img src={cardimgurl}></img>
            <p className="nft_title">
              {grade}
            </p>
            <p  className="nft_txt1">
              BRAND : {brand}
            </p>
            <p  className="nft_txt2">
              PRODUCT : {product}
            </p>
            <p  className="nft_txt3">
              NFT No : {nftNo}
            </p>
            <p  className="nft_txt4">
              NFT Parts implementation : {nftParts}
            </p>
        </div> */}
        <div onClick={() => {console.log(_claimFunc(),"sddsds"); console.log(props,'이거뭐야')}} className="nft_bg">
          {/* nft_no가 찍혀있지 않은 상품의 이미지에서 찍힌 이미지로 변경 */}
          {/* <img src={cardimgurl == null ? blacks : `${appInfo.BACKEND_API_URL}/assets/${cardimgurl}`}></img> */}
          <img src={props.cardimgurl == null ? blacks : `${appInfo.BACKEND_API_URL}/kct/nftImage/${props.cardimgurl}`}></img>
        </div>
        
      </div>
    </div>
  {viewNFTCard == true ?
    <Modal
    show={viewNFTCard}
    onHide={() => {setviewNFTCard(false);props.setviewNFTCard(false)}}
    className='view_mypick_nft_card'
    // contentTransition={{
    //   from: {  transform: 'translateX(-100%)' },
    //   enter: { transform: 'translateX(0)' },
    //   leave: {  transform: 'translateX(-100%)' }
    // }}
        
        >
        <div className="view_nft" style={{width:"100%",display:"flex",justifyContent:"center",position:"relative",}}>
          {/* <p className="nft_card_title">AIR DROP GIFT</p> */}
          {/* 완전한 상품 이미지로 대체 */}
          {/* <div  className="view_nft_card_bg" style={{width:"100%"}}>
            <img src={_itemBG}></img>
          </div>
          <div className="view_nft_card">
            <img src={_itemCard}/>
              <p className="nft_title">
                {_grade}
              </p>
              <p  className="nft_txt1">
                BRAND : {_brand}
              </p>
              <p  className="nft_txt2">
                PRODUCT : {_product}
              </p>
              <p  className="nft_txt3">
                NFT No : {_nftNo}
              </p>
              <p  className="nft_txt4">
                NFT Parts implementation : {nftParts}
              </p>
          </div> */}
          <div className="view_nft_card_bg" style={{}}>
            {/* nft_no가 찍혀있지 않은 상품의 이미지에서 찍힌 이미지로 변경 */}
            {/* <img src={cardimgurl == null ? blacks : `${appInfo.BACKEND_API_URL}/assets/${cardimgurl}`}></img> */}
            <img style={{borderRadius:'20px',}} src={props.cardimgurl == null ? blacks : `${appInfo.BACKEND_API_URL}/kct/nftImage/${props.cardimgurl}`}></img>
          </div>
        </div> 
  </Modal>
    :
    null
  }
  </>
  )
} 

// 언박싱시 결과상품 애니메이션
const UnboxingProductAnimation = keyframes`
  0% {
    opacity: 0;
  }
  29% {
    opacity: 0;
  }
  30% {
    opacity: 0.3;
  }
  35% {
    opacity: 1;
  }
`;
const UnboxingProductDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  animation: ${UnboxingProductAnimation} 20s 0s linear alternate;
`;


const Mypage = () => {

  const history = useHistory();
  // blockchain
  const { Moralis, isAuthenticated, account, chainId } = useMoralis();
  const [userWallet, setUserWallet] = useRecoilState(wallet);
  const [originAccount, setOriginAccount] = useState('');
  // 마우스가 오버되면 보여줄 Account목록
  const [hover, setHover] = useState(false)
  const dropdownRef = useRef(null);
  // 선택된 박스 목록의 인덱스
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(0);
  // 선택된 상품 목록의 인덱스
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const koShipNameInputRef = useRef(null);
  const koShipPhoneInputRef = useRef(null);
  const koShipAddressInputRef = useRef(null);
  const koShipAddressMoreInputRef = useRef(null);

  const enShipNameInputRef = useRef(null);
  const enShipPhoneInputRef = useRef(null);
  const enShipAddressInputRef = useRef(null);
  const enShipCityInputRef = useRef(null);
  const enShipCountryInputRef = useRef(null);
  const enShipZipInputRef = useRef(null);

  const [userGrade,setUserGrade] =useState("");
  const [userId,setUserId] =useState("");
  const [userStaKing,setUserStaKing] =useState("");
  const [boxList,setBoxList] = useState([]);          // 미스터리박스 목록 변수
  const [nftCardList,setNftCardList] = useState([]);          // NFT카드 목록 변수
  const [nftCardOpen,setNftCardOpen] = useState(false)
  const [dumanOpen,setDumanOpen] = useState(false)
  const [mysteryOpen,setMysteryOpen] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)
  const [claimModalOpen,setClaimModalOpen] = useState(false);   // 배송 요청 모달
  const [revealModalOpen,setRevealModalOpen] = useState(false);   // 리빌 요청 모달
  const [checkSubmit,setCheckSubmit] = useState([]);
  const [checkSubmitIndex, setCheckSubmitIndex] = useState(null);
  const [checkclaimIndex,setCheckClaimIndex] = useState()
  const [inputName,setInputName] = useState('');
  const [inputAddressLine1,setInputAddressLine1] = useState('');
  const [inputcity,setInputCity] = useState('');
  const [inputZip,setInputZip] = useState('');
  // 글로벌은 베트남으로 고정
  // const [inputCountry,setInputCountry] = useState('');
  const [inputCountry,setInputCountry] = useState('Vietnam');
  const [inputPhoneNumber,setInputPhoneNumber] = useState('');
  const [inputNameKo,setInputNameKo] = useState('');
  const [inputPhonenumberKo,setInputPhonenumberKo] = useState('');
  const [inputAddressKo,setInputAddressKo] = useState('');
  const [inputAddressdetailKo,setInputAddressdetailKo] = useState('');
  const [langmChange,setlangmChange] = useState("en");
  const [langmDataChange, setlangmDataChange] = useState();
  const [yesModal,setYesModal] = useState(false);
  const [videoModal,setVideoModal] = useState(false);
  const [completModal,setCompletModal] =useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [voucherModal, setVoucherModal] = useState(false);
  const [ViewModalOpen, setViewModalOpen] = useState(false);
 

  console.log(ViewModalOpen,'부모')
  

  // 데이터 관리
  const init = async () => {
    // 오프체인 DB 업데이트를 위해 1초 딜레이
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
    await wait(500);

    console.log('wallet address : ', account);
    const resultBoxList = await axiosBoxList(account);
    console.log('resultBoxList : ', resultBoxList);
    setBoxList(resultBoxList.results);
    const resultProductList = await axiosProductList(account);
    console.log('resultProductList : ', resultProductList);
    // 오프체인 상품 리스트
    const offChainProductList = resultProductList.results;
    // setNftCardList(resultProductList.results);
    setNftCardList([]);   // 빈 배열로 초기화
    // setNftCardList(nftproduct);
    // 온체인 토큰 데이터 요청
    const onChainTokenData = await getOnChainTokenIds(account);
    console.log('onChainTokenData', onChainTokenData);
    // 온체인 상품 리스트
    const onChainProductList = onChainTokenData;
    // setNftCardList(e => [...e, ...onChainTokenData]);
    // setNftCardList([...offChainProductList, ...onChainProductList]);
    const beforeTimeSortProductList = [...offChainProductList, ...onChainProductList];

    // 최신순 정렬
    const afterTimeSortProductList = await beforeTimeSortProductList.sort((a, b) => {
      const momentObjA = moment(a.date_created, "YYYY-MM-DDTHH:mm:ss.SSSZ");
      const timestampA = momentObjA.unix();
      const momentObjB = moment(b.date_created, "YYYY-MM-DDTHH:mm:ss.SSSZ");
      const timestampB = momentObjB.unix();
      if(timestampA > timestampB) return -1;
      if(timestampA === timestampB) return 0;
      if(timestampA < timestampB) return 1;
    });
    console.log('afterTimeSortProductList', afterTimeSortProductList);

    // 오프체인, 온체인 통합된 목록의 최신순 정렬 완료된 정보 넣기
    setNftCardList(afterTimeSortProductList);
    // 카드 정보가 초기화될때 카드 아코디언의 인덱스 초기화
    setSelectedProductIndex(0);
  };
  useEffect(() => {
    setUserGrade(user[0].grade);
    setUserId(user[0].id)
    setUserStaKing(user[0].staking)
    // 미스터리박스 목록 추가
    // setBoxList(nftproduct);
    // NFT카드 목록 추가
    // setNftCardList(nftproduct);

    init();
  }, [])
  // 언어관리 en/ko
  useEffect(() => {
    let localeLang = localStorage.getItem('locale');
    if (localeLang == null) {
      localStorage.setItem('locale','en');
      localeLang = 'en';
    }
    const textData = Init(localeLang);
    setlangmDataChange(textData);
    }, 
  [langmChange]);

  // blockchain
  // 메타마스크 미서명시에 주소를 통한 직접 접근 차단
  useEffect(() => {
    // 연결된 네트워크가 다른 네트워크인지 확인
    chainCheck();
    
    if (!isAuthenticated) {
      console.log('not authenticated');
      history.push({
        pathname: '/'
      });
    }
    setOriginAccount(account);
  }, [])
  const chainCheck = async () => {
    // REACT_APP_ENV가 development 상태일때는 체크 X
    console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)
    console.log('chain', Moralis.chainId);
    if (process.env.REACT_APP_ENV === 'live') {
      // 연결된 네트워크가 다른 네트워크인지 확인
      // const web3 = await Moralis.enableWeb3();
      let web3
      if (isMobile) {
        // web3 = await Moralis.enableWeb3({ provider: "walletconnect" });
        // web3 = await Moralis.Web3.enable({
        //   provider: "walletconnect",
        //   chainId: 4,
        //   mobileLinks: ["metamask","trust"]
        // });
        web3 = await Moralis.enableWeb3({
          provider: 'walletconnect', 
          chainId: process.env.REACT_APP_CHAIN_TARGET == 'ethereum' ? 1 : (process.env.REACT_APP_CHAIN_TARGET == 'rinkeby' ? 4 : 3),
          mobileLinks: ['metamask', 'trust']
        })
      } else {
        web3 = await Moralis.enableWeb3();
      }

      // 모바일 임시 처리
      if (!isMobile) {
        console.log('chain check : ', web3._network.name);
        // console.log('chain check : ', web3.provider);
        // console.log('chain check : ', web3._isProvider);
        if (process.env.REACT_APP_CHAIN_TARGET == 'ethereum' && web3._network.name == 'homestead') {
        } else if (process.env.REACT_APP_CHAIN_TARGET == 'rinkeby' && web3._network.name == 'rinkeby') {
        } else if (process.env.REACT_APP_CHAIN_TARGET == 'ropsten' && web3._network.name == 'ropsten') {
        } else {
          console.log('chain connect fail');
          // alert(langmDataChange.chainConnectError);
          alert('네트워크 연결 상태를 확인해주세요(Please check the network connection status)');
          history.push({
            pathname: '/'
          });
        }
      }
    }
  }
  useEffect(() => {
    console.log('useMoralis 마이페이지 업데이트!', isAuthenticated, account, chainId);
    
    // 연결된 네트워크가 다른 네트워크인지 확인
    chainCheck();

    if (originAccount != '' && originAccount != account) {
      history.push({
        pathname: '/'
      });
    }
  }, [isAuthenticated, account, chainId])
  useEffect(() => {
    console.log('NFT 카드 리스트!', nftCardList);
  }, [nftCardList])


// 모달 인풋 관리 
const _checkinputName = (e) => {
 setInputName(e.target.value);
}
const _checkinputAddressline1 = (e) => {
  setInputAddressLine1(e.target.value);
 }
 const _checkinputCity = (e) => {
  setInputCity(e.target.value);
 }
 const _checkinputZip = (e) => {
  setInputZip(e.target.value);
 }
 const _checkinputCountry = (e) => {
  setInputCountry(e.target.value);
 }
 const _checkinputPhoneNumber = (e) => {
  setInputPhoneNumber(e.target.value);
 }

 const _checkinputNameKo = (e) => {
  setInputNameKo(e.target.value);
 }
 const _checkinputPhoneNumberKo = (e) => {
  setInputPhonenumberKo(e.target.value);
 }
 const _checkinputAddressKo = (e) => {
  setInputAddressKo(e.target.value);
 }
 const _checkinputAddressdetailKo = (e) => {
  setInputAddressdetailKo(e.target.value);
}

const onfocusNameKo = () => {
  koShipNameInputRef.current.focus();
}
const onfocusPhoneKo = () => {
  koShipPhoneInputRef.current.focus();
}
const onfocusAddressKo = () => {
  koShipAddressInputRef.current.focus();
}
const onfocusAddressMoreKo = () => {
  koShipAddressMoreInputRef.current.focus();
}


const onfocusNameEn = () => {
  enShipNameInputRef.current.focus();
}
const onfocusPhoneEn = () => {
  enShipPhoneInputRef.current.focus();
}
const onfocusAddressEn = () => {
  enShipAddressInputRef.current.focus();
}
const onfocusCityEn = () => {
  enShipCityInputRef.current.focus();
}
const onfocusCountryEn = () => {
  enShipCountryInputRef.current.focus();
}
const onfocusZipEn = () => {
  enShipZipInputRef.current.focus();
}

//인풋 빈값 검사 함수

const _checkSumitInputv = async () => {
  // 한/영 구분하여 변수 활용
  // 조건중에 하나라도 없으면 얼럿
  if ( langmChange == 'en') {
    if(inputName === '' ) {
      alert(`Please enter name`);
      onfocusNameEn()
    }
    else if(inputAddressLine1 === ''){
      alert(`Please enter Address line 1`)
      onfocusAddressEn()
    }    
    else if(inputcity === ''){
        alert(`Please enter City`)
        onfocusCityEn()
    } 
    else if(inputZip === ''){
        alert(`Please enter ZIP`)
        onfocusZipEn()
    } 
    else if(inputCountry === ''){
      alert(`Please enter Country`)
      onfocusCountryEn()
    }
    else if(inputPhoneNumber === ''){
      alert(`Please enter Phone number`)
      onfocusPhoneEn()
    }

    if( inputName !== '' && inputCountry !== '' && inputAddressLine1 !== '' && inputcity !== '' && 
    inputZip !== '' && inputPhoneNumber !== '' ){
      // setCheckSubmit(true); 
      // setClaimModalOpen(false); 
      // setCheckSubmit([...checkSubmit, checkSubmitIndex]);  

      // 민팅된 카드이면 burn 처리와 온체인 DB 업데이트 진행
      if (nftCardList[selectedProductIndex].minting_active == true) {
        const deliveryDataObj = {
          name: inputName,
          country: inputCountry,
          city: inputcity,
          address: inputAddressLine1,
          addressDetail: '',
          zip: inputZip,
          phone_number: inputPhoneNumber,
          type: 'en',
          user_product: nftCardList[selectedProductIndex],
          walletAddress: account,
        };
        const result = await startExportTokenClaim(deliveryDataObj);

        if (result) {
          
          // 클레임 요청
          // 상품 정보 nftCardList
          // 선택된 상품 인덱스 selectedProductIndex
          console.log(nftCardList);
          console.log(selectedProductIndex);
          // 배송 요청 진행을 위해선 민팅이 필수로 바뀌면서 
          // 배송 요청 정보를 오프체인이 아닌 온체인에 업데이트하게되고
          // 그로 인해 axios 제거
          // axiosProductClaim(
          //   account, 
          //   nftCardList[selectedProductIndex].index, 
          //   inputName,
          //   inputCountry,
          //   inputcity,
          //   inputAddressLine1,
          //   '',
          //   inputZip,
          //   inputPhoneNumber,
          //   'en'
          // )
          // .then(async (res) => {
          //   console.log(res);
          //   init();

          //   setCheckSubmit(true); 
          //   setClaimModalOpen(false);
          //   setLoadingModal(false);
          // })
          // .catch((err) => {
          //   console.log(err);
          // })
          init();
          setCheckSubmit(true); 
          setClaimModalOpen(false);
          setLoadingModal(false);
          
        } else {
          AntdModal.error({
            title: 'Error',
            onOk() { },
          });
        }
      } else {
        // 클레임 요청
        // 상품 정보 nftCardList
        // 선택된 상품 인덱스 selectedProductIndex
        console.log(nftCardList);
        console.log(selectedProductIndex);
        axiosProductClaim(
          account, 
          nftCardList[selectedProductIndex].index, 
          inputName,
          inputCountry,
          inputcity,
          inputAddressLine1,
          '',
          inputZip,
          inputPhoneNumber,
          'en'
        )
        .then(async (res) => {
          console.log(res);
          init();

          setCheckSubmit(true); 
          setClaimModalOpen(false);
          setLoadingModal(false);
        })
        .catch((err) => {
          console.log(err);
        })
      }

    }
  } else if (langmChange == 'ko') {
    if(inputNameKo === ''){
      alert(`이름을 입력해주세요`)
      onfocusNameKo()
    }
    else if(inputPhonenumberKo === ''){
      alert(`전화번호를 입력해주세요`)
      onfocusPhoneKo()
    }    
    else if(inputAddressKo === ''){
      alert(`주소를 입력해주세요`)
      onfocusAddressKo()
    } 
    else if(inputAddressdetailKo === ''){
      onfocusAddressMoreKo()
      alert(`상세주소를 입력해주세요`)
    }

    if( inputNameKo !== '' && inputPhonenumberKo !== '' && inputAddressKo !== '' && inputAddressdetailKo !== '' ){
      // setCheckSubmit(true); 
      // setClaimModalOpen(false); 
      // setCheckSubmit([...checkSubmit, checkSubmitIndex]);

      // 민팅된 카드이면 burn 처리와 온체인 DB 업데이트 진행
      if (nftCardList[selectedProductIndex].minting_active == true) {
        const deliveryDataObj = {
          name: inputNameKo,
          country: '',
          city: '',
          address: inputAddressKo,
          addressDetail: inputAddressdetailKo,
          zip: '',
          phone_number: inputPhonenumberKo,
          type: 'ko',
          user_product: nftCardList[selectedProductIndex],
          walletAddress: account,
        };
        const result = await startExportTokenClaim(deliveryDataObj);

        if (result) {

          // 클레임 요청
          // 상품 정보 nftCardList
          // 선택된 상품 인덱스 selectedProductIndex
          console.log(nftCardList);
          console.log(selectedProductIndex);
          // 배송 요청 진행을 위해선 민팅이 필수로 바뀌면서 
          // 배송 요청 정보를 오프체인이 아닌 온체인에 업데이트하게되고
          // 그로 인해 axios 제거
          // axiosProductClaim(
          //   account, 
          //   nftCardList[selectedProductIndex].index, 
          //   inputNameKo,
          //   '',
          //   '',
          //   inputAddressKo,
          //   inputAddressdetailKo,
          //   '',
          //   inputPhonenumberKo,
          //   'ko'
          // )
          // .then(async (res) => {
          //   console.log(res);
          //   init();

          //   setCheckSubmit(true); 
          //   setClaimModalOpen(false);
          //   setLoadingModal(false);
          // })
          // .catch((err) => {
          //   console.log(err);
          // })
          init();
          setCheckSubmit(true); 
          setClaimModalOpen(false);
          setLoadingModal(false);
          
        } else {
          AntdModal.error({
            title: 'Error',
            onOk() { },
          });
        }
      } else {
        // 클레임 요청
        // 상품 정보 nftCardList
        // 선택된 상품 인덱스 selectedProductIndex
        console.log(nftCardList);
        console.log(selectedProductIndex);
        axiosProductClaim(
          account, 
          nftCardList[selectedProductIndex].index, 
          inputNameKo,
          '',
          '',
          inputAddressKo,
          inputAddressdetailKo,
          '',
          inputPhonenumberKo,
          'ko'
        )
        .then(async (res) => {
          console.log(res);
          init();

          setCheckSubmit(true); 
          setClaimModalOpen(false);
          setLoadingModal(false);
        })
        .catch((err) => {
          console.log(err);
        })
      }

    }
  } 
}

//언어변경 함수
  const onChangelanguage = (lang) => {
    setlangmChange(lang);
    localStorage.setItem('locale',lang);
    const textData = Init(lang);
    setlangmDataChange(textData);
  };

  // blockchain
  // 로그인후 Account버튼 모달 상태 값
  const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
      const onClick = e => {
        // If the active element exists and is clicked outside of
        if (el.current !== null && !el.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      };

      // If the item is active (ie open) then listen for clicks outside
      if (isActive) {
        window.addEventListener("click", onClick);
      }

      return () => {
        window.removeEventListener("click", onClick);
      };
    }, [isActive, el]);

    return [isActive, setIsActive];
  };
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive)
  };
  const [unBoxingProductImageBGURL, setUnBoxingProductImageBGURL] = useState(''); // 박스 오픈시 영상 레이어로 사용될 이미지(배경 없음)
  const [unBoxingProductImageURL, setUnBoxingProductImageURL] = useState(''); // 박스 오픈후 상품 이미지(배경 있음)
  const unBoxing = () => {
    // 로딩 모달 오픈
    setLoadingModal(true);
    // 박스 정보 boxList
    // 선택된 박스 인덱스 selectedBoxIndex
    console.log(boxList);
    console.log(selectedBoxIndex);
    axiosUnboxing(account, boxList[selectedBoxIndex].index)
    .then(async (res) => {
      // 언박싱 결과 도착후 비디오 재생
      // 비디오 모달 오픈
      setVideoModal(true);
      // 오픈 확인 모달 닫기
      setYesModal(false);

      console.log(res);
      setUnBoxingProductImageBGURL(res.results[0].product_index.image_bg);
      {/* NFT NO가 없는 api 서버 이미지에서 NO가 등록된 ipfs local image 주소로 변경 */}
      // setUnBoxingProductImageURL(res.results[0].product_index.image_item);
      setUnBoxingProductImageURL(res.results[0].ipfs_image_local_url);

      init();

      // 로딩 모달 닫기
      setLoadingModal(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const claiming = () => {
    // 상품 정보 nftCardList
    // 선택된 상품 인덱스 selectedProductIndex
    // console.log(nftCardList);
    // console.log(selectedProductIndex);
    // axiosUnboxing(account, boxList[selectedBoxIndex].index)
    // .then((res) => {
    //   console.log(res);
    //   setUnBoxingProductImageBGURL(res.results[0].product_index.image_bg);
    //   setUnBoxingProductImageURL(res.results[0].product_index.image_item);
    //   init();
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }

  // lazy minting 요청하기
  const startExportTokenLazing = async () => {
    if (isAuthenticated && account) {
      // 로딩 모달 오픈
      setLoadingModal(true);

      // 카드 정보 nftCardList
      // 선택된 카드 인덱스 selectedProductIndex
      // console.log(nftCardList);
      // console.log(selectedProductIndex);
      // console.log(nftCardList[selectedProductIndex].nft_no);
      // console.log(nftCardList[selectedProductIndex].ipfs_metadata_ipfs_url);
      console.log('익스포트 시작...', account, nftCardList[selectedProductIndex].nft_no, nftCardList[selectedProductIndex].ipfs_metadata_ipfs_url, nftCardList[selectedProductIndex].index, nftCardList[selectedProductIndex])
      // setIsExporting(true);
      const result = await axiosAsyncOnChainExportTokenToLazyMint(account, nftCardList[selectedProductIndex].nft_no, nftCardList[selectedProductIndex].ipfs_metadata_ipfs_url, nftCardList[selectedProductIndex].index, nftCardList[selectedProductIndex]);
      // setIsExporting(false);
      if (result.RETCODE === 'LAZYMINTING_SUCCESS') {
        console.log('익스포트 결과...', result)
        // setSuccess(true);
        init();
        // 로딩 모달 닫기
        setLoadingModal(false);
        // 민팅 바우처 생성 결과 안내 모달 오픈
        setVoucherModal(true);
      } else {
        console.log('fail');
        setLoadingModal(false);
      }
    }
  }

  // lazy minting 이후에 가져가기
  const startExportTokenRedeem = async () => {
    // console.log('에러', isAuthenticated);
    // console.log('에러', account);
    // console.log('에러', nftCardList[selectedProductIndex]);
    if (isAuthenticated && account && nftCardList[selectedProductIndex].minting_signature) {
      // 로딩 모달 오픈
      setLoadingModal(true);

      // 카드 정보 nftCardList
      // 선택된 카드 인덱스 selectedProductIndex
      // console.log(nftCardList);
      // console.log(selectedProductIndex);
      // console.log(nftCardList[selectedProductIndex].minting_voucher);
      // console.log(nftCardList[selectedProductIndex].minting_signature);


      // 민팅 요청에 대한 온체인 DB의 mint 데이터를 waiting에서 minting으로 업데이트
      const KonnectNFTOnChain = Moralis.Object.extend("KonnectNFTOnChain");
      const query = new Moralis.Query(KonnectNFTOnChain);
      query.equalTo("mint", 'waiting');
      query.equalTo("claimActive", false);
      query.equalTo("nftNo", nftCardList[selectedProductIndex].nft_no);
      const result = await query.first();
      result.set("mint", 'minting');
      await result.save();

      // 민팅 시작 데이터 로그를 남겨서 완료여부 worker가 확인
      const KonnectNFTOnChainMint = Moralis.Object.extend("KonnectNFTOnChainMint");
      const konnectNFTOnChainMintObj = new KonnectNFTOnChainMint();
      konnectNFTOnChainMintObj.set("nftId", nftCardList[selectedProductIndex].nft_no)
      konnectNFTOnChainMintObj.set("address", account)
      konnectNFTOnChainMintObj.set("status", 'waiting')
      konnectNFTOnChainMintObj.set("createdTimestamp", new Date().getTime())
      await konnectNFTOnChainMintObj.save()



      console.log('클레임 시작...', account)
      // setIsClaiming(true);
      const result2 = await konnectRedeemHandler(nftCardList[selectedProductIndex].minting_voucher, nftCardList[selectedProductIndex].nft_no);
      // setIsClaiming(false);
      if (result2) {
        // 클라이언트 api 요청 방식에서 워커로 변경
        // const claimResult = await axiosAsyncOnChainExportTokenToLazyMintCompleted(account, nftCardList[selectedProductIndex].nft_no)
        // console.log('클레임 결과...', claimResult)
        // if (claimResult.RETCODE === 'REDEEM_SUCCESS') {
        if (true) {

          // loading 모달 제거
          setLoadingModal(false);
          init();
          AntdModal.success({
            title: 'Success',
            content: (
                <div style={{display: 'flex'}}>
                    {/* <p>Finally, you've claimed Goldy NFT</p> */}
                    <Lottie
                      options={lottie_confirm_options}
                      style={{width: '50px', height: '50px', margin: '0px'}}
                      eventListeners={[
                        {
                          eventName: 'complete',
                          callback: () => console.log('lottie end')
                        }
                      ]}
                    />
                    <p style={{'color': '#000000', margin: 'auto auto auto 0px', fontWeight: 'bold'}}>{langmDataChange.revealSuccess}</p>
                </div>
            ),
            onOk() { },
          });
        }
      } else {
        console.log('클레임 에러...');
        setLoadingModal(false);
      }
    } else {
      console.log('에러', isAuthenticated && account && nftCardList[selectedProductIndex].minting_voucher);
    }
  }
  const konnectRedeemHandler = async (voucher, nftNo) => {
    console.log('konnectClaimHandler', voucher)
    console.log('konnectClaimHandler', Object.values(JSON.parse(voucher)))
    const options = {
      abi: KonnectContracts.nftAbi,
      contractAddress: KonnectContracts.nftAddress,
      functionName: "redeem",
      params: {
        redeemer: account,
        voucher: Object.values(JSON.parse(voucher)),  // JSON을 배열로 수정
      },
    }
    console.log('konnectClaimHandler2', JSON.parse(voucher))
    console.log('konnectClaimHandler3', options)

    try {
      const transaction = await Moralis.executeFunction(options);
      const receipt = await transaction.wait();
      console.log('konnectClaimHandler 결과...', receipt);
      // AntdModal.success({
      //     title: 'Transaction Successful',
      //     content: (
      //         <div>
      //             <p>You've claimed Konnect NFT and minted on public chain</p>
      //         </div>
      //     ),
      //     onOk() { },
      // });
      return receipt;
    } catch (err) {
      console.log('konnectClaimHandler 에러...', err);
      
      // 민팅중으로 인해 변경된 원래 데이터의 상태 초기화
      const KonnectNFTOnChain = Moralis.Object.extend("KonnectNFTOnChain");
      const query = new Moralis.Query(KonnectNFTOnChain);
      query.equalTo("mint", 'minting');
      query.equalTo("claimActive", false);
      query.equalTo("nftNo", parseInt(nftNo));
      const result = await query.first();
      console.log(result);
      result.set("mint", 'waiting');
      await result.save();
      // 민팅 체크중인 클래스 데이터 업데이트(워커 계속 작동을 막기 위해)
      const KonnectNFTOnChainMint = Moralis.Object.extend("KonnectNFTOnChainMint");
      const query2 = new Moralis.Query(KonnectNFTOnChainMint);
      query2.equalTo("nftId", parseInt(nftNo));
      query2.equalTo("status", 'waiting');
      query2.equalTo("address", account);
      const result2 = await query2.first();
      console.log(result2);
      result2.set('status', 'cancel');
      await result2.save();


      // 오류시 로딩창 닫기
      setLoadingModal(false);
      AntdModal.error({
          title: 'Transaction Error',
          content: (
              <div>
                  <p>{err.data ? err.data.message : err.message}</p>
              </div>
          ),
          onOk() { },
      });
      return null;
    } finally {
    }
  }

  // 민팅된 카드를 배송 요청할때 burn 처리와 온체인 DB 업데이트 진행
  const startExportTokenClaim = async (deliveryDataObj) => {
    // console.log('에러', isAuthenticated);
    // console.log('에러', account);
    // console.log('에러', nftCardList[selectedProductIndex]);
    if (isAuthenticated && account && nftCardList[selectedProductIndex].minting_active == true && nftCardList[selectedProductIndex].claim_active == false) {
      // 로딩 모달 오픈
      setLoadingModal(true);

      // 카드 정보 nftCardList
      // 선택된 카드 인덱스 selectedProductIndex
      // console.log(nftCardList);
      // console.log(selectedProductIndex);
      // console.log(nftCardList[selectedProductIndex].minting_voucher);
      // console.log(nftCardList[selectedProductIndex].minting_signature);

      // 배송 요청에 대한 주소 등의 데이터 업데이트
      const KonnectNFTOnChain = Moralis.Object.extend("KonnectNFTOnChain");
      const query = new Moralis.Query(KonnectNFTOnChain);
      query.equalTo("mint", 'finished');
      query.equalTo("claimActive", false);
      query.equalTo("nftNo", nftCardList[selectedProductIndex].nft_no);
      const result = await query.first();
      result.set("deliveryDataObj", deliveryDataObj);
      await result.save();

      // 소각 시작 데이터 로그를 남겨서 완료여부 worker가 확인
      const KonnectNFTOnChainBurn = Moralis.Object.extend("KonnectNFTOnChainBurn");
      const konnectNFTOnChainBurnObj = new KonnectNFTOnChainBurn();
      konnectNFTOnChainBurnObj.set("nftId", nftCardList[selectedProductIndex].nft_no)
      konnectNFTOnChainBurnObj.set("address", account)
      konnectNFTOnChainBurnObj.set("status", 'waiting')
      konnectNFTOnChainBurnObj.set("createdTimestamp", new Date().getTime())
      await konnectNFTOnChainBurnObj.save()

      console.log('클레임 시작...', account)
      // setIsClaiming(true);
      const result2 = await konnectBurnHandler(nftCardList[selectedProductIndex].nft_no);
      // setIsClaiming(false);
      if (result2) {
        // 클라이언트 api 요청 방식에서 워커로 변경
        // const claimResult = await axiosAsyncOnChainProductClaimCompleted(account, nftCardList[selectedProductIndex].nft_no)
        // console.log('클레임 결과...', claimResult)
        // if (claimResult.RETCODE === 'ON_CHAIN_CLAIM_COMPLETED') {
        if (true) {

          // loading 모달 제거
          // setLoadingModal(false);
          // init();
          // AntdModal.success({
          //   title: 'Success',
          //   content: (
          //       <div>
          //           {/* <p>Finally, you've claimed Goldy NFT</p> */}
          //           <p style={{'color': '#000000'}}>{langmDataChange.claimedSucc}</p>
          //       </div>
          //   ),
          //   onOk() { },
          // });
          return true
        }
      } else {
        console.log('클레임 에러...');
      }
    } else {
      console.log('에러', isAuthenticated && account && nftCardList[selectedProductIndex].minting_voucher);
    }
  }
  const konnectBurnHandler = async (nftNo) => {
    console.log('konnectBurnHandler', nftNo)
    const options = {
      abi: KonnectContracts.nftAbi,
      contractAddress: KonnectContracts.nftAddress,
      functionName: "burn",
      params: {
        tokenId: nftNo
      },
    }
    console.log('konnectBurnHandler', options)

    try {
      const transaction = await Moralis.executeFunction(options);
      const receipt = await transaction.wait();
      console.log('konnectBurnHandler 결과...', receipt);
      // AntdModal.success({
      //     title: 'Transaction Successful',
      //     content: (
      //         <div>
      //             <p>You've claimed Konnect NFT and minted on public chain</p>
      //         </div>
      //     ),
      //     onOk() { },
      // });
      return receipt;
    } catch (err) {
      console.log('konnectBurnHandler 에러...', err);
      // burn 체크중인 클래스 데이터 업데이트(워커 계속 작동을 막기 위해)
      const KonnectNFTOnChainBurn = Moralis.Object.extend("KonnectNFTOnChainBurn");
      const query = new Moralis.Query(KonnectNFTOnChainBurn);
      query.equalTo("nftId", parseInt(nftNo));
      query.equalTo("status", 'waiting');
      query.equalTo("address", account);
      const result = await query.first();
      console.log(result);
      result.set('status', 'cancel');
      await result.save();
      // 오류시 로딩창 닫기
      setLoadingModal(false);
      AntdModal.error({
          title: 'Transaction Error',
          content: (
              <div>
                  <p>{err.data ? err.data.message : err.message}</p>
              </div>
          ),
          onOk() { },
      });
      return null;
    } finally {
    }
  }

  // 유저 주소에 존재하는 토큰번호를 가져와서 NFT 정보는 온체인 DB에서 호출
  const getOnChainTokenIds = async (account) => {
    console.log('getTokenIds 시작...', account, KonnectContracts.nftAddress, KonnectContracts.nftAbi);

    try {
      // const response = (await Moralis.executeFunction({
      //   contractAddress: KonnectContracts.nftAddress,
      //   abi: KonnectContracts.nftAbi,
      //   functionName: 'getTokenIds',
      //   params: {
      //       _owner: account,
      //   },
      // })).map(el => el.toString())

      let contract = new ethers.Contract(KonnectContracts.nftAddress, KonnectContracts.nftAbi);
      const contractGetTokenIds = await contract.getTokenIds(account);
      console.log("계정에서 소유중인 토큰 조회..." + contractGetTokenIds);

      // console.log(account, "소유 NFT...", response);

      const tokens = [];
      // const promises = response.map(async el => {
      const promises = contractGetTokenIds.map(async el => {
          const KonnectNFTOnChain = Moralis.Object.extend("KonnectNFTOnChain");
          const query = new Moralis.Query(KonnectNFTOnChain);
          query.equalTo("nftNo", parseInt(el));
          // query.equalTo("nftId", el);
          query.equalTo("mint", 'finished');
          // query.equalTo("owner", account);
          const result = await query.first();
          // const result = await query.find();
          console.log(result);

          if (result) {
              console.log('쿼리 결과...', result);
              // const image = result.get("thumbnail");
              // const metadata = result.get("mutableMetadata");
              const userProduct = result.get("userProduct");
              console.log('개별 메타데이터...', userProduct);
              userProduct.minting_active = true;
              // tokens.push(JSON.parse(userProduct));
              tokens.push(userProduct);
          }
      })
      await Promise.all(promises);
      
      return tokens;
    } catch (err) {
        console.log('getTokenIds 에러...', err);
    }
  }

  


  return( 
    
    <div className="Mypage_wrap" >
      <div className="logo_head">
        <img src={logo}></img>
        <p>Konnect</p>
        <div className="korea_mark">
          <img onClick={() => { onChangelanguage('ko');}} src={korea}></img>
          <img onClick={() => { onChangelanguage('en');}} src={US}></img>
        </div>

      </div>
      <div className="Mypage_inner">
        <div className="Mypage_head">
          <Row>
            <Col xs={12} md={5} lg={5} xl={5} xxl={5}>
              <p onClick={() => {console.log(userGrade)}}>MY KONNECT ID</p>
            </Col>
            {/* blockchain */}
            {/* 체인 설정 불가 */}
            <Col xs={6} md={3} lg={3} xl={3} xxl={3} style={{textAlign: '-webkit-right'}}>
              <div style={{maxWidth:'50px',width:'100%',margin:0,padding:0}}>
                {/* <Chains style={{marginRight: 5}}/> */}
              </div>
            </Col>
            <Col xs={6} md={3} lg={3} xl={3} xxl={3} style={{textAlign: '-webkit-right'}}>
              <div style={{margin:0,padding:0}}>
                <Account style={{marginRight: 5}}/>
              </div>
            </Col>
          </Row>
        </div>
       { langmDataChange && <div className="Mypage_profile">
            <div className="profile_img">
                  <img src={profile}></img>
            </div>
            <div className="profile_txt">
                  <p>{langmDataChange.membershipL.replaceAll('<br/>', '\n')}</p>
                  <p>{userGrade}</p>
                  <p><span style={{fontWeight: 'bold'}}>ID</span> : {userId}</p>
                  <p><span style={{fontWeight: 'bold'}}>KCT Staking</span></p>
                  <p>: {userStaKing}</p>
            </div>
        </div> }
        { langmDataChange && 
        <div className="Mypage_profile_btn">
           <div onClick={() => {alert(langmDataChange.Btnready)}}>
              <p>{langmDataChange.EditProfile.replaceAll('<br/>', '\n')}</p>
           </div>
           <div onClick={() => {alert(langmDataChange.Btnready)}}>
             <p>{langmDataChange.EditMyinfo.replaceAll('<br/>', '\n')}</p>
           </div>
        </div> }

        {/* MYSTERY BOX ACCODIAN */}
        <details id="mystery_box_accodian">
        <summary className="mystery_box_head" >
          <p>MYSTERY BOX&nbsp;
            <span style={{
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}>({boxList && boxList.length})</span>
          </p>
            <FiChevronRight style={{marginLeft:"20px",cursor:"pointer"}}  size={34} color="white"
            className="mystery_box_head_arrow"
          ></FiChevronRight>
        </summary> 
         
              <div className="mystery_box_body">
           <Carousel 
             
            itemsToShow={1} 
            showArrows={true} 
            pagination={false}
       
            
            onChange={(currentItem, pageIndex) => {
              // alert(JSON.stringify({ currentItem, pageIndex }))
              console.log(currentItem, pageIndex);
              setSelectedBoxIndex(pageIndex);
            }}
          >
                 {boxList.length > 0 && boxList.map((item, index) => {{
                      return (
                       <MysteryBox
                         key={item.index}
                        //  grade={item.grade}
                        //  brand={item.brand}
                        //  product={item.product}
                        //  nftNo={item.nftNo}
                        //  nftParts={item.nftParts}
                         imgurl={item.mystery_box_index.image}
                        //  cardimgurl={item.cardimgurl}
                       />
                     )
                 }
                 })}
            </Carousel>
          {boxList && boxList.length > 0 && langmDataChange &&
            // 이벤트 기간 제한으로 인해 언박싱 기능 제한
            <div onClick={() => {setYesModal(true);}} 
            // <div onClick={() => {alert(langmDataChange.eventUnboxingTimeOut);}} 
              className="ship_btn"
            >
              <p>{langmDataChange.mysteryboxopen}</p>
              <img src={btn_logo}></img>
            </div>
          }
         </div>
        </details>

{/* NFT CARD ACCODIAN */}

        <details id="nft_card_accodian">
        <summary className="nft_card_head" >
          <p>NFT CARD&nbsp;
            <span style={{
                fontSize: '0.8em',
                fontWeight: 'bold'
              }}>
                {/* 오프체인에서 보낼때 active false 체크하여 민팅안된 데이터만 보내고 온체인에서 보낼때는 active true로 전달하여 구분 */}
                ({nftCardList && nftCardList.length})
              </span>
          </p>
            <FiChevronRight style={{marginLeft:"20px",cursor:"pointer"}}  size={34} color="white"
            className="mystery_box_head_arrow"
          ></FiChevronRight>
        </summary> 
              <div className="nft_card_body">
           <Carousel 
            itemsToShow={1} 
            // itemsToShow={selectedProductIndex} 
            showArrows={true} 
            pagination={false}
            focusOnSelect={true}
            enableMouseSwipe={ViewModalOpen == false ? true : false}
            onChange={(currentItem, pageIndex) => {
              // alert(JSON.stringify({ currentItem, pageIndex }))
              console.log(currentItem, pageIndex);
              setSelectedProductIndex(pageIndex);
            }}
           >
                 {nftCardList.length > 0 && nftCardList.map((item, i) => {{
                  //  const className = checkclaimIndex === i ? "claimcomplte" : "";
                   const className = item.claim_active == true ? "claimcomplte" : "";
                  // minting_active가 false일때만 노출(서버에서 처리로 변경)
                  // if (item.minting_active == false) {
                    console.log(item.claim_active,'item.claim_active')
                    console.log(item.minting_active,'item.minting_active')
                    return (
                      <div key={`nftCardList_${i}`} style={{position:'relative'}}>
                        {/* <div onClick={() => {setviewNFTCard(true);viewCard(item.imgurl,item.cardimgurl,i)}}> */}
                         <NftCardList
                         setviewNFTCard={setViewModalOpen}
                           key={item.index}
                           // grade={item.grade}
                           // brand={item.brand}
                           // product={item.product}
                           // nftNo={item.nftNo}
                           // nftParts={item.nftParts}
                           // imgurl={item.imgurl}
                           // cardimgurl={item.cardimgurl}

                           // grade={item.product_index.nft_grade}
                           // brand={item.product_index.brand}
                           // product={item.product_index.product_name}
                           // imgurl={item.product_index.image_bg}

                           // nft_no가 찍혀있지 않은 상품의 이미지에서 찍힌 이미지로 변경
                           // cardimgurl={item.product_index.image_item}
                           cardimgurl={item.ipfs_image_local_url}

                           className={className}
                           index={i}
                           crindex={checkclaimIndex}
                           checkSubmit={checkSubmit} 
                           // viewCardModal={}
                           // _claimToggle={claimedToggle}
                           // _claimLang={claimLang == 'en' ? 'en' : 'ko'}
                         />
                        {/* </div> */}

                       {/* ko ver 배송 신청 완료 */}
                       {/* {langmChange == 'ko' && checkSubmit.length > 0 && checkSubmit.filter(e => e == i).length > 0 ? */}
                       {/* {langmChange == 'ko' && item.claim_active == true ?
                         <div className="claimSucc"><p className="claimSucctext">클레임<br/> 완료</p></div>
                       :
                         null
                       } */}
                       {/* en ver 배송 신청 완료 */}
                       {/* {langmChange == 'en' && checkSubmit.length > 0 && checkSubmit.filter(e => e == i).length > 0 ? */}
                       {/* {langmChange == 'en' && item.claim_active == true ?
                         <div className="claimSucc"><p className="claimSucctext t1">Claimed</p></div>
                       :
                         null
                       } */}
                        {/* 배송 신청 완료 마크 레이어 */}
                        {item.claim_active == true ?
                          <div className="claimSucc">
                            <p className="claimSucctext t1">{langmDataChange.claimedSucc}</p>
                          </div>
                        :
                          null
                        }
                        {/* 민팅 완료 마크 레이어 */}
                        {item.minting_active == true ?
                          <div className="mintingSucc">
                            <p className="mintingText t1">{langmDataChange.minted}</p>
                          </div>
                        :
                          null
                        }

                       {/* 배송신청완료 / 주소보내기 */}
                       {/* { claimModalOpen == false && checkSubmit.filter(e => e == i).length > 0 ? <div  */}
                       {/* 상품 카드 중 배송이 불가능한 상품(참여자 전원 지급 이벤트 NFT 등)은 배송요청 버튼이 안보이도록 처리(item.product_index.delivery_availability == false) */}
                        { item.product_index.delivery_availability == false ? 
                          null
                        : 
                          claimModalOpen == false && item.claim_active == true ? 
                            <div 
                              className="ship_btn"
                              style={ claimModalOpen ? {zIndex : "-1"} : {zIndex : "1"} } 
                            >
                              <p>{langmDataChange.claimedSucc}</p>
                              <img src={btn_logo}></img>
                            </div> 
                          : 
                            // 기존에는 오프체인도 배송요청이 가능했으나 이후 민팅된 카드만 배송요청이 가능하도록 변경되어 
                            // 알림창을 통해 안내로 수정
                            // <div onClick={() => {setClaimModalOpen(true); console.log(i, 'current'); setCheckSubmitIndex(i); console.log('캐러셀 인덱스 : ', selectedProductIndex, nftCardList[selectedProductIndex]); }} 
                            <div onClick={() => {
                                // 배송 요청 일시적으로 막음
                                // item.minting_active == true ? setClaimModalOpen(true) : alert(langmDataChange.shippingAfterMintingNoti); 
                                alert(langmDataChange.shippingClaimDisableNoti); 
                                console.log(i, 'current'); 
                                setCheckSubmitIndex(i); 
                                console.log('캐러셀 인덱스 : ', selectedProductIndex, nftCardList[selectedProductIndex]); 
                              }} 
                              className="ship_btn"
                            >
                              { langmDataChange &&
                                <p>{langmDataChange.getClaim} &gt;&gt;</p>
                              }
                              <img src={btn_logo}></img>
                            </div>
                        }
                       {/* 리빌 요청 */}
                       {/* lazy minting 요청시와 redeem시(minting_active_waiting으로 관리) */}
                       {/* minting_active == false && minting_active_waiting == false 민팅 요청 필요 */}
                       {/* minting_active == false && minting_active_waiting == true 민팅 redeem 필요 */}
                       {/* 임시로 이벤트 카드는 민팅하지 못하게 처리 */}
                        { revealModalOpen == false && (item.minting_active == true || item.claim_active == true) ? 
                        // { revealModalOpen == false && (item.minting_active == true || item.claim_active == true || item.product_index.nft_grade == "Event") ? 
                          // 민팅 완료 단계시 처리 X
                          null
                        :
                          // 민팅 미진행, redeem 요청 필요 상태
                          item.minting_active_waiting == true ? 
                            <div 
                              className="ship_btn"
                              style={ revealModalOpen ? {zIndex : "-1"} : {zIndex : "1"} }
                              onClick={() => {
                              // redeem 요청
                              startExportTokenRedeem();
                              }}
                            >
                              {/* <p>{langmDataChange.revealSuccess}</p> */}
                              <p>{langmDataChange.takeReveal}</p>
                              <img src={btn_logo}></img>
                            </div> 
                          : 
                            <div onClick={() => {
                              // 모달 오픈에서 바로 호출로 변경
                              // setRevealModalOpen(true);
                              startExportTokenLazing();
                            }} 
                              className="ship_btn"
                            >
                              { langmDataChange &&
                                <p>{langmDataChange.getReveal} &gt;&gt;</p>
                              }
                              <img src={btn_logo}></img>
                            </div>
                          }
                    </div>
                    )
                  // }
                 }
                 })}
            </Carousel>    
         </div>
        </details>
       
    <CenterModal
                isOpen={modalOpen}
                onDismiss={() => setModalOpen(false)}
                contentProps={{style:apllyModalstyle}}
                contentTransition={{
                  from: {  transform: 'translateX(-100%)' },
                  enter: { transform: 'translateX(0)' },
                  leave: {  transform: 'translateX(-100%)' }
                }}
                >
                <div className="shipping_inner">
    <div className="ship_title">
       <p>MysteryBox Open</p>
    </div>
  
    {/* <div className="ship_btn" onClick={() => {setYesModal(true);setModalOpen(false)}}>
       <p >Box Open &gt;&gt;</p>
       <img  src={btn_logo}></img>
    </div> */}

  </div> 
  </CenterModal>
  <CenterModal
    isOpen={yesModal}
    onDismiss={() => setYesModal(false)}
    contentProps={{style:apllyModalstyle}}
    contentTransition={{
      from: {  transform: 'translateX(-100%)' },
      enter: { transform: 'translateX(0)' },
      leave: {  transform: 'translateX(-100%)' }
    }}
    >
      <div className="shipping_inner">
    <div className="ship_title">
       {/* <p>Are you sure you want to open the box?</p> */}
       <p>{langmDataChange && langmDataChange.boxOpenInfo}</p>
    </div>
  <div style={{width:"100%",display:"flex"}}>
    <div className="ship_btn2" onClick={() => {unBoxing();}}>
       <p>{langmDataChange && langmDataChange.yes}</p>
       <img src={btn_logo}></img>
    </div>
    <div className="ship_btn2" onClick={() => { setYesModal(false)}}>
       <p>{langmDataChange && langmDataChange.no}</p>
       <img src={btn_logo}></img>
    </div>
    </div>
  </div> 
  </CenterModal>

  {/* 언박싱 상품 결과 화면 모달 */}
  <CenterModal
    isOpen={completModal}
    onDismiss={() => setCompletModal(false)}
    contentProps={{style:videoModalstyle}}
    contentTransition={{
      from: {  transform: 'translateX(-100%)' },
      enter: { transform: 'translateX(0)' },
      leave: {  transform: 'translateX(-100%)' }
    }}
  >
    <div style={{width:"100%",display:"flex",justifyContent:"center",position:"relative",}}>
      {/* 완전한 상품 이미지로 대체 */}
      {/* <div style={{width:"70%"}}>
        <img style={{width:"100%",}} src={silvers}></img>
      </div>
      <div className="nft_content_Modal">
        <img src={wach}></img>
        <p className="nft_title__Modal">
        PLATINUM
        </p>
        <p  className="nft_txt1_Modal">
          BRAND : CHANEL
        </p>
        <p  className="nft_txt2_Modal">
          PRODUCT : J12 White Phantom
        </p>
        <p  className="nft_txt3_Modal">
          NFT No : E1982
        </p>
        <p  className="nft_txt4_Modal">
          NFT Parts implementation : Yes
        </p>
      </div> */}
      <div style={{width:"70%"}}>
        {/* NFT NO가 없는 api 서버 이미지에서 NO가 등록된 ipfs local image 주소로 변경 */}
        {/* <img style={{width:"100%"}} src={unBoxingProductImageURL == '' ? black_bg : `${appInfo.BACKEND_API_URL}/assets/${unBoxingProductImageURL}`}></img> */}
        <img style={{width:"100%"}} src={unBoxingProductImageURL == '' ? black_bg : `${appInfo.BACKEND_API_URL}/kct/nftImage/${unBoxingProductImageURL}`}></img>
      </div>
    </div> 
    <div className="ship_btn3" onClick={() => {setCompletModal(false)}}>
      <p>{langmDataChange && langmDataChange.complete}</p>
      <img src={btn_logo}></img>
    </div>
  </CenterModal>

  {/* 언박싱 영상 재생 모달 */}
  {videoModal ? 
    <div className='video_modal' style={{display: videoModal ? 'block' : 'none'}}>
        <video onEnded={() => {setVideoModal(false);setCompletModal(true)}} className='video_view' autoPlay="autoplay" muted={false} playsInline>
        {/* <video className='video_view' autoPlay="autoplay" muted={false}> */}
          <source className='video_src' src={video}></source>
        </video>
        {/* 결과 상품 이미지 레이어 */}
        {/* <div style={{
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: 0, 
          right: 0,
          // animation-duration: 2s; animation-delay: 1s;
          animationDelay: 1,
          animationDuration: 2,
          animationName: 'unboxingProduct'
        }}> */}
        <UnboxingProductDiv>
          <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* 완전한 상품 이미지로 대체 */}
            {/* <img style={{height: '50%'}} src={platinum_blank}></img>
            <div style={{width: '16%', height: '50%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto'}}>
              <div style={{height: '100%', textAlign: 'center', paddingTop: 20, paddingBottom: 20}}>
                <img src={wach} style={{height: '55%'}}></img>
                <div style={{height: '22%'}}></div>
                <div style={{height: '23%', lineHeight: '3em', paddingLeft: 27, paddingRight: 27, textAlign: 'left', fontSize: '0.2em'}}>
                  <p style={{margin: 0}}>
                    BRAND : CHANEL
                  </p>
                  <p style={{margin: 0}}>
                    PRODUCT : J12 White Phantom
                  </p>
                  <p style={{margin: 0}}>
                    NFT No : E1982
                  </p>
                  <p style={{margin: 0}}>
                    NFT Parts implementation : Yes
                  </p>
                </div>
              </div>
            </div> */}
            <img style={{height: '50%'}} src={unBoxingProductImageBGURL == '' ? black_blank : `${appInfo.BACKEND_API_URL}/assets/${unBoxingProductImageBGURL}`}></img>

          </div>
          {/* <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img style={{height: '50%'}} src={platinum_blank}></img>
            
          </div> */}
          {/* <div style={{width:"100%", height: '100%', display:"flex",justifyContent:"center",position:"relative"}}>
            <div style={{width:"70%"}}>
              <img style={{width:"100%"}} src={silvers}></img>
            </div>
            <div className="nft_content_Modal">
              <img src={wach}></img>
              <p className="nft_title__Modal">
              PLATINUM
              </p>
              <p  className="nft_txt1_Modal">
                BRAND : CHANEL
              </p>
              <p  className="nft_txt2_Modal">
                PRODUCT : J12 White Phantom
              </p>
              <p  className="nft_txt3_Modal">
                NFT No : E1982
              </p>
              <p  className="nft_txt4_Modal">
                NFT Parts implementation : Yes
              </p>
            </div>
          </div>  */}

        {/* </div> */}
        </UnboxingProductDiv>

      </div>
  : null}

  {/* claimModal en ver */}
  { langmChange == 'en' &&
    <CenterModal
      isOpen={claimModalOpen}
        onDismiss={() => setClaimModalOpen(false)}
        contentProps={{style:apllyModalstyle}}
        contentTransition={{
          from: {  transform: 'translateX(-100%)' },
          enter: { transform: 'translateX(0)' },
          leave: {  transform: 'translateX(-100%)' }
        }}
        >
        <div className="shipping_inner">
    <div className="ship_title">
      { langmDataChange && <p onClick={() => {console.log(langmChange,"값확인")}}>{langmDataChange.shippingAdress}</p>}
    </div>
    <div className="ship_input_container">
      <div className="ship_input_content">
        <div className="ship_input_content1" name="frm">
          <input ref={enShipNameInputRef} placeholder="Full name" type="text" name="name" value={inputName}  onChange={(e) => {_checkinputName(e)}} ></input>
        </div>
      </div>
      <div  className="ship_input_content2">
        <input ref={enShipAddressInputRef} type="text" placeholder="Address line 1" name="addressline1" value={inputAddressLine1}  onChange={(e) => {_checkinputAddressline1(e)}} 
        onClick={() => {}}></input>
      </div>
      <div  className="ship_input_content2">
        <input ref={enShipCityInputRef} type="text" placeholder="City" name="city" value={inputcity}  onChange={(e) => {_checkinputCity(e)}} ></input>
      </div>
      <div  className="ship_input_content2">
        <input ref={enShipZipInputRef} type="text" placeholder="ZIP" name="zip" value={inputZip}  onChange={(e) => {_checkinputZip(e)}} ></input>
      </div>
      <div  className="ship_input_content2">
        {/* 글로벌은 베트남으로 고정 */}
        {/* <input ref={enShipCountryInputRef} type="text" placeholder="Country" name="country" value={inputCountry}  onChange={(e) => {_checkinputCountry(e)}} ></input> */}
        <input ref={enShipCountryInputRef} type="text" placeholder="Country" name="country" value={inputCountry}  onChange={(e) => {_checkinputCountry(e)}} disabled></input>
      </div>
      <div  className="ship_input_content2">
        <input ref={enShipPhoneInputRef} type="text" placeholder="Phone number" name="phonenumber" value={inputPhoneNumber}  onChange={(e) => {_checkinputPhoneNumber(e)}} ></input>
      </div>
    </div>
    <div style={{marginTop: '25px'}}>
      <p style={{color: 'red', margin: 0}}>* In the case of minted products, the card NFT will expire</p>
    </div>
    <div className="ship_btn"
    onClick={() => {
         _checkSumitInputv();
    }}>
       <p >Submit</p>
       <img  src={btn_logo}></img>
    </div>

  </div> 
  </CenterModal>}

  {/* claimModal ko ver */}
  { langmChange == 'ko' &&
    <CenterModal
                isOpen={claimModalOpen}
                onDismiss={() => setClaimModalOpen(false)}
                contentProps={{style:apllyModalstyle}}
                contentTransition={{
                  from: {  transform: 'translateX(-100%)' },
                  enter: { transform: 'translateX(0)' },
                  leave: {  transform: 'translateX(-100%)' }
                }}
                >
                <div className="shipping_inner">
    <div className="ship_title">
       {langmDataChange && <p onClick={() => {console.log(langmChange,"값확인")}}>{langmDataChange.shippingAdress}</p>}
    </div>
    <div className="ship_input_container">
      <div className="ship_input_content">
        <div className="ship_input_content1" name="frm">
          <input ref={koShipNameInputRef} placeholder="이름" type="text" name="nameko" value={inputNameKo}  onChange={(e) => {_checkinputNameKo(e)}} 
          ></input>
        </div>
      </div>
      <div  className="ship_input_content2">
        <input ref={koShipPhoneInputRef} type="text" placeholder="전화번호" name="phonenumberko" value={inputPhonenumberKo}  onChange={(e) => {_checkinputPhoneNumberKo(e)}} ></input>
      </div>
      <div  className="ship_input_content2">
        <input ref={koShipAddressInputRef} type="text" placeholder="주소" name="addressko" value={inputAddressKo}  onChange={(e) => {_checkinputAddressKo(e)}} ></input>
      </div>
      <div  className="ship_input_content2">
        <input ref={koShipAddressMoreInputRef} type="text" placeholder="상세주소" name="addressdetailko" value={inputAddressdetailKo}  onChange={(e) => {_checkinputAddressdetailKo(e)}} ></input>
      </div>
    </div>
    <div style={{marginTop: '25px'}}>
      <p style={{color: 'red', margin: 0}}>* 민팅된 상품의 경우 카드 NFT가 소멸됩니다</p>
    </div>
    <div className="ship_btn"
    onClick={() => {
       _checkSumitInputv();
    }}>
       <p >주소보내기</p>
       <img  src={btn_logo}></img>
    </div>

  </div> 
  </CenterModal>}

  {/* 리빌 요청 모달 */}
  <CenterModal
    isOpen={revealModalOpen}
    onDismiss={() => setRevealModalOpen(false)}
    contentProps={{style:apllyModalstyle}}
    contentTransition={{
      from: {  transform: 'translateX(-100%)' },
      enter: { transform: 'translateX(0)' },
      leave: {  transform: 'translateX(-100%)' }
    }}
  >
    <div className="shipping_inner">
      <div className="ship_title">
        {langmDataChange && <p onClick={() => {console.log(langmChange,"값확인")}}>{langmDataChange.getReveal}</p>}
      </div>
      <div className="ship_input_container">
        <div className="ship_input_content">
          <div className="ship_input_content1" name="frm">
            <input ref={koShipNameInputRef} placeholder="이름" type="text" name="nameko" value={inputNameKo}  onChange={(e) => {_checkinputNameKo(e)}} 
            ></input>
          </div>
        </div>
        <div  className="ship_input_content2">
          <input ref={koShipPhoneInputRef} type="text" placeholder="전화번호" name="phonenumberko" value={inputPhonenumberKo}  onChange={(e) => {_checkinputPhoneNumberKo(e)}} ></input>
        </div>
        <div  className="ship_input_content2">
          <input ref={koShipAddressInputRef} type="text" placeholder="주소" name="addressko" value={inputAddressKo}  onChange={(e) => {_checkinputAddressKo(e)}} ></input>
        </div>
        <div  className="ship_input_content2">
          <input ref={koShipAddressMoreInputRef} type="text" placeholder="상세주소" name="addressdetailko" value={inputAddressdetailKo}  onChange={(e) => {_checkinputAddressdetailKo(e)}} ></input>
        </div>
      </div>
      <div className="ship_btn"
        onClick={() => {
          _checkSumitInputv();
        }}
      >
        <p>{langmDataChange && langmDataChange.getReveal}</p>
        <img src={btn_logo}></img>
      </div>
    </div> 
  </CenterModal>

  {/* 로딩 모달 */}
  <AntdModal
    title="Loading..."
    centered
    visible={loadingModal}
    // onOk={() => setIsMintFinished(false)}
    footer={null}
  >
    <Row>
        <Col md={12} className="text-center">
          <Spin spinning={loadingModal} />
        </Col>
        <Col md={12} className="text-center">
          <p></p>
          <p style={{'color': '#000000', fontWeight: 'bold'}}>{langmDataChange && langmDataChange.loadingTimeDelay}</p>
        </Col>
        {/* <Col md={10}><p>Export NFT to public chain is being processed</p></Col> */}
    </Row>
  </AntdModal>

  {/* 민팅 1차 바우처 생성 안내 모달 */}
  <AntdModal
    title="Complete"
    centered
    visible={voucherModal}
    // onOk={() => setIsMintFinished(false)}
    footer={null}
  >
    <Row>
        {/* <Col md={12} className="text-center">
          <Spin spinning={voucherModal} />
        </Col> */}
        <Col md={12} className="text-center">
          <p></p>
          <p style={{'color': '#000000', fontWeight: 'bold'}}>{langmDataChange && langmDataChange.voucherCreateCall}</p>
        </Col>
        {/* <Col md={10}><p>Export NFT to public chain is being processed</p></Col> */}
        <Col md={12} className="text-center">
          <p></p>
          <Button type="primary"
            onClick={() => {setVoucherModal(false);}}
          >{langmDataChange && langmDataChange.yes}</Button>
        </Col>
    </Row>
  </AntdModal>

        <div className="Duman_container">
            <div>
              <p>DUMAN NFT</p>
              <FiChevronDown style={{marginLeft:"20px"}} size={34} color="white"></FiChevronDown>
            </div>
        </div>
        <div className="konnect_inner">
          <img src={logo}></img>
          <p onClick={() => {console.log(checkSubmit); console.log(checkSubmitIndex);}}>Konnect</p>

        </div>
          <div className="mypage_footer">
              <div className="footer_container">
                <img src={sns7} onClick={() => window.open('https://t.me/KonnectAnnouncements', '_blank')}></img>
                <img src={sns6} onClick={() => window.open('https://twitter.com/KONNECT_KCT', '_blank')}></img>
                <img src={sns3} onClick={() => window.open('https://www.instagram.com/konnectkct/', '_blank')}></img>
                <img src={sns5} onClick={() => window.open('https://medium.com/@KONNECT_KCT', '_blank')}></img>
                <img src={sns4} onClick={() => window.open('https://pf.kakao.com/_yQxcNb', '_blank')}></img>
                <img src={sns2} onClick={() => window.open('https://blog.naver.com/konnect_finance', '_blank')}></img>
                <img src={sns1} onClick={() => {alert(locale().discod)}} ></img>
              </div>
              <div className="footer_txt">
                <p>&copy; Copyright 2022 KCT all rights reserved</p>
              </div>
          </div>
          </div>
    </div>

  )

}
//모달 스타일
const apllyModalstyle = {
  backgroundColor : '#060A12',
  zIndex: "5",
  width: "50%",
}
const videoModalstyle = {
  backgroundColor : '#060A12',
  zIndex: "5",
  width: "70%",
}
const viewModalstyle = {
  backgroundColor : 'transparent',
  zIndex: "5",
  width: "100%",
  padding:'0px',
  border:'0px',
  boxShadow: '0px',
  // maxHeight: 0,
  // maxWidth: 0,
}
export default Mypage;