// useFDModal.ts
import { create } from "zustand";

interface FDModalStore {
    isOpen: boolean;
    // The component uses totalPrice, and typically it's set when the modal is opened.
    // So, the open action accepts the price.
    open: (totalPrice: number | null) => void;
    close: () => void;
    totalPrice: number | null; // The state property to hold the price
}

const useFDModal = create<FDModalStore>((set) => ({
    isOpen: false,
    // Implement the open action: set isOpen to true and store the provided price
    open: (totalPrice) => set({ isOpen: true, totalPrice: totalPrice }),
    // Implement the close action: set isOpen to false and reset the price
    close: () => set({ isOpen: false, totalPrice: null }),
    totalPrice: null, // Initial state for totalPrice
}));

export default useFDModal;