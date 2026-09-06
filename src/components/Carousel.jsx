import React, {useState} from "react"
import MockScreen from "./MockScreen";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ACCENT } from "../constants/constants";
import FlexibleFrame from "./Wrappers/FlexibleFrame";


export default function Carousel({ slides }) {
  const [index, setIndex] = useState(0);
  const goTo = (i) => setIndex(Math.max(0, Math.min(slides.length - 1, i)));

  return (
    <div className="sm-carousel">
      <div className="sm-track-clip">
        <div className="sm-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div key={i} className="sm-slide">
              <MockScreen><FlexibleFrame img={slide.img} /></MockScreen>
              <div className="sm-caption">
                <div className="sm-msg">{slide.msg}</div>
                <div className="sm-count">{i + 1}/{slides.length}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {slides.length > 1 && (
        <div className="sm-controls">
          <button type="button" className="sm-arrow prev" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous">
            <ChevronLeft size={16} />
          </button>
          <div className="sm-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className="sm-dot"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                style={{ width: i === index ? 16 : 6, background: i === index ? ACCENT : "#E7E5DE" }}
              />
            ))}
          </div>
          <button type="button" className="sm-arrow next" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} aria-label="Next">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}