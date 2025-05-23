// FDModal.tsx
'use client';

import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import useFDModal from "@/app/hooks/useFDModal"; // Ensure this path is correct
import CustomButton from "../forms/CustomButton"; // Ensure this path is correct
import Chapa from "@/app/components/Chapa"; // Ensure this path is correct

const FDModal = () => {
    const router = useRouter();
    const FDModal = useFDModal(); // Access the store
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get totalPrice from the Zustand store
    const totalPriceFromStore = FDModal.totalPrice;

    useEffect(() => {
        // If the modal is open and there's a price, log it or pre-fill something.
        if (FDModal.isOpen) {
            console.log('FDModal is open. Total price from store:', totalPriceFromStore);
            // Reset form fields if modal is reopened for a new transaction.
            // Consider if you want to clear these on open or only on close/success.
            // setEmail('');
            // setFname('');
            // setLname('');
            setErrors([]); // Clear previous errors
        }
    }, [FDModal.isOpen, totalPriceFromStore]);
    
    const handlePaymentSubmit = async () => {
        setIsLoading(true);
        setErrors([]); 

        if (!email.trim() || !fname.trim() || !lname.trim()) {
            setErrors(["Please fill in all required fields: Email, First Name, and Last Name."]);
            setIsLoading(false);
            return;
        }

        if (!totalPriceFromStore || totalPriceFromStore <= 0) {
            setErrors(["The payment amount is invalid or not available. Please close this window and try the booking process again."]);
            setIsLoading(false);
            return;
        }

        const customerInfo = {
            email: email.trim(),
            fname: fname.trim(),
            lname: lname.trim(),
            amount: totalPriceFromStore, // <-- Use totalPrice from the store
            currency: 'ETB', // Default or make dynamic
            // Generate a unique transaction reference here if your system requires it before Chapa does.
            // tx_ref: `YOUR_APP_PREFIX-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            // callback_url: `${window.location.origin}/payment-status` // Ensure this page exists
        };

        console.log('Attempting to initialize Chapa payment with:', customerInfo);
        
    };
    
    const handleCloseModal = () => {
        FDModal.close();
        // Reset state when modal is explicitly closed
        setEmail('');
        setFname('');
        setLname('');
        setErrors([]);
        setIsLoading(false);
    };

    const content = (
        <>
            <form 
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    handlePaymentSubmit(); 
                }}
                className="space-y-4"
            >
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Your e-mail address"
                    type="email"
                    name="email"
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />
                <input
                    onChange={(e) => setFname(e.target.value)}
                    value={fname}
                    placeholder="Your first name"
                    type="text"
                    name="fname"
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />
                <input
                    onChange={(e) => setLname(e.target.value)}
                    value={lname}
                    placeholder="Your last name"
                    type="text"
                    name="lname"
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />

                {totalPriceFromStore && totalPriceFromStore > 0 && (
                    <div className="p-3 my-2 bg-gray-100 rounded-xl text-center">
                        <p className="text-sm text-gray-700">You are about to pay:</p>
                        <p className="text-xl font-semibold text-gray-900">
                            {totalPriceFromStore.toFixed(2)} ETB
                        </p>
                    </div>
                )}
            
                {errors.length > 0 && (
                    <div className="p-4 my-2 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                        {errors.map((error, index) => (
                            <p key={`error_${index}`}>{error}</p>
                        ))}
                    </div>
                )}
                
                <button className="w-full h-[54px] bg-akeraye text-white rounded-xl flex items-center justify-center" type="submit">
                <Chapa fname={fname} lname={lname} email={email} totalPriceFromStore={totalPriceFromStore ?? 0}/>
                </button>
                {/* <CustomButton
                     label={isLoading ? "Processing..." : `Proceed to Pay ${totalPriceFromStore ? totalPriceFromStore.toFixed(2) + ' ETB' : ''}`}
                     onClick={handlePaymentSubmit} // onClick is handled by form onSubmit, or can be handlePaymentSubmit directly if not using form's submit
                     
                /> */}
            </form>
        </>
    );

    return (
        <Modal
            isOpen={FDModal.isOpen}
            close={handleCloseModal} // Use the new handler to also reset state
            label="Enter Payment Details"
            content={content}
        />
    );
};

export default FDModal;