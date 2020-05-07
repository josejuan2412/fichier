export const renderDownloadView = () => `
<!DOCTYPE html>
<html id="html" class="no-js">
  <head lang="en">
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link
      rel="shortcut icon"
      href="http://docs.themebeans.com/_assets/favicon.ico"
    />
    <link
      rel="apple-touch-icon-precomposed"
      href="http://docs.themebeans.com/_assets/apple-touch-icon.png"
    />
    <title>York Pro WordPress Theme Guide | ThemeBeans</title>
    <style type="text/css">
      body,
      div,
      dl,
      dt,
      dd,
      ul,
      ol,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      pre,
      form,
      fieldset,
      input,
      textarea,
      p,
      blockquote,
      th,
      td {
        margin: 0;
        padding: 0;
      }
      * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      :before,
      :after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      img,
      object,
      embed {
        max-width: 100%;
        height: auto;
      }
      object,
      embed {
        height: 100%;
      }
      img {
        margin: 1.25% 0;
        -ms-interpolation-mode: bicubic;
      }
      html {
        background-color: #f0f1f3;
        padding: 2%;
      }
      body {
        font-size: 16px;
        line-height: 1.6;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        color: #242424;
        max-width: 800px;
        margin: 5% auto;
      }
      body::after {
        clear: both;
        content: "";
        display: table;
      }
      header {
        margin-bottom: 8%;
      }
      footer {
        text-align: center;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h1 a {
        color: #263a48;
        font-weight: 600;
        text-decoration: none;
      }
      h1,
      h2 {
        font-size: 36px;
        padding-bottom: 0.3em;
        margin-bottom: 0.4em;
        border-bottom: 1px solid #eee;
      }
      h2 {
        font-size: 22px;
        padding-bottom: 0.6em;
        margin-bottom: 0.6em;
        margin-top: 2.5em;
      }
      h3 {
        font-size: 18px;
        margin-bottom: 0.3em;
      }
      h1 small a {
        color: #98999c;
        font-size: 15px;
        font-weight: normal;
        float: right;
        position: absolute;
        top: 15px;
        right: 20px;
      }
      section {
        background: #fff;
        margin-bottom: 1%;
        position: relative;
        padding: 6% 8%;
      }
      blockquote {
        border-left: 3px solid #d54e21;
        font-size: 16px;
        padding: 0 0 0 20px;
        color: #d54e21;
      }
      blockquote a {
        color: #d54e21;
        font-weight: 500;
      }
      blockquote code {
        color: #d54e21;
      }
      code,
      cite {
        background-color: #f0f2f4;
        border-radius: 3px;
        color: #000;
        font: inherit;
        padding: 3px 7px 5px;
        white-space: nowrap;
      }
      pre {
        background-color: #f0f2f4;
        clear: both;
        border-radius: 4px;
        display: block;
        font-size: 14px;
        overflow: auto;
        padding: 20px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      pre + img {
        margin-top: 2.4em;
      }
      a {
        color: #1e8cbe;
        text-decoration: underline;
      }
      a:hover {
        color: #d54e21;
      }
      ul {
        list-style: none;
      }
      ol {
        list-style: number;
        margin-left: 20px;
      }
      ol li {
        color: #98999c;
        margin-bottom: 5px;
      }
      ol li:last-child {
        margin-bottom: 0;
      }
      p,
      ul,
      ol,
      blockquote {
        margin-bottom: 4%;
      }
      ul ul {
        padding-top: 0;
        margin-bottom: 0;
        margin-left: 4%;
      }
      ul ul li:before {
        content: "-";
        display: inline-block;
        padding-right: 2%;
      }
      ul.col-2 {
        color: #98999c;
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
        -webkit-column-gap: 20px;
        -moz-column-gap: 20px;
        column-gap: 20px;
      }
      @media only screen and (min-width: 500px) {
        ul.col-2 {
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
          -webkit-column-gap: 20px;
          -moz-column-gap: 20px;
          column-gap: 20px;
        }
      }
      nav {
        background: #f0f1f3;
        min-width: 215px;
        margin-bottom: 5px;
        margin-top: 15px;
      }
      nav:first-of-type a {
        color: #d54e21;
        border-radius: 0;
      }
      nav:first-of-type a:hover {
        color: #d54e21;
      }
      nav:first-of-type a:before {
        background-color: #d54e21;
      }
      nav.affix {
        position: fixed;
        top: 20px;
      }
      nav.affix-bottom {
        position: absolute;
      }
      nav a {
        border-radius: 3px;
        font-size: 15px;
        display: block;
        cursor: pointer;
        font-weight: 500;
        position: relative;
        text-decoration: none;
        padding: 10px 12px;
        width: 100%;
        padding-right: 3px;
        border-bottom: 2px solid #fff;
      }
      nav a:before {
        content: "";
        width: 4px;
        display: block;
        left: 0;
        position: absolute;
        height: 100%;
        display: none;
        background: #1e8cbe;
        top: 0;
      }
      nav a:hover {
        background-color: #e6e8ea;
        color: #1e8cbe;
        text-decoration: underline;
      }
      nav a:hover:before {
        display: block;
      }
      nav a:last-of-type {
        border-bottom: none;
      }
      .gist {
        margin-top: 5.1%;
        margin-bottom: 5%;
      }
      @media only screen and (max-width: 1050px) {
        body {
          margin: 0 auto;
        }
      }
      @media only screen and (max-width: 767px) {
        header span {
          display: none;
        }
        h1 {
          font-size: 26px;
        }
        h2 {
          font-size: 20px;
        }
      }
      @media only screen and (max-width: 514px) {
        p,
        ul,
        ol,
        blockquote {
          margin-bottom: 8%;
        }
      }
    </style>
  </head>

  <body>
    <section id="Menu">
      <header>
        <h1>FICHIER</h1>
        <p>Archivos y carpetas disponibles para descarga.</p>
      </header>

      <nav>
        <a href="https://21d4a4e4.ngrok.io/download/img.png" target="blank">img.png</a>
      </nav>
      <nav>
        <a href="#GettingStarted">Carpeta 1</a>

        <a href="#Navigation">Carpeta 2</a>
      </nav>
    </section>
  </body>
</html>

`;
