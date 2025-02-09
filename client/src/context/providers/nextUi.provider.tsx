'use client'
import { HeroUIProvider } from "@heroui/react"

const NextUiProvider = ({ children }: { children: React.ReactNode }) => <HeroUIProvider>{children}</HeroUIProvider>

export default NextUiProvider
