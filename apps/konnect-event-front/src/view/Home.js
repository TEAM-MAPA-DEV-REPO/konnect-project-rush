import React, { useEffect, useState } from "react";
import { CarouselItem, Carousel } from "react-bootstrap";
import { CenterModal } from "react-spring-modal";
import { NavLink, useHistory } from "react-router-dom"
import topLogo from "../assets/logo.png";
import topLogomini from "../assets/logom.png"
import whitelistBox from "../assets/main1.jpg"
import topbg from '../assets/topbg.png';
import mysteryBox from "../assets/mysterybox.png";
import mysteryBoxmini from '../assets/main2.png'
import B_Btn from "../assets/m_btn.png";
import middlebg from "../assets/middlebg.png"
import meta from "../assets/meta.png"
import slideimg1 from '../assets/slide2.png'
import slideimg2 from '../assets/slide1.png'
import slideimg3 from '../assets/slide4.png'
import slideimg4 from '../assets/slide3.png'
import mail from '../assets/snsn7.png';
import twitter from '../assets/snsn6.png'
import insta from '../assets/sns3.png';
import logoM from '../assets/sns5.png';
import kakao from '../assets/sns4.png';
import naver from '../assets/sns2.png';
import discord from '../assets/sns1.png';
import korea from '../assets/korean_flag.png';
import US from '../assets/american_flag.png';
import Countdown from "../components/countdown";
import Init from "../language";
import axios from "axios";

import "react-spring-modal/styles.css"

import moment from 'moment-timezone';
import momentOrigin from 'moment';
import { Modal as AntdModal, Spin} from 'antd';
import { Container, Row, Col } from "react-bootstrap";

// blockchain
import { useMoralis, useMoralisQuery, useMoralisSubscription } from "react-moralis";
import { isMobile } from 'react-device-detect';
// 리코일 상태값
import { wallet } from "../recoil-states/user-state" // states
import { useRecoilState } from 'recoil';
import { axiosCheckWhitelist } from "../hooks/axiosCheckWhitelist";

const Home = () => {

  const history = useHistory();
  // blockchain
  const { Moralis, authenticate, isAuthenticated, user, account, logout, enableWeb3 } = useMoralis();
  const [userWallet, setUserWallet] = useRecoilState(wallet);
  const [loadingModal, setLoadingModal] = useState(false);
  const openMetamask = async () => {
    // web3 임포트 검사 신버전(PC버전도 월렛커넥트 기반으로 진행)
    // if (!isAuthenticated || !account) {
      // alert(`${langDataChange.notInstallMetamask}`);
    // } else {
      // const web3 = Moralis.web3;
      let walletAuth;
      if (isMobile) {
        try {
          walletAuth = await authenticate({ 
            signingMessage: "KONNECT Authentication", 
            provider: "walletconnect", 
            // mobileLinks: [
              // "metamask",
              // "rainbow",
              // "argent",
              // "trust",
              // "imtoken",
            // ]  
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          // 월렛 설치 확인용
          const web3 = await Moralis.enableWeb3();

          walletAuth = await authenticate({
            signingMessage: "KONNECT Authentication"
          })
        } catch (error) {
          console.log('wallet error : ', error);
          alert(`${langDataChange.notInstallMetamask}`);
        }
      }
      setUserWallet(account);
      console.log("메타마스크 오픈 클릭!", window.web3, walletAuth, isAuthenticated, user, account)
      console.log("로그인 성공", user)
    // }
      
      // web3 임포트 검사 구버전
      // if (window.web3 == undefined) {
      //   alert(`${langDataChange.notInstallMetamask}`);
      // }

      // const ethBalance = await web3.getBalance(account);
      // const kolBalance = await Moralis.executeFunction({
      //     contractAddress: KollectContracts.kolAddress,
      //     abi: KollectContracts.kolAbi,
      //     functionName: "balanceOf",
      //     params: {
      //         account: account
      //     }
      // })
      // close();
  }
  const _myPageRoute = () => {
    // const location = {
    //   pathname: '/Mypage',
    //   state: {}
    // }
    // history.push('/Mypage')
    history.push({
      pathname: '/Mypage'
    });
  }
  useEffect(() => {
    // logout();
    console.log(history);
    // 임시 점검
    // alert('가상과 현실을 잇-다, 커넥트(Konnect) 입니다. 현재 미스터리 박스 오픈과 민팅 최종 작업이 반영 중입니다. 사이트 접속량이 많아 잠시 지연된 점 양해부탁드리며, 안정적인 마무리 후 [KST 22시]에 박스개봉이 가능하실 예정입니다. 오래 기다려주신 Konnect 유저분들 조금만 더 기다려주시면 감사하겠습니다.\n\nConnect virtual and reality, Hi, this is Konnect. Currently, we are working on finalizing mystery box opening and minting. We apologize for the delay due to the high traffic, and we plan to open the box at [KST 22:00] after a stable finish. To all Konnect users who have been waiting for a long time, It’s really close, hang on with us for just a bit longer!');
  }, [])
  useEffect(() => {
    console.log('useMoralis 업데이트!', isAuthenticated, account, user);
  }, [isAuthenticated, account, user])

  const _setWhiteListSucc = async() => {
    console.log('_setWhiteListSucc');
    try {
      let setWhiteList = await axios.post('https://kct-backend.team-mapa.com/kct/add_whitelist', 
      {
        email: whiteListCheckEmail,
        // 기존 소문자 형식 체크에서 대문자가 들어와도 소문자로 변경
        // walletAddress: whiteListCheckWallet
        walletAddress: whiteListCheckWallet.toLowerCase()
      },
      {
        headers: {
          "Content-Type" : 'application/json',
        }
      })
      // console.log(setWhiteList.data);

      // 미완료일때(case 3)
      if(setWhiteList.data.RETCODE === 'EMAIL_EXISTED' ){
        alert(`${langDataChange.duplicateEmail}`); setisVisible(true);
      } else if( setWhiteList.data.RETCODE === 'WALLETADDRESS_EXISTED' ){
        alert(`${langDataChange.duplicateWallet}`); setisVisible(true);
      } else if( setWhiteList.data.RETCODE === 'IP_EXISTED' ){
        alert(`${langDataChange.duplicateIp}`); setisVisible(true);
      } else if ( setWhiteList.data.RETCODE === 'ADD_WHITELIST') {
        alert(`${langDataChange.sendSucc}`); setisVisible(!isVisible);
      } else if ( setWhiteList.data.RETCODE === 'TIMEOUT') {
        alert(`${langDataChange.timeOut}`); setisVisible(!isVisible);
      } else { 
        alert(`${langDataChange.sendFail}`); setisVisible(true);
      }
    } catch (error) {
      // 오류일때
      console.log(error);
      alert(`${langDataChange.sendFail}`); setisVisible(true);
    }
  }


  // 미스테리박스 받기시 화이트리스트에 해당되는가? 박스를 받았는가? 처리해주는 통신과 알림
  const _checkWhiteListUsers = async () => {
    if (!isAuthenticated || !account) {
      alert(langDataChange.plzLogin);
    } else {
      setLoadingModal(true);
      // console.log(account);
      const result = await axiosCheckWhitelist(account);
      // console.log(result);
      if(result.RETCODE === 'LIST_NOT_EXISTED') {
        alert(langDataChange.notWhiteListUser); 
      } else if(result.RETCODE === 'PAYMENT_COMPLETED') {
        alert(langDataChange.whiteListUserNoHaveBox); 
      } else if(result.RETCODE === 'DUPLICATE_PAYMENT_REQUEST') {
        alert(langDataChange.whiteListUserHaveBox); 
      }
      setLoadingModal(false);
    }
    // try {
    //   console.log('whiteListUser');
    //   let whiteListUser = await axios.post('https://kct-backend.team-mapa.com/kct/check_whitelist', 
    //   {
    //     // 기존 소문자 형식 체크에서 대문자가 들어와도 소문자로 변경
    //     // walletAddress: whiteListCheckWallet
    //     walletAddress: whiteListCheckWallet.toLowerCase()
    //   },
    //   {
    //     headers: {
    //       "Content-Type" : 'application/json',
    //     }
    //   })

    //   if(whiteListUser.data.RETCODE === 'LIST_NOT_EXISTED' ){
    //     alert(`${langDataChange.notWhiteListUser}`); 
    //   } else if( whiteListUser.data.RETCODE === 'PAYMENT_COMPLETED' ){
    //     alert(`${langDataChange.whiteListUserNoHaveBox}`); 
    //   } else if( whiteListUser.data.RETCODE === 'DUPLICATE_PAYMENT_REQUEST' ){
    //     alert(`${langDataChange.whiteListUserHaveBox}`); 
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }



  //모달 오픈 ON/OFF
  const [isVisible, setisVisible] = useState(false);
  //언어 변경 변수  en/ko
  const [langChange, setlangChange] = useState("en");
  //언어 담겨있는 변수
  const [langDataChange, setLangDataChange] = useState();
  // Whitelist 중복 체크 변수 
  const [whiteListCheckEmail, setWhiteListCheckEmail] = useState('');
  const [whiteListCheckWallet, setWhiteListCheckWallet] = useState('');
  const [whiteListCheckIp, setWhiteListCheckIp] = useState();
  // 임시


  // 시간제한

  // let startTime = new Date('2022/04/24 12:00:00').getTime();
  let startTime = new Date('2022/04/26 12:00:00 PM').getTime();
  let now = new Date().getTime();
  // let utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
  // let KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  // let kr_now = new Date(utc + (KR_TIME_DIFF));
  // let realDeadLine = new Date('2022/04/27 00:00:00').getTime();
  let realDeadLine = new Date('2022/04/29 00:00:00').getTime();

  // 기존 시간대를 UTC 기준으로 변경
  now = (momentOrigin().utc().unix() + (9 * 60 * 60)) * 1000;
  startTime = moment.tz("2022/04/26 12:00:00", "UTC").unix() * 1000;
  realDeadLine = moment.tz("2022/04/29 00:00:00", "UTC").unix() * 1000;

  // console.log(startTime,'startTime');
  // console.log(now,'now');
  // console.log(kr_now,"krnow")
  // console.log(utc,"utc");
  // console.log(kr_now,"kr_now")
  // console.log(realDeadLine,'Deadline');
  // console.log(new Date().toUTCString(),'utc');

  //모달 오픈 함수
  const _onClick = () => {
    // if (startTime >= now ) {
    //   alert(`${langDataChange.timeOver}`);
    // } else if(now < realDeadLine){
    //   setisVisible(!isVisible);
    // }

    if (startTime < now && now < realDeadLine ) {
      setisVisible(!isVisible);
    } else if (startTime > now) {
      // 이벤트 시작전
      alert(`${langDataChange.timeOut}`);
    } else if (realDeadLine < now) {
      // 이벤트 시작후
      alert(`${langDataChange.timeOver}`);
    }
  }
  //언어 변경 함수
  const onChangelanguage = (lang) => {
    setlangChange(lang);
    localStorage.setItem('locale', lang);
    const textData = Init(lang);
    setLangDataChange(textData);

  };

  // 래플 신청 중복 검사 
  const _checkEmail = (e) => {
    setWhiteListCheckEmail(e.target.value);
  }

  const _checkWalletAddress = (e) => {
    setWhiteListCheckWallet(e.target.value);
  }

  const _checkRaffleInput = (e) => {
    // console.log(whiteListCheckEmail,whiteListCheckWallet, langChange, 'email wallet langChange');
    let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let lowercase = /^[a-z]+$/;
    let replaceLowercase = whiteListCheckWallet.replace(/[0-9]/g, "").trim()
    let lowercaseCheck = lowercase.test(replaceLowercase);

    // 한/영 구분하여 변수 활용
    // 조건중에 하나라도 없으면 얼럿
    if (langChange === 'en') {
      if (check.test(whiteListCheckEmail.trim()) == false) {
        alert(`${langDataChange.notvalidEmail}`)
      } else if (whiteListCheckEmail.trim() === '') {
        alert(`${langDataChange.emptyEmail}`)
      } else if (!/^(0x)?[0-9a-f]{40}$/i.test(whiteListCheckWallet.trim()) == true) {
        alert(`${langDataChange.notvalidWallet}`)
      } else if (whiteListCheckWallet.trim() === '') {
        alert(`${langDataChange.emptyWallet}`)
      // 기존 소문자 형식 체크에서 대문자가 들어와도 소문자로 변경
      // } else if (!lowercaseCheck) {
      //   alert('Please wirte lowercase');
      } else {
        // 정상 로직 작동
        _setWhiteListSucc()
      }

    } else if (langChange === 'ko') {
      if (check.test(whiteListCheckEmail.trim()) == false) {
        alert(`${langDataChange.emptyEmail}`)
      } else if (whiteListCheckEmail.trim() === '') {
        alert(`${langDataChange.notvalidEmail}`)
      } else if ((!/^(0x)?[0-9a-f]{40}$/i.test(whiteListCheckWallet.trim())) == true) {
        alert(`${langDataChange.emptyWallet}`)
      } else if (whiteListCheckWallet.trim() === '') {
        alert(`${langDataChange.notvalidWallet}`)
      // 기존 소문자 형식 체크에서 대문자가 들어와도 소문자로 변경
      // } else if (!lowercaseCheck) {
      //   alert('소문자로 입력해주세요');
      } else {
        // 정상 로직 작동
        _setWhiteListSucc()
      }
    } else {
      console.log('ERORR !')
    }
  }


  const _onKeyPress = (e) => {
    if(e.key == 'Enter'){
      _checkRaffleInput()
    }
  }

  //언어 데이터 순서 관리 
  useEffect(() => {
    let localeLang = localStorage.getItem('locale');
    if (localeLang == null) {
      localStorage.setItem('locale', 'en');
      localeLang = 'en';
    }

    const textData = Init(localeLang);
    setLangDataChange(textData);

  },
    [langChange]); 



  return (
    <div className="Home_main_wrap">
      {langDataChange && <div className="Home_main_wrap_container">
        <img src={topbg} width={'100%'} style={{position:'absolute',top:'-80px',left:0}} />
        <div className="Home_changelang">
          <img src={korea} className="Home_korea"
            onClick={() => {
              onChangelanguage('ko');
            }} />
          <img src={US} className="Home_us"
            onClick={() => {
              onChangelanguage('en');
            }} />
        </div>
        <div className="Home_main_wrap_inner">
          {/* 첫번째 영역 */}
          <div className="Home_konnet_world">
            <img  src={topLogo} style={{ width: "15%" }} />
            {/* <img src={topbg} style={{width:"100%", position:"absolute", top:"0"}}/> */}
            <div className="Home_world_header">
              <h1>KONNECT WORLD</h1>
              <h2>NFT MARKETPLACE</h2>
            </div>
            <div className="Home_world_info">
              <p>
                {langDataChange.worldInfo.replaceAll('<br/>', '\n')}
              </p>
            </div>
            {/* blockchain */}
            {/* <NavLink to="" onClick={()=>{alert(`${langDataChange.discod}`)}} style={{ textDecoration: "none", display: "contents" }}> */}
            {/* <NavLink to="/" onClick={()=>{!isAuthenticated ? openMetamask() : _myPageRoute()}} style={{ textDecoration: "none", display: "contents" }}> */}
            {/* 임시 점검 */}
            <div onClick={()=>{!isAuthenticated || !account ? openMetamask() : _myPageRoute()}} style={{ textDecoration: "none", display: "contents" }}>
            {/* <div onClick={()=>{alert('가상과 현실을 잇-다, 커넥트(Konnect) 입니다. 현재 미스터리 박스 오픈과 민팅 최종 작업이 반영 중입니다. 사이트 접속량이 많아 잠시 지연된 점 양해부탁드리며, 안정적인 마무리 후 [KST 22시]에 박스개봉이 가능하실 예정입니다. 오래 기다려주신 Konnect 유저분들 조금만 더 기다려주시면 감사하겠습니다.\n\nConnect virtual and reality, Hi, this is Konnect. Currently, we are working on finalizing mystery box opening and minting. We apologize for the delay due to the high traffic, and we plan to open the box at [KST 22:00] after a stable finish. To all Konnect users who have been waiting for a long time, It’s really close, hang on with us for just a bit longer!');}} style={{ textDecoration: "none", display: "contents" }}> */}
              <div className="Home_metamask_btn_box">
                <div className="Home_metamask_btn">
                  {/* blockchain */}
                  {/* <p className="Home_metamask_btn_text">
                    {langDataChange.metamaskBtn} &#62;&#62;
                    <span className="Home_metamask_metalogo"><img src={meta} /></span>
                  </p> */}
                  {isAuthenticated && account ? 
                    <p className="Home_metamask_btn_text">
                      {langDataChange.myPage} &#62;&#62;
                      <span className="Home_metamask_metalogo"><img src={meta} /></span>
                    </p>
                  :
                    <p className="Home_metamask_btn_text">
                      {langDataChange.metamaskBtn} &#62;&#62;
                      <span className="Home_metamask_metalogo"><img src={meta} /></span>
                    </p>
                  }
                </div>
              </div>
            </div>
            {/* <div className="Home_whitelist_btn_Box" onClick={()=>{alert(`${langDataChange.discod}`)}}> */}
            {isAuthenticated && account ? 
            <>
              {/* 참여기념 NFT 받기 */}
              <div className="Home_whitelist_btn_Box" onClick={()=>{alert(langDataChange.eventNFTReceiveTimeOut);}}>
                <p className="Home_whitelist_btn_text" href=" ">
                  {langDataChange.eventNFTReceive}</p>
              </div>
              {/* 미스터리 박스 받기 상단 */}
              <div className="Home_whitelist_btn_Box" style={{marginTop: 0, marginBottom: 0}} onClick={()=>{_checkWhiteListUsers()}}>
                <p className="Home_whitelist_btn_text" href=" ">
                  {langDataChange.mysteryboxbtntxt}</p>
              </div>
            </>
            : null
            }
            <div className="Home_metamask_infotext">
              {langDataChange.metamaskinfo.replaceAll('<br/>', '\n')}
            </div>
          </div>

          {/* 두번째 영역 */}
          <div className="Home_mysteryBox">
            <img src={middlebg} className="Home_sub_bg" />
            <div className="Home_mysteryBox_header">
              <h3>MYSTERY BOX NFT</h3>
              <h1>"AIR DROP"</h1>
              <p>{langDataChange.airdropday}</p>
            </div>
            <div className="Home_mysteryBox_countdown">
              <Countdown />
            </div>
          </div>

          {/* 세번째 영역 */}
          <div className="Home_freegift">
            <div className="Home_freegift_left">
              <img src={mysteryBoxmini} />
            </div>
            <div className="Home_freegift_right">
              <h3>{langDataChange.thousandpeople}</h3>
              <p>{langDataChange.whitelistpeople}</p>
              <p>{langDataChange.rafflepeople}</p>
              <p>{langDataChange.raffleday}<br />
                {langDataChange.raffleday2}</p>
            </div>
          </div>

          {/* 네번째 영역 */}
          <div className="Home_Raffle_Box">

            <h3>{langDataChange.nftGiftheader}</h3>
            <div className="Home_Raffle_box_inner">
              <p>
                {langDataChange.nftGiftinfo.replaceAll('<br />', ' \n')} :&#41;
              </p>
            </div>
            <div className="Home_Raffle_Btn_Box" onClick={() => { _onClick(); }}>
              <p className="Home_Raffle_Btn_Text">
                {langDataChange.nftRaffle} &#62;&#62;
                <span className="Home_Raffle_Btn_logo"><img src={topLogomini} /></span>
              </p>
            </div>
          </div>
          <CenterModal
            isOpen={isVisible}
            onDismiss={() => setisVisible(false)}
            contentProps={{ style: apllyModalstyle }}
            contentTransition={{
              from: { transform: 'translateX(-100%)' },
              enter: { transform: 'translateX(0)' },
              leave: { transform: 'translateX(-100%)' }
            }}
          >

            <div className="Home_rafflemodal">
              <div className="Home_rafflemodal_header">
                <span onClick={() => { setisVisible(false) }} style={{ cursor: "pointer" }}>X</span>
                <p> {langDataChange.modalRaffle}</p>
              </div>
              <div className="Home_rafflemodal_email">
                <p>{langDataChange.modalEmail}</p>
                <input type="text" placeholder="" name="email" value={whiteListCheckEmail} onChange={_checkEmail} onKeyPress={_onKeyPress}></input>
              </div>
              <div className="Home_rafflemodal_wattle">
                <p>{langDataChange.modalWallet.replaceAll('<br/>', '\n')}</p>
                <input type="text" placeholder="" name="walletaddress" value={whiteListCheckWallet} onChange={_checkWalletAddress} onKeyPress={_onKeyPress}></input>
              </div>
              <div className="Home_rafflemodal_btn" onClick={() => { _checkRaffleInput() }}>
                <p>{langDataChange.modalgo}</p>
              </div>
            </div>
          </CenterModal>

          {/* 다섯번째 영역 */}
          <div className="Home_story">
            <div className="Home_story_inner">
              <h2>KONNECT STORY</h2>
              <Carousel
                touch={true}
              >
                <CarouselItem>
                  <img src={slideimg1} className="d-block w-100"></img>
                  <div>
                    <h2 className="Home_carouse_h2">{langDataChange.konnectslidehead1}</h2>
                    
                    {langDataChange && <p className="Home_carouse_p">
                      {langDataChange.konnectslidecontent1.replaceAll('<br />', '\n')}
                    </p>}
                  </div>

                </CarouselItem>
                <CarouselItem>
                  <img src={slideimg2} className="d-block w-100"></img>
                  <div>
                    <h2 className="Home_carouse_h2">{langDataChange.konnectslidehead2}</h2>
                    {langDataChange && <p className="Home_carouse_p">
                    {langDataChange.konnectslidecontent2.replaceAll('<br />', '\n')}
                    </p>}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <img src={slideimg3} className="d-block w-100"></img>
                  <div>
                    <h2 className="Home_carouse_h2">{langDataChange.konnectslidehead3}</h2>
                    {langDataChange &&<p className="Home_carouse_p">
                      {langDataChange.konnectslidecontent3.replaceAll('<br />', '\n')}
                    </p>}
                  </div>

                </CarouselItem>
                <CarouselItem>
                  <img src={slideimg4} className="d-block w-100"></img>
                  <div>
                    <h2 className="Home_carouse_h2">{langDataChange.konnectslidehead4}</h2>
                    {langDataChange && <p className="Home_carouse_p">
                      {langDataChange.konnectslidecontent4.replaceAll('<br />', '\n')}
                    </p>}
                  </div>
                </CarouselItem>
              </Carousel>
              <div className="Home_connectworld_text">
                <p>
                  {langDataChange.konnectswipe}<br />
                  {langDataChange.konnectswipe2}

                </p>
              </div>
            </div>
          </div>

          {/* 여섯번째 영역 */}
          <div className="Home_whitelist">
            <h1>
              MYSTERY BOX NFT <br /> WHITELIST
            </h1>
            <div className="Home_whitelist_Box">
              <img src={whitelistBox} className="Home_whitelist_img" />
            </div>
            <div className="Home_whitelist_textBox">
              <p>
                {langDataChange.mysteryboxcontent}<br />
                {langDataChange.mysteryboxcontent2}
              </p>
            </div>
            {/* <div className="Home_whitelist_btn_Box" onClick={()=>{alert(`${langDataChange.discod}`)}}> */}
            <div className="Home_whitelist_btn_Box" onClick={()=>{_checkWhiteListUsers()}}>
              <p className="Home_whitelist_btn_text" href=" ">
                {langDataChange.mysteryboxbtntxt}</p>
            </div>
          </div>

          {/* 일곱번째 영역 */}
          <div className="Home_NFTraffle">
            <h1>
              MYSTERY BOX NFT <br /> RAFFLE
            </h1>
            <div className="Home_NFTraffle_mysterybox">
              <img src={mysteryBox} className="Home_NFTraffle_mysterybox_img" />
            </div>
            <div className="Home_NFTraffle_text">
              <p>
                {langDataChange.rafflecontent} <br />
                {langDataChange.rafflecontent1} <br />
                {langDataChange.rafflecontent2}
              </p>
            </div>
            <div className="Home_NFTraffle_btn_Box" onClick={() => {
              _onClick()
            }}>
              <img src={B_Btn} className="Home_NFTraffle_btn" />
              {isVisible == true ?
                <div className="Home_NFTraffle_btn_text" style={{ zIndex: "-1" }}>
                  <p>{langDataChange.rafflebtntxt}</p>
                </div> : <div className="Home_NFTraffle_btn_text">
                  <p>{langDataChange.rafflebtntxt}</p>
                </div>
              }
            </div>
          </div>

          {/* 푸터 */}
          <footer className="Home_footer">
            <div className="Home_footer_top">
              <img src={topLogo} className="Home_footer_logo" />
              <p> Konnect </p>
            </div>
            <div className="Home_footer_bottom">
              <ul>
                <li>
                  <img onClick={() => window.open('https://t.me/KonnectAnnouncements', '_blank')} src={mail} />
                </li>
                <li>
                  <img onClick={() => window.open('https://twitter.com/KONNECT_KCT', '_blank')} src={twitter} />
                </li>
                <li>
                  <img onClick={() => window.open('https://www.instagram.com/konnectkct/', '_blank')} src={insta} />
                </li>
                <li>
                  <img onClick={() => window.open('https://medium.com/@KONNECT_KCT', '_blank')} src={logoM} />
                </li>
                <li>
                  <img onClick={() => window.open('https://pf.kakao.com/_yQxcNb', '_blank')} src={kakao} />
                </li>
                <li>
                  <img onClick={() => window.open('https://blog.naver.com/konnect_finance', '_blank')} src={naver} />
                </li>
                <li>
                  <img onClick={() => { alert(langDataChange.discod) }} src={discord} />
                </li>
              </ul>
            </div>
            <p> &#169; Copyright 2022 KCT all rights reserved</p>
          </footer>

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
                  <p style={{'color': '#000000', fontWeight: 'bold'}}>{langDataChange && langDataChange.loadingTimeDelay}</p>
                </Col>
                {/* <Col md={10}><p>Export NFT to public chain is being processed</p></Col> */}
            </Row>
          </AntdModal>

          {/* Home_main_wrap_inner */}
        </div>
        {/* Home_main_wrap_container */}
      </div>}
      {/* Home_main_wrap */}
    </div>
  );
};
//모달 스타일
const apllyModalstyle = {
  backgroundColor: '#060A12',
  zIndex: "5",
  width: "50%",
}

export default Home;
