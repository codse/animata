import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CreditCard, X } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
  time: string;
  icon: React.ReactNode;
  paymentMethod: string;
  cardLastFour: string;
  cardType?: string;
}

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <div className="mx-auto max-w-md font-sans">
      <motion.div
        layout
        className="w-[350px] overflow-hidden rounded-3xl bg-white shadow"
        initial={{
          height: 420,
          width: 300,
        }}
        animate={{
          height: selectedTransaction ? 350 : 420,
          width: 300,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {!selectedTransaction ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="pl-6 pt-3 text-xl font-semibold text-gray-400">Transactions</h2>
              <div className="space-y-2 p-2">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    layoutId={`transaction-${transaction.id}`}
                    className="flex cursor-pointer items-center justify-between rounded-lg p-1"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        layoutId={`icon-${transaction.id}`}
                        className="rounded-full bg-black"
                        transition={{ duration: 0.5 }}
                      >
                        {transaction.icon}
                      </motion.div>
                      <div>
                        <motion.p layoutId={`name-${transaction.id}`} className="font-medium">
                          {transaction.name}
                        </motion.p>
                        <motion.p
                          layoutId={`type-${transaction.id}`}
                          className="text-sm text-gray-400"
                        >
                          {transaction.type}
                        </motion.p>
                      </div>
                    </div>
                    <motion.p
                      layoutId={`amount-${transaction.id}`}
                      className="font-bold text-gray-400"
                    >
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="m-auto mt-4 flex w-11/12 items-center justify-center rounded-xl bg-gray-100 py-2 text-gray-800"
              >
                All Transactions <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <motion.div
                  layoutId={`transaction-${selectedTransaction.id}`}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    layoutId={`icon-${selectedTransaction.id}`}
                    className="rounded-xl bg-black"
                    transition={{ duration: 0.5 }}
                  >
                    {selectedTransaction.icon}
                  </motion.div>
                </motion.div>
                <button onClick={() => setSelectedTransaction(null)}>
                  <X className="h-6 w-6 rounded-full bg-gray-400 text-white" />
                </button>
              </div>
              <div className="flex justify-between border-b border-dashed pb-4">
                <div className="space-y-1">
                  <motion.p layoutId={`name-${selectedTransaction.id}`} className="font-medium">
                    {selectedTransaction.name}
                  </motion.p>
                  <motion.p
                    layoutId={`type-${selectedTransaction.id}`}
                    className="text-sm text-gray-400"
                  >
                    {selectedTransaction.type}
                  </motion.p>
                </div>
                <motion.p
                  layoutId={`amount-${selectedTransaction.id}`}
                  className="font-bold text-gray-400"
                >
                  ${Math.abs(selectedTransaction.amount).toFixed(2)}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="mt-4 space-y-2 text-gray-400">
                  <p>#{selectedTransaction.id}</p>
                  <p>{selectedTransaction.date}</p>
                  <p>{selectedTransaction.time}</p>
                </div>
                <div className="border-t border-dashed pt-4 text-gray-400">
                  <p className="font-medium">Paid Via {selectedTransaction.paymentMethod}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <p>XXXX {selectedTransaction.cardLastFour}</p>
                    <p>
                      {selectedTransaction.cardType === "visa" ? <VisaLogo /> : <MasterCardLogo />}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const MasterCardLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.29em" height="1em" viewBox="0 0 256 199">
      <path d="M46.54 198.011V184.84c0-5.05-3.074-8.342-8.343-8.342c-2.634 0-5.488.878-7.464 3.732c-1.536-2.415-3.731-3.732-7.024-3.732c-2.196 0-4.39.658-6.147 3.073v-2.634h-4.61v21.074h4.61v-11.635c0-3.731 1.976-5.488 5.05-5.488c3.072 0 4.61 1.976 4.61 5.488v11.635h4.61v-11.635c0-3.731 2.194-5.488 5.048-5.488c3.074 0 4.61 1.976 4.61 5.488v11.635zm68.271-21.074h-7.463v-6.366h-4.61v6.366h-4.171v4.17h4.17v9.66c0 4.83 1.976 7.683 7.245 7.683c1.976 0 4.17-.658 5.708-1.536l-1.318-3.952c-1.317.878-2.853 1.098-3.951 1.098c-2.195 0-3.073-1.317-3.073-3.513v-9.44h7.463zm39.076-.44c-2.634 0-4.39 1.318-5.488 3.074v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.536-5.488 4.39-5.488c.878 0 1.976.22 2.854.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-59.052 2.196c-2.196-1.537-5.269-2.195-8.562-2.195c-5.268 0-8.78 2.634-8.78 6.805c0 3.513 2.634 5.488 7.244 6.147l2.195.22c2.415.438 3.732 1.097 3.732 2.195c0 1.536-1.756 2.634-4.83 2.634s-5.488-1.098-7.025-2.195l-2.195 3.512c2.415 1.756 5.708 2.634 9 2.634c6.147 0 9.66-2.853 9.66-6.805c0-3.732-2.854-5.708-7.245-6.366l-2.195-.22c-1.976-.22-3.512-.658-3.512-1.975c0-1.537 1.536-2.415 3.951-2.415c2.635 0 5.269 1.097 6.586 1.756zm122.495-2.195c-2.635 0-4.391 1.317-5.489 3.073v-2.634h-4.61v21.074h4.61v-11.854c0-3.512 1.537-5.488 4.39-5.488c.879 0 1.977.22 2.855.439l1.317-4.39c-.878-.22-2.195-.22-3.073-.22m-58.833 10.976c0 6.366 4.39 10.976 11.196 10.976c3.073 0 5.268-.658 7.463-2.414l-2.195-3.732c-1.756 1.317-3.512 1.975-5.488 1.975c-3.732 0-6.366-2.634-6.366-6.805c0-3.951 2.634-6.586 6.366-6.805c1.976 0 3.732.658 5.488 1.976l2.195-3.732c-2.195-1.757-4.39-2.415-7.463-2.415c-6.806 0-11.196 4.61-11.196 10.976m42.588 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.073 0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.904 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805m-55.1-10.976c-6.147 0-10.538 4.39-10.538 10.976s4.39 10.976 10.757 10.976c3.073 0 6.147-.878 8.562-2.853l-2.196-3.293c-1.756 1.317-3.951 2.195-6.146 2.195c-2.854 0-5.708-1.317-6.367-5.05h15.587v-1.755c.22-6.806-3.732-11.196-9.66-11.196m0 3.951c2.853 0 4.83 1.757 5.268 5.05h-10.976c.439-2.854 2.415-5.05  5.708-5.05m114.372 7.025v-18.879h-4.61v10.976c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074  0 5.269-1.097 6.586-3.073v2.634h4.61zm-16.903 0c0-3.732 2.414-6.805 6.366-6.805c3.732 0 6.366 2.854 6.366 6.805c0 3.732-2.634 6.805-6.366 6.805c-3.952-.22-6.366-3.073-6.366-6.805m-154.107 0v-10.537h-4.61v2.634c-1.537-1.975-3.732-3.073-6.586-3.073c-5.927 0-10.537 4.61-10.537 10.976s4.61 10.976 10.537 10.976c3.074 0 5.269-1.097 6.586-3.073v2.634h4.61zm-17.123 0c0-3.732 2.415-6.805 6.366-6.805c3.732 0 6.367 2.854 6.367 6.805c0 3.732-2.635 6.805-6.367 6.805c-3.951-.22-6.366-3.073-6.366-6.805"></path>
      <path fill="black" d="M93.298 16.903h69.15v124.251h-69.15z"></path>
      <path
        fill="black"
        d="M97.689 79.029c0-25.245 11.854-47.637 30.074-62.126C114.373 6.366 97.47 0 79.03 0C35.343 0 0 35.343 0 79.029s35.343 79.029 79.029 79.029c18.44 0 35.343-6.366 48.734-16.904c-18.22-14.269-30.074-36.88-30.074-62.125"
      ></path>
      <path
        fill="#5e5e5e"
        d="M255.746 79.029c0 43.685-35.343 79.029-79.029 79.029c-18.44 0-35.343-6.366-48.734-16.904c18.44-14.488 30.075-36.88 30.075-62.125s-11.855-47.637-30.075-62.126C141.373 6.366 158.277 0 176.717 0c43.686 0 79.03 35.563 79.03 79.029"
      ></path>
    </svg>
  );
};

const VisaLogo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="3.09em" height="1em" viewBox="0 0 256 83">
      <defs>
        <linearGradient id="logosVisa0" x1="45.974%" x2="54.877%" y1="-2.006%" y2="100%">
          <stop offset="0%" stopColor="gray"></stop>
          <stop offset="100%" stopColor="gray"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#logosVisa0)"
        d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963zm3.037-21.601l6.265-30.027h-17.158zm-118.599 21.6L88.964 1.246h20.687l17.104 79.963zm-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963z"
        transform="matrix(1 0 0 -1 0 82.668)"
      ></path>
    </svg>
  );
};
