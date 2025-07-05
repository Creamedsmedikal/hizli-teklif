import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

const productList = [
  { name: "Revypeel Low", price: 199.5 },
  { name: "Revypeel High", price: 231 },
  { name: "Prepeeling Solüsyon", price: 35 },
  { name: "Nötralize Edici Jel", price: 35 },
  { name: "Post Peeling Krem", price: 42 },
  { name: "Revypeel Low Set", price: 283.5 },
  { name: "Revypeel High Set", price: 315 },
  { name: "Cryopen O+", price: 2240 },
  { name: "Cryopen XP", price: 3465 },
  { name: "16gr N2O Kartuş", price: 105 },
  { name: "Dermalab Aesthetics", price: 13650 },
  { name: "Dermalab Combo", price: 26600 },
  { name: "DSM Colorimetre 4", price: 3220 },
];

// Kodun devamı önceki gibi burada yer alacak