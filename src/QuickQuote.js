import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

const productList = [
  { name: "Revypeel Low", price: 285 },
  { name: "Revypeel High", price: 330 },
  { name: "Prepeeling Solüsyon", price: 50 },
  { name: "Nötralize Edici Jel", price: 50 },
  { name: "Post Peeling Krem", price: 60 },
  { name: "Revypeel Low Set", price: 405 },
  { name: "Revypeel High Set", price: 450 },
  { name: "Cryopen O+", price: 3200 },
  { name: "Cryopen XP", price: 4950 },
  { name: "16gr N2O Kartuş", price: 150 },
  { name: "Dermalab Aesthetics", price: 19500 },
  { name: "Dermalab Combo", price: 38000 },
  { name: "DSM Colorimetre 4", price: 4600 },
];

// [DEVAMI: export default function QuickQuote()] - içerik yukarıda mevcut olduğundan burada kesildi
