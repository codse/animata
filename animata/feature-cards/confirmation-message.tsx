import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ConfirmationMessageProps {
  /**
   * The message to appear in green box when the process will be successfully completed.
   */
  successMessage: string;

  /**
   * The name of the organization/bot who perform the operations.
   */
  labelName: string;

  /**
   * The brief about the process/text/output.
   */
  labelMessage: string;

  /**
   * Class name for the background element.
   */
  backgroundClassName?: string;

  /**
   * Class name for the container element.
   */
  containerClassName?: string;
}

export default function ConfirmationMessage({
  successMessage = "Process Successful",
  labelName = "Animata",
  labelMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt. Vestibulum eleifend nibh a est tristique sollicitudin.",
  backgroundClassName,
  containerClassName,
}: ConfirmationMessageProps) {
  return (
    <div
      className={cn(
        "storybook-fix group flex items-center justify-center py-24",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 h-full w-full items-center bg-gradient-to-r from-teal-100 to-green-300",
          backgroundClassName,
        )}
      />
      <div className="flex h-64 flex-col items-center justify-center">
        <div className="flex overflow-hidden rounded-full bg-green-600">
          {/* Checkmark */}
          <div className="z-10 flex h-16 w-16 flex-col content-center items-center justify-center rounded-full bg-green-600 text-2xl">
            &#10003;
          </div>

          {/* Expanding green box with sliding text */}
          <motion.div
            className="z-0 flex h-16 overflow-hidden rounded-full bg-green-600"
            initial={{ width: "0rem" }}
            animate={{ width: "auto" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="flex items-center text-nowrap pr-6 text-lg"
              initial={{ x: -1000, zIndex: -10 }}
              animate={{ x: 0, zIndex: 1 }}
              transition={{ duration: 1.0, delay: 0.3 }}
            >
              {successMessage}
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="my-4 flex w-[600px] rounded-lg border border-white/40 bg-gray-100 bg-white/30 p-6 shadow-lg backdrop-blur-md"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
            {labelName[0]}
          </div>
          <div className="text-gray-800">
            <p className="text-xl font-bold text-slate-500">{labelName}</p>
            <motion.p
              className="w-[480px] text-wrap font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.9 }}
            >
              {labelMessage}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
