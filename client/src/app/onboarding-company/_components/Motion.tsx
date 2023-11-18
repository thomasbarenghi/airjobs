'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const Motion = ({ children }: Props) => (
  <motion.div
    initial={{ x: -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.7 }}
    className='h-auto w-screen bg-white'
  >
    {children}
  </motion.div>
)

export default Motion
