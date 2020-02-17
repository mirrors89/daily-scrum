import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)


const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div style={{textAlign: "center"}}>
        <div style={{marginBottom: "8px"}}>
          © (주)식스샵 ALL RIGHTS RESERVED.
        </div>
        <a style={{marginRight: "10px"}} href="https://github.com/mirrors89/daily-scrum" target="_blank">
        <FontAwesomeIcon icon={["fab", "github"]} size="2x"/>
        </a>
        <a style={{marginRight: "10px"}} href="https://sixshop.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=SS2" target="_blank">
        <FontAwesomeIcon icon={["fab", "jira"]} size="2x"/>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;