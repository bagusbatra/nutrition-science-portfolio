import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareHeart } from 'lucide-react';

interface GuestbookFloatingButtonProps {
  onClick: () => void;
}

export const GuestbookFloatingButton: React.FC<GuestbookFloatingButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      id="guestbook-fab-btn"
      onClick={onClick}
      aria-label="Buka Buku Tamu & Dukungan Sidang"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 w-14 h-14 rounded-full bg-[#2D2D2D] text-white shadow-lg border border-[#2D2D2D] flex items-center justify-center cursor-pointer"
    >
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8BBD0] opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F8BBD0] border-2 border-[#2D2D2D]" />
      </span>
      <MessageSquareHeart className="w-6 h-6" />
    </motion.button>
  );
};
