import React from "react";

const fonts = [
  { label: "Pixelify Sans", value: "font-pixelify" },
  { label: "Monospace", value: "font-mono" },
  { label: "Sans Serif", value: "font-sans" },
  { label: "Serif", value: "font-serif" },
  { label: "Cursive", value: "font-cursive" },
];

interface FontSelectorProps {
  font: string;
  setFont: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ font, setFont }) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-white/80 rounded shadow text-black">
      <label htmlFor="font-select" className="text-xs font-bold">Police :</label>
      <select
        id="font-select"
        value={font}
        onChange={e => setFont(e.target.value)}
        className="border rounded px-2 py-1 text-xs"
      >
        {fonts.map(f => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector; 