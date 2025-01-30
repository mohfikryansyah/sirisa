import { motion } from "framer-motion";
import "../../../css/bubble-chat.css";
import { cn } from "@/lib/utils";


export default function BubbleText({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            transition={{
                duration: 1,
                scale: {
                    type: "spring",
                },
            }}
            className={cn("talk-bubble tri-right border round btm-left-in absolute bg-sirisa-primary text-white", className)}
        >
            <div className="talktext">
                <p>"{children}"</p>
            </div>
        </motion.div>
    );
}
