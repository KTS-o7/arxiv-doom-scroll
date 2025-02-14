import { create } from 'zustand';

interface BigCardState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useBigCardStore = create<BigCardState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export const useIsBigCardOpen = () => {
  return useBigCardStore((state) => state.isOpen);
};

export const useSetBigCardOpen = () => {
  return useBigCardStore((state) => state.setIsOpen);
}; 