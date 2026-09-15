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
  Moon
} from "lucide-react";
import { AccordionItem, Carousel } from "../components"
import { KEYS, ACCENT, ACCENT_SOFT, LIT, LIT_SOFT, LCD_BG, LCD_TEXT } from "../constants/constants";
import Footer from "../components/Footer"

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
    icon: CreditCard, title: "Payment:Card", slides: [
      { hi: "Total", msg: "From the screen, Start scanning", img: imageBaseUrl + "/common/t_idle_scr.jpg" },
      { hi: "Total", msg: "Once done, Press the total button", img: imageBaseUrl + "/common/t_scanned_before_total_scr.jpg" },
      { hi: "Total", msg: "See the total amount, and enter the number into the card machine", img: imageBaseUrl + "/common/t_scanned_after_total_scr.jpg" },
      { hi: "Total", msg: "From the initial screen, enter the money to receive and press the green button", img: imageBaseUrl + "/common/mac_ideal_scr.jpg" },
      { hi: "Total", msg: "Guide the customer to tap the card and wait until it's gone through, and check *the auth code*", img: imageBaseUrl + "/card_payment/mac_after_payment_scr.jpg" },
      { hi: "Total", msg: "Once it's gone through, press the Other tender button", img: imageBaseUrl + "/common/t_scanned_after_total_scr2.jpg" },
      { hi: "Enter", msg: 'Press Credit Card Button', img: imageBaseUrl + "/card_payment/t_other_tender_pressed_scr2.jpg" },
      { hi: "Enter", msg: 'Enter any number, the number does not matter', img: imageBaseUrl + "/card_payment/t_pressed_card_scr.jpg" },
    ]
  },
  {
    icon: Banknote, title: "Payment:Cash", slides: [
      { hi: "Total", msg: "From the screen, Start scanning", img: imageBaseUrl + "/common/t_idle_scr.jpg" },
      { hi: "Total", msg: "Once done, Press the total button", img: imageBaseUrl + "/common/t_scanned_before_total_scr.jpg" },
      { hi: "Total", msg: "Enter the number you received from the customer", img: imageBaseUrl + "/cash_payment/t_scanned_after_total_scr.jpg" },
      { hi: "Total", msg: "Once done, Press the cash button", img: imageBaseUrl + "/cash_payment/t_scanned_after_total_scr2.jpg" },
      { hi: "Total", msg: "Return the change to the customer", img: imageBaseUrl + "/cash_payment/til_after_cash_payment_scr.jpg" },
    ]
  },
  {
    icon: CreditCard, title: "Refund: Card", slides: [
      { hi: "Total", msg: "To find the document, press the Menu button", img: imageBaseUrl + "/refund/refund0.jpg" },
      { hi: "Total", msg: "To load the document, Press the Previous Documents, and Find the case", img: imageBaseUrl + "/refund/refund0_1.jpg" },
      { hi: "Total", msg: "Select the item you want to refund and press Select Item", img: imageBaseUrl + "/refund/refund1.jpg" },
      { hi: "Total", msg: "If you have finished, Press the Return Selected button", img: imageBaseUrl + "/refund/refund2.jpg" },
      { hi: "Total", msg: "Press Defect Button", img: imageBaseUrl + "/refund/refund3.jpg" },
      { hi: "Total", msg: "Press Total", img: imageBaseUrl + "/refund/refund4.jpg" },
      { hi: "Total", msg: "Press Other Tender", img: imageBaseUrl + "/refund/refund5.jpg" },
      { hi: "Total", msg: "Press the button on the top right", img: imageBaseUrl + "/refund/refund_mac1.jpg" },
      { hi: "Total", msg: "Press the Refund button", img: imageBaseUrl + "/refund/refund_mac2.jpg" },
      { hi: "Total", msg: "Press 0701 and the green button", img: imageBaseUrl + "/refund/refund_mac3.jpg" },
      { hi: "Total", msg: "See the document printed and find refund code at the buttom", img: imageBaseUrl + "/refund/refund_mac4.jpg" },
      { hi: "Total", msg: "Press the Credit Card Button", img: imageBaseUrl + "/refund/refund6.jpg" },
      { hi: "Total", msg: "Enter any number, the number does not matter", img: imageBaseUrl + "/refund/refund7.jpg" },
    ]
  },
  {
    icon: Banknote, title: "Refund: Cash", slides: [
      { hi: "Total", msg: "To find the document, press the Menu button", img: imageBaseUrl + "/refund/refund0.jpg" },
      { hi: "Total", msg: "To load the document, Press the Previous Documents, and Find the case", img: imageBaseUrl + "/refund/refund0_1.jpg" },
      { hi: "Total", msg: "Select the item you want to refund and press Select Item", img: imageBaseUrl + "/refund/refund1.jpg" },
      { hi: "Total", msg: "If you have finished, Press the Return Selected button", img: imageBaseUrl + "/refund/refund2.jpg" },
      { hi: "Total", msg: "Press Defect Button", img: imageBaseUrl + "/refund/refund3.jpg" },
      { hi: "Total", msg: "Press Total", img: imageBaseUrl + "/refund/refund4.jpg" },
      { hi: "Total", msg: "Enter the amount of money received from the customer and press the cash button", img: imageBaseUrl + "/refund/refund5_cash1.jpg" },
      { hi: "Total", msg: "Hand over the cash amount shown on the screen", img: imageBaseUrl + "/refund/refund5_cash2.jpg" },
    ]
  },
  {
    icon: Moon, title: "Closing: Night", slides: [
      { hi: "Total", msg: "Step1", img: imageBaseUrl + "/docs/closing_night_bg1.jpg" },
      { hi: "Total", msg: "Press Menu Button", img: imageBaseUrl + "/docs/closing_night/t_idle_scr.jpg" },
      { hi: "Total", msg: "Press Reports Button", img: imageBaseUrl + "/docs/closing_night/t_menu1_scr.jpg" },
      { hi: "Total", msg: "Press Report X", img: imageBaseUrl + "/docs/closing_night/t_menu2_scr.jpg" },
      { hi: "Total", msg: "Print Button", img: imageBaseUrl + "/docs/closing_night/t_resportx_pressed_scr.jpg" },
      { hi: "Total", msg: "Press the button at the top right", img: imageBaseUrl + "/docs/closing_night/mac_default_scr.jpg" },
      { hi: "Total", msg: "Again, Press the button at the top right", img: imageBaseUrl + "/docs/closing_night/mac_menu1_report_scr.jpg" },
      { hi: "Total", msg: "Find the menu 'Totals/Reports' and Press the green button", img: imageBaseUrl + "/docs/closing_night/mac_menu2_scr.jpg" },
      { hi: "Total", msg: "Enter 0701 and press the green button", img: imageBaseUrl + "/docs/closing_night/mac_menu2_report_scr.jpg" },
      { hi: "Total", msg: "Press the green button", img: imageBaseUrl + "/docs/closing_night/mac_pw_scr.jpg" },
      { hi: "Total", msg: "Print Z-total / End of Day Banking", img: imageBaseUrl + "/docs/closing_night/mac_z_total_end_scr0.jpg" },
      { hi: "Total", msg: "Print Z-total / End of Day Banking", img: imageBaseUrl + "/docs/closing_night/mac_z_total_scr.jpg" },
      { hi: "Total", msg: "Warning: Z-total comes out only once, if failed, Do not touch anything else but the re-print button", img: imageBaseUrl + "/docs/closing_night/mac_z_total_end_scr.jpg" },
      { hi: "Total", msg: "Print Z-total / End of Day Banking", img: imageBaseUrl + "/docs/closing_night/mac_menu2_banking_scr.jpg" },
      { hi: "Total", msg: "Step2", img: imageBaseUrl + "/docs/closing_night_bg2.jpg" },
      { hi: "Total", msg: "Compare the totals on z-total and x-report", img: imageBaseUrl + "/docs/closing_night/closing_night_2_1.jpg" },
      { hi: "Total", msg: "the total on z-total and x-report should match (A=B). If A is less than B, it means there is a loss for the day.", img: imageBaseUrl + "/docs/closing_night/closing_night_2_2.jpg" },
      { hi: "Total", msg: "Separate the cash to be sent to HQ", img: imageBaseUrl + "/docs/closing_night/closing_night_2_3.jpg" },
      { hi: "Total", msg: "Press Log off button", img: imageBaseUrl + "/docs/closing_night/closing_night_2_4.jpg" },
      { hi: "Total", msg: "Press Declaration", img: imageBaseUrl + "/docs/closing_night/closing_night_2_5.jpg" },
      { hi: "Total", msg: "Enter your staff number and password", img: imageBaseUrl + "/docs/closing_night/closing_night_2_6.jpg" },
      { hi: "Total", msg: "Press the Confirm Declare button", img: imageBaseUrl + "/docs/closing_night/closing_night_2_6_1.jpg" },
      { hi: "Total", msg: "Enter the number of notes", img: imageBaseUrl + "/docs/closing_night/closing_night_2_7.jpg" },
      { hi: "Total", msg: "If you've entered and made the total money, press the button at right top", img: imageBaseUrl + "/docs/closing_night/closing_night_2_8.jpg" },
      { hi: "Total", msg: "Press the Confirm Declare button", img: imageBaseUrl + "/docs/closing_night/closing_night_2_9.jpg" },
      { hi: "Total", msg: "Separate the money to be sent to HQ and the original till money(£80)", img: imageBaseUrl + "/docs/closing_night/closing_night_2_10.jpg" },
      { hi: "Total", msg: "Step3", img: imageBaseUrl + "/docs/closing_night_bg3.jpg" },
      { hi: "Total", msg: "Find pairs of A,B,C,D, and write them on the right document", img: imageBaseUrl + "/docs/closing_night/closing_night_3_1.jpg" },
      { hi: "Total", msg: "Find Amex, Barclay, Union pay section on the left document", img: imageBaseUrl + "/docs/closing_night/closing_night_3_2.jpg" },
      { hi: "Total", msg: "Fill out the document with information you've found so far (Amex, Barclay) in documents", img: imageBaseUrl + "/docs/closing_night/closing_night_3_3.jpg" },
      { hi: "Total", msg: "Find Card Total, Cash, Total and write the number on the right document in matching sections", img: imageBaseUrl + "/docs/closing_night/closing_night_3_4.jpg" },
      { hi: "Total", msg: "Find Card Total, Cash, Total and write the number on the right document in matching sections", img: imageBaseUrl + "/docs/closing_night/closing_night_3_5.jpg" },
      { hi: "Total", msg: "Collect those documents and staple them together in the following order. z-total->top, declaration -> bottom", img: imageBaseUrl + "/docs/closing_night/final_1.jpg" },
      { hi: "Total", msg: "Put those documents(the collection of documents, and all receipts of the day) in the envelope", img: imageBaseUrl + "/docs/closing_night/final_2.jpg?v=2" },
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
.sm-notice { background: ${ACCENT_SOFT}; border: 1px solid #CFE0F0; color: ${ACCENT}; font-size: 16px; border-radius: 8px; padding: 10px 14px; margin: 22px 0 26px; }
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
.sm-caption .sm-msg { flex: 1; font-size:15px}
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
.sm-footer p { margin: 0; }
.sm-footer-meta { margin-top: 6px; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0 8px; font-size: 12.5px; color: #9CA3AF; }
.sm-footer-link { display: inline-flex; align-items: center; min-height: 44px; padding: 0 4px; background: none; border: none; font: inherit; font-weight: 600; color: ${ACCENT}; cursor: pointer; }
.sm-footer-link:hover { text-decoration: underline; }
.sm-footer-link:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 2px; border-radius: 4px; }
.sm-footer p { margin: 0; }
.sm-footer-meta { margin-top: 6px; font-size: 12.5px; color: #9CA3AF; }
.sm-footer { margin-top: 28px; }
.sm-footer p { margin: 0; }
.sm-contact { display: flex; gap: 14px; align-items: flex-start; background: #FFFFFF; border-radius: 14px; border-left: 5px solid #25D366; box-shadow: 0 2px 14px rgba(20,30,40,0.07); padding: 18px 18px 18px 16px; text-align: left; }
.sm-contact-icon { flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: #E3F8EA; color: #128C4B; display: flex; align-items: center; justify-content: center; }
.sm-contact-body { flex: 1; min-width: 0; }
.sm-contact-title { font-size: 17px; font-weight: 800; letter-spacing: -0.01em; color: #1B2430; }
.sm-contact-text { margin-top: 4px !important; font-size: 15px; line-height: 1.45; color: #374151; }
.sm-contact-text strong { color: #128C4B; }
.sm-contact-hint { margin-top: 10px !important; font-size: 12.5px; color: #6B7280; }
.sm-contact-hint span { display: inline-block; margin-top: 2px; padding: 2px 8px; border-radius: 6px; background: ${LCD_BG}; color: ${LCD_TEXT}; font-family: "SFMono-Regular", Consolas, "Courier New", monospace; font-size: 11.5px; }
.sm-footer-note { margin-top: 18px !important; text-align: center; color: #9CA3AF; font-size: 13px; }
`;




export default function StaffManual() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="sm-root">
      <style>{CSS}</style>
      <div className="sm-wrap">
        <header>
          <h1 className="sm-h1">SP6 Staff Manual</h1>
          {/* <p className="sm-sub"></p> */}
        </header>

        <div className="sm-notice">
          👋Tap a topic to see step-by-step instructions
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
        <Footer />

        
      </div>
    </div>
  );
}
