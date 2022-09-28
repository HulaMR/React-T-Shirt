function Footer() {
    return (
        <footer className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <div className="contacts">
            <h3 className="mb-5">Контакти</h3>
            <p>+38(099)-708-42-14</p>
            <p>+38(050)-883-10-25</p>
          </div>
        </div>

        <ul className="d-flex pos-r">
          <li>
            <a href="https://t.me/Hy_He" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-telegram "></i>
            </a>
          </li>
          <li>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-tiktok"></i></a>
          </li>
          <li>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
        
      </footer>    
    );
}

export default Footer;