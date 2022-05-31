import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './css/Home.css';
import './css/Mypage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./view/Home";
import Mypage from "./view/Mypage";

// blockchain
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    // blockchain
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
            <Route exact={true} component={Home} path="/"/>
            <Route exact={true} component={Mypage} path="/Mypage"/>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
