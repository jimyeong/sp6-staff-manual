
import react from "react";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfew36sDJpZJLCU4dQIG3xnVr9EFqZ_0SOvgSJOr2IiOzQRYQ/viewform";

export default function FeedbackCard() {
  return (
    <a className="sm-form" href={FORM_URL} target="_blank" rel="noopener noreferrer">
      <div className="sm-form-body">
        <p className="sm-form-title">Found this useful?</p>
        <p className="sm-form-text">Takes 10 seconds · Anonymous — I won't know who wrote it</p>
      </div>
      <span className="sm-form-arrow" aria-hidden="true">→</span>
    </a>
  );
}