'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react"
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    className?: string
    isOpen?: boolean
    title?: string
    onClickConfirmation?: () => void
    closeModal?: () => void

}

const ModalConfirmation: FC<ModalProps> = ({ className, isOpen, title, onClickConfirmation, closeModal }) => {

    return (
        <AnimatePresence>
            {isOpen && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="transition-all duration-500"
            >
                <div className="fixed w-full h-full bg-black opacity-20 top-0 left-0" onClick={closeModal} />
                <dialog open className={`${className || ''} py-12 px-10 rounded-2xl flex flex-col gap-5 bottom-1/2`}>
                    <span className="text-[24px] max-w-[300px] text-gray-600 text-center font-semibold">{title}</span>
                    <div onClick={closeModal} className="absolute p-2 top-3 right-3 cursor-pointer hover:bg-gray-300 rounded-full transition-all duration-300">
                        <IoMdClose size={25} />
                    </div>
                    <button onClick={() => onClickConfirmation && onClickConfirmation()} className="btn-primary">Confirmar</button>
                </dialog>
            </motion.div>
            }
        </AnimatePresence>

    )
}

export default ModalConfirmation