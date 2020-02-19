import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>
      <a class="" href="/">???</a>
    </h1>
    <nav>
     <div class="container-fluid">
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
        <li class="active"><a href="#">모두 보기</a></li>
        <li><a href="#">1) 어제까지 한 일</a></li>
        <li><a href="#">2) 오늘 할 일</a></li>
        <li><a href="#">3) 일정 내 못 마칠 것 같은 일</a></li>
        <li><a href="#">내 스크럼 작성하기</a></li>
        </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;