import React, { useState, useRef, useEffect } from "react";
import {
  LogIn,
  ScanLine,
  IdCard,
  CreditCard,
  Banknote,
  RotateCcw,
  RefreshCw,
  Undo2,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AccordionItem, Carousel } from "../components"
import { KEYS, ACCENT, ACCENT_SOFT, LIT, LIT_SOFT, LCD_BG, LCD_TEXT } from "../constants/constants";

const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL
console.log("@", imageBaseUrl)
export const TOPICS = [
  // {
  //   icon: IdCard, title: "How to apply membership card", slides: [
  //     { hi: "Enter", msg: "Alcohol, cigarettes and other restricted items trigger an age check" },
  //     { hi: "Customer", msg: "If they look under 25, ask for photo ID — passport, licence or PASS card" },
  //     { hi: "Enter", msg: "No valid ID, no sale — no exceptions" },
  //     { hi: "Help", msg: "Unsure, or being pushed? Call a supervisor" },
  //   ]
  // },
  {
    icon: CreditCard, title: "How to take a card payment", slides: [
      { hi: "Total", msg: "Press Total — the card machine wakes up automatically", img: imageBaseUrl + "/common/t_idle_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/common/t_scanned_before_total_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/common/t_scanned_after_total_scr.jpg" },
      { hi: "Total", msg: "Press Total — the card machine wakes up automatically", img: imageBaseUrl + "/common/mac_ideal_scr.jpg" },
      { hi: "Total", msg: "Press Total — the card machine wakes up automatically", img: imageBaseUrl + "/card_payment/mac_after_payment_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/common/t_scanned_after_total_scr2.jpg" },
      { hi: "Enter", msg: 'Wait for "Approved" before handing back the receipt', img: imageBaseUrl + "/card_payment/t_other_tender_pressed_scr2.jpg" },
      { hi: "Enter", msg: 'Wait for "Approved" before handing back the receipt', img: imageBaseUrl + "/card_payment/t_pressed_card_scr.jpg" },
    ]
  },
  {
    icon: CreditCard, title: "How to take a cash payment", slides: [
      { hi: "Total", msg: "Press Total — the card machine wakes up automatically", img: imageBaseUrl + "/common/t_idle_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/common/t_scanned_before_total_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/cash_payment/t_scanned_after_total_scr.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/common/t_scanned_after_total_scr2.jpg" },
      { hi: "Total", msg: "Contactless for smaller amounts, chip & PIN above the limit", img: imageBaseUrl + "/cash_payment/til_after_cash_payment_scr.jpg" },
    ]
  },
  // {
  //   icon: Banknote, title: "How to take a cash payment", slides: [
  //     { hi: "Total", msg: "Type in the number of money you received at this screen" },
  //     { hi: "Enter", msg: "The till works out the exact change to give back" },
  //     { hi: "Enter", msg: "Count the change back into their hand" },
  //     { hi: "Help", msg: "Large notes — check them under the UV lamp if unsure" },
  //   ]
  // },
  // {
  //   icon: RotateCcw, title: "How to refund a card payment", slides: [
  //     { hi: "Refund", msg: "Press Refund, then scan or key in the item" },
  //     { hi: "Help", msg: "Refunds need a supervisor's key or code — call for help" },
  //     { hi: "Enter", msg: "Ask the customer to tap the same card to receive the refund" },
  //   ]
  // },
  // {
  //   icon: RefreshCw, title: "How to refund a cash payment", slides: [
  //     { hi: "Refund", msg: "Press Refund, then select Cash" },
  //     { hi: "Help", msg: "A supervisor authorises the refund" },
  //     { hi: "Enter", msg: "Count the cash out to the customer and confirm the amount" },
  //   ]
  // },
  // {
  //   icon: RefreshCw, title: "How to take vouchers", slides: [
  //     { hi: "Refund", msg: "Press Refund, then select Cash" },
  //     { hi: "Help", msg: "A supervisor authorises the refund" },
  //     { hi: "Enter", msg: "Count the cash out to the customer and confirm the amount" },
  //   ]
  // }, 
  // {
  //   icon: RefreshCw, title: "How to take certificate payment", slides: [
  //     { hi: "Refund", msg: "Press Refund, then select Cash" },
  //     { hi: "Help", msg: "A supervisor authorises the refund" },
  //     { hi: "Enter", msg: "Count the cash out to the customer and confirm the amount" },
  //   ]
  // },
  // {
  //   icon: RefreshCw, title: "How to scan items without code", slides: [
  //     { hi: "Refund", msg: "Press Refund, then select Cash" },
  //     { hi: "Help", msg: "A supervisor authorises the refund" },
  //     { hi: "Enter", msg: "Count the cash out to the customer and confirm the amount" },
  //   ]
  // },
  // {
  //   icon: Undo2, title: "How to change price", slides: [
  //     { hi: "Del Line", msg: "Scanned something twice? Press Del. Line to remove the last item" },
  //     { hi: "Del Line", msg: "Customer changed their mind? Void that item — don't just set it aside" },
  //     { hi: "Help", msg: "Most voids need a supervisor's key — that's normal, just ask" },
  //   ]
  // },
  // {
  //   icon: Undo2, title: "Dangerous cases", slides: [
  //     { hi: "Del Line", msg: "Scanned something twice? Press Del. Line to remove the last item" },
  //     { hi: "Del Line", msg: "Customer changed their mind? Void that item — don't just set it aside" },
  //     { hi: "Help", msg: "Most voids need a supervisor's key — that's normal, just ask" },
  //   ]
  // },
  // {
  //   icon: LogOut, title: "Closing your till at midday", slides: [
  //     { hi: "Esc", msg: "Sign out every time you leave the till" },
  //     { hi: "Esc", msg: "Push the drawer fully shut" },
  //     { hi: "Help", msg: "Never count cash at the till in front of customers" },
  //     { hi: "Help", msg: "Follow the cashing-up routine with a supervisor at the end of your shift" },
  //   ]
  // }, 
  // {
  //   icon: LogOut, title: "Closing your till at the end of day", slides: [
  //     { hi: "Esc", msg: "Sign out every time you leave the till" },
  //     { hi: "Esc", msg: "Push the drawer fully shut" },
  //     { hi: "Help", msg: "Never count cash at the till in front of customers" },
  //     { hi: "Help", msg: "Follow the cashing-up routine with a supervisor at the end of your shift" },
  //   ]
  // }
];


// All static layout lives here as real CSS — no Tailwind, no build step required.
const CSS = `
.sm-root { background: #F6F5F1; min-height: 100%; width: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1B2430; }
.sm-wrap { max-width: 640px; margin: 0 auto; padding: 40px 18px 70px; }
.sm-h1 { font-size: 30px; font-weight: 800; letter-spacing: -0.02em; margin: 0; }
.sm-sub { color: #6B7280; font-size: 15.5px; margin: 4px 0 0; }
.sm-notice { background: ${ACCENT_SOFT}; border: 1px solid #CFE0F0; color: ${ACCENT}; font-size: 13.5px; border-radius: 8px; padding: 10px 14px; margin: 22px 0 26px; }
.sm-list { display: flex; flex-direction: column; gap: 10px; }
.sm-item { background: #FFFFFF; border-radius: 14px; box-shadow: 0 2px 14px rgba(20,30,40,0.07); overflow: hidden; }
.sm-header { width: 100%; display: flex; align-items: center; gap: 14px; padding: 16px; background: none; border: none; cursor: pointer; text-align: left; font: inherit; color: inherit; }
.sm-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: ${ACCENT_SOFT}; display: flex; align-items: center; justify-content: center; }
.sm-title { flex: 1; font-size: 16.5px; font-weight: 700; }
.sm-chevron { flex-shrink: 0; transition: transform 0.2s ease; }
.sm-panel { overflow: hidden; transition: max-height 0.3s ease; }
.sm-panel-inner { padding: 16px 16px 16px; border-top: 1px solid #E7E5DE; }
.sm-carousel { position: relative; }
.sm-track-clip { position: relative; overflow: hidden; border-radius: 10px; }
.sm-track { display: flex; transition: transform 0.3s ease; }
.sm-slide { width: 100%; flex-shrink: 0; }
.sm-mock { display: flex; gap: 8px; padding: 12px; border-radius: 10px; background: #22282E; aspect-ratio: 4 / 3; box-sizing: border-box; }
.sm-receipt { flex: 1; border-radius: 5px; opacity: 0.9; background: repeating-linear-gradient(to bottom, #EDEBE4 0px, #EDEBE4 6px, #DAD7CC 6px, #DAD7CC 8px); }
.sm-keys { flex: 1.1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.sm-key { display: flex; align-items: center; justify-content: center; text-align: center; border-radius: 4px; padding: 2px; font-size: 10.5px; font-weight: 600; line-height: 1.15; background: #3A4249; color: #C7CDD3; }
.sm-key.lit { background: ${LIT}; color: #3A2400; box-shadow: 0 0 0 2px ${LIT_SOFT}; }
.sm-caption { margin-top: 10px; background: ${LCD_BG}; color: ${LCD_TEXT}; border-radius: 8px; padding: 12px 14px; font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 13.5px; line-height: 1.45; display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
.sm-caption .sm-msg { flex: 1; }
.sm-caption .sm-count { flex-shrink: 0; font-size: 11px; opacity: 0.65; }
.sm-controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; }
.sm-arrow { flex-shrink: 0; width: 44px; height: 44px; padding: 0; border-radius: 50%; background: rgba(255,255,255,0.92); box-shadow: 0 2px 14px rgba(20,30,40,0.15); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1B2430; }
.sm-arrow.prev { background: #cbcccd; }
.sm-arrow.next { background: #cbcccd;}
.sm-arrow:disabled { opacity: 0.3; cursor: default; }
.sm-dots { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; align-items: center; }
.sm-dot { height: 6px; border-radius: 3px; border: none; cursor: pointer; padding: 0; background: #E7E5DE; }
.sm-footer { text-align: center; color: #6B7280; font-size: 13px; margin-top: 36px; }
.sm-arrow:focus-visible { outline: 2px solid #1B2430; outline-offset: 2px; }
`;




export default function StaffManual() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="sm-root">
      <style>{CSS}</style>
      <div className="sm-wrap">
        <header>
          <h1 className="sm-h1">Staff Manual</h1>
          <p className="sm-sub">Tap a topic to see step-by-step instructions</p>
        </header>

        <div className="sm-notice">
          Photos below are placeholders — swap in real till screenshots whenever you get a chance.
        </div>

        <div className="sm-list">
          {TOPICS.map((topic, i) => (
            <AccordionItem
              key={topic.title}
              topic={topic}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <footer className="sm-footer">Ask anytime — everyone started somewhere.</footer>
      </div>
    </div>
  );
}
