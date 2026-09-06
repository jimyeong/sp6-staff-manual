import React, {useState,useRef, useEffect} from "react"
import { Icon, ChevronDown } from "lucide-react";
import Carousel from "./Carousel";
import { ACCENT } from "../constants/constants";



export default function AccordionItem({ topic, isOpen, onToggle }) {
  const Icon = topic.icon;
  const panelRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      setMaxHeight(panelRef.current.scrollHeight);
    } else {
      setMaxHeight(0);
    }
  }, [isOpen, topic]);

  return (
    <div className="sm-item">
      <button className="sm-header" onClick={onToggle}>
        <span className="sm-icon">
          <Icon size={19} color={ACCENT} strokeWidth={2} />
        </span>
        <span className="sm-title">{topic.title}</span>
        <ChevronDown
          size={18}
          className="sm-chevron"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: isOpen ? ACCENT : "#6B7280" }}
        />
      </button>
      <div className="sm-panel" style={{ maxHeight }}>
        <div ref={panelRef} className="sm-panel-inner">
          <Carousel slides={topic.slides} />
        </div>
      </div>
    </div>
  );
}