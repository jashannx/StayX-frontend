import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <strong>StayX</strong>
          <span>&copy; 2026 StayX Private Limited</span>
        </div>

        <div className="footer-socials">
          <a href="/" aria-label="Facebook">
            <i className="fa-brands fa-square-facebook"></i>
          </a>
          <a href="/" aria-label="Instagram">
            <i className="fa-brands fa-square-instagram"></i>
          </a>
          <a href="/" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        <div className="footer-links">
          <a className="footer-link" href="/">Privacy</a>
          <a className="footer-link" href="/">Terms</a>
          <a className="footer-link" href="/">Support</a>
        </div>
      </div>
    </footer>
  );
}
