
export default function Footer() {
  return (
    <footer className="sm-footer">
      <div className="sm-contact">
        <div className="sm-contact-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
            <path d="M9 10h6M9 13.5h4" />
          </svg>
        </div>
        <div className="sm-contact-body">
          <p className="sm-contact-title">Stuck, or spotted a mistake?</p>
          <p className="sm-contact-text">
            Message <strong>Jimmy</strong> on WhatsApp — questions, fixes, and
            ideas for new guides are all welcome.
          </p>
          <p className="sm-contact-hint">
            Tip: mention the topic and step, e.g. <span>Refund: Card · 11/11</span>
          </p>
        </div>
      </div>
      <p className="sm-footer-note">Ask anytime — everyone started somewhere.</p>
    </footer>
  );
}