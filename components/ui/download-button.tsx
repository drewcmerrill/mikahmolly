"use client";

export default function DownloadButton() {
  const handleDownload = () => {
    window.location.href = "/api/download";
  };

  return (
    <button onClick={handleDownload} className="p-[3px] relative mt-5">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        Download
      </div>
    </button>
  );
}
