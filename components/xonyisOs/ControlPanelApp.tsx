import React, { useState } from "react";

const backgrounds = [
  { label: "Coucher de soleil", value: "/gif/icegif.gif" },
  { label: "Trigun", value: "/gif/trigungif.gif" },
  { label: "Trigun", value: "/gif/japanpaysagegif.gif" },
  { label: "Your name", value: "/gif/yourname.gif" },
  { label: "Pixel Forest", value: "/gif/pixelForest.gif" },

];

const tabs = ["Appearance", "Sound", "System"];

interface ControlPanelAppProps {
  background: string;
  setBackground: (bg: string) => void;
}

const ControlPanelApp: React.FC<ControlPanelAppProps> = ({ background, setBackground }) => {
  const [activeTab, setActiveTab] = useState("Appearance");

  return (
    <div className="bg-[#ededed] text-black border-2 border-[#888]  w-full h-full mx-auto font-pixelify shadow-lg relative">
      {/* Barre de titre rétro */}
      <div className="flex items-center justify-center border-b-2 border-[#888] pb-1 mb-2">
        <span className="text-lg tracking-widest font-bold">Control Panels</span>
      </div>
      {/* Onglets */}
      <div className="flex mb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-1 border-t-2 border-x-2 border-b-0 rounded-t-lg text-base font-bold ${
              activeTab === tab
                ? "bg-white border-[#888] text-black"
                : "bg-[#d3d3d3] border-[#888] text-gray-500"
            }`}
            style={{ borderBottom: activeTab === tab ? 'none' : '2px solid #888' }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Contenu de l'onglet Appearance */}
      {activeTab === "Appearance" && (
        <div className="p-2">
          {/* Menus déroulants stylés */}
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <button className="border-2 border-black px-4 py-1 bg-white font-bold flex items-center gap-2 text-[15px]">
                Videos <span className="bg-gray-400 text-white text-xs px-1 rounded ml-1">NEW</span>
                <span className="ml-2">▼</span>
              </button>
            </div>
            <div className="relative">
              <button className="border-2 border-black px-4 py-1 bg-white font-bold flex items-center gap-2 text-[15px]">
                Color <span className="ml-2">▼</span>
              </button>
            </div>
          </div>
          {/* Galerie d'images */}
          <div className="grid grid-cols-3 gap-4">
            {backgrounds.map(bg => (
              <button
                key={bg.value}
                onClick={() => setBackground(bg.value)}
                className={`border-4 ${background === bg.value ? 'border-black' : 'border-[#bbb]'} rounded-sm overflow-hidden focus:outline-none`}
                style={{ boxShadow: background === bg.value ? '0 0 0 2px #fff, 0 0 0 4px #000' : undefined }}
                type="button"
                title={bg.label}
              >
                <img src={bg.value} alt={bg.label} className="w-40 h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Contenu des autres onglets (placeholders) */}
      {activeTab === "Sound" && (
        <div className="p-4 text-center text-gray-500">Sound settings coming soon...</div>
      )}
      {activeTab === "System" && (
        <div className="p-4 text-center text-gray-500">System info coming soon...</div>
      )}
    </div>
  );
};

export default ControlPanelApp; 