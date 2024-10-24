import React from "react";
import { motion } from "framer-motion";

interface UserInfoProps {
  name: string;
  title: string;
  avatar: string;
}

interface NotificationCardProps {
  title: string;
  message: string;
  userInfo: UserInfoProps;
  RosettaLogo: React.FC;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  userInfo,
  RosettaLogo,
}) => {
  return (
    <div className="p-s relative mx-auto mb-28 w-[70%]">
      {/* Notification Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-lg bg-white p-4 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <RosettaLogo />
          <h4 className="text-lg font-semibold text-gray-400">{title}</h4>
        </div>
        <div className="mt-3">
          <p className="ml-12 text-base font-bold leading-relaxed text-black">{message}</p>
        </div>
      </motion.div>

      {/* User Info Section */}
      <div className="flex justify-center">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 80, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="absolute -bottom-8 w-[60%] rounded-full bg-green-600 px-2 py-2 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="h-14 w-14 rounded-full border-2 border-white"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">{userInfo.name}</h4>
              <p className="text-xs text-green-100">{userInfo.title}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationCard;
