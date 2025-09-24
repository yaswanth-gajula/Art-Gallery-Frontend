import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, onSuccess, amount }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would integrate with a real payment gateway like Stripe.
        // For now, we just simulate a successful payment.
        onSuccess();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Secure Payment</h2>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">Total Amount: <span className="font-bold">${amount.toFixed(2)}</span></p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium dark:text-gray-300">Card Number</label>
                                    <input type="text" placeholder="**** **** **** 1234" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium dark:text-gray-300">Expiry (MM/YY)</label>
                                        <input type="text" placeholder="12/28" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium dark:text-gray-300">CVC</label>
                                        <input type="text" placeholder="123" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium dark:text-gray-300">Cardholder Name</label>
                                    <input type="text" placeholder="Art Buyer" className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300">Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Pay Now</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;