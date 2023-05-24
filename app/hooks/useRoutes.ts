import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import useConversation from './useConversation'
import { useMemo } from 'react'
import { IconType } from 'react-icons'

export interface IRoute { 
    label: string
    href: string
    icon: IconType
    active: boolean
    onClick?: Function
}
const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId} = useConversation()

    return useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut()
        },
    ] as IRoute[],[pathname, conversationId])
}
export default useRoutes