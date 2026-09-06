import React, { Children } from "react"
import { KEYS } from "../constants/constants";

import FlexibleFrame from "./Wrappers/FlexibleFrame";

export default function MockScreen({ children }) {
  return (
    <div className="sm-mock">
      {children}
    </div>
  );
}