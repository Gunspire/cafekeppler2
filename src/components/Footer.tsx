import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <span className="footer__logo">Keppler</span>
          <p>© {new Date().getFullYear()} Café Keppler</p>
        </div>
        <div className="footer__col">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="mailto:info@cafekeppler.nl">Email</a>
        </div>
      </div>
    </footer>
  );
}
