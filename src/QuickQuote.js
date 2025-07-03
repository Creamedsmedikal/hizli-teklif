import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

const productList = [
  { name: "Revypeel Low", price: 72, costRate: 0.7 },
  { name: "Revypeel High", price: 84, costRate: 0.7 },
  { name: "Prepeeling Solüsyon", price: 11, costRate: 0.7 },
  { name: "Nötralize Edici Jel", price: 11, costRate: 0.7 },
  { name: "Post Peeling Krem", price: 16, costRate: 0.7 },
  { name: "Revypeel Low Set", price: 205, costRate: 0.7 },
  { name: "Revypeel High Set", price: 235, costRate: 0.7 },
  { name: "Cryopen O+", price: 1500, costRate: 0.2 },
  { name: "Cryopen XP", price: 2400, costRate: 0.2 },
  { name: "16gr N2O Kartuş", price: 3.5, costRate: 0.2 },
  { name: "Dermalab Aesthetics", price: 9000, costRate: 0.2 },
  { name: "Dermalab Combo", price: 16000, costRate: 0.2 },
  { name: "DSM Colorimetre 4", price: 2000, costRate: 0.2 },
];

export default function QuickQuote() {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(37);
  const [vat, setVat] = useState(10);
  const [profitMargin, setProfitMargin] = useState(30);
  const [discount, setDiscount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const quoteRef = useRef();

  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=EUR&symbols=TRY")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.TRY) {
          setExchangeRate(data.rates.TRY);
        }
      });
  }, []);

  const addItem = () => {
    const selected = productList.find(p => p.name === selectedProduct);
    if (!selected || quantity <= 0) return;
    setItems([...items, { ...selected, quantity }]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const generatePDF = () => {
    const element = quoteRef.current;
    html2pdf().from(element).save(`${customerName || "Teklif"}.pdf`);
  };

  const totalEuro = items.reduce((sum, item) => {
    const subtotal = item.price * item.quantity;
    const withMargin = subtotal * (1 + profitMargin / 100);
    const withVAT = withMargin * (1 + vat / 100);
    return sum + withVAT;
  }, 0);

  const discountedEuro = totalEuro * (1 - discount / 100);
  const totalTL = discountedEuro * exchangeRate;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Hızlı Fiyat Teklifi</h2>

      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Müşteri Adı"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="email"
        className="w-full border p-2 rounded"
        placeholder="Müşteri E-posta"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />

      <div className="flex gap-2">
        <select
          className="w-full border p-2 rounded"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Ürün Seçin</option>
          {productList.map((p, idx) => (
            <option key={idx} value={p.name}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          className="w-1/3 border p-2 rounded"
          placeholder="Adet"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button
          onClick={addItem}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Ekle
        </button>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vat"
            checked={vat === 10}
            onChange={() => setVat(10)}
          />
          %10 KDV
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="vat"
            checked={vat === 20}
            onChange={() => setVat(20)}
          />
          %20 KDV
        </label>
      </div>

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="İskonto Oranı (%)"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />

      <div ref={quoteRef} className="text-sm text-gray-700 space-y-2">
        <h3 className="font-semibold text-base">{customerName && `Müşteri: ${customerName}`}</h3>
        <ul className="divide-y">
          {items.map((item, index) => {
            const subtotal = item.price * item.quantity;
            const importCost = subtotal * item.costRate;
            const withMargin = subtotal * (1 + profitMargin / 100);
            const withVAT = withMargin * (1 + vat / 100);
            return (
              <li key={index} className="py-2">
                <p>Ürün: {item.name}</p>
                <p>Adet: {item.quantity}</p>
                <p>Ara Toplam: €{subtotal.toFixed(2)}</p>
                <p>İthalat Maliyeti: €{importCost.toFixed(2)}</p>
                <p>Kar Marjlı: €{withMargin.toFixed(2)}</p>
                <p>KDV Dahil (€): €{withVAT.toFixed(2)}</p>
              </li>
            );
          })}
        </ul>
        <p className="font-semibold pt-2">Genel Toplam (EUR): €{totalEuro.toFixed(2)}</p>
        <p className="font-semibold">İskontolu Toplam (EUR): €{discountedEuro.toFixed(2)}</p>
        <p className="font-semibold">Genel Toplam (TL): ₺{totalTL.toFixed(2)}</p>
        <p className="text-xs text-gray-500">Güncel Kur (EUR → TRY): {exchangeRate.toFixed(2)}</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        PDF Olarak İndir
      </button>
    </div>
  );
}
