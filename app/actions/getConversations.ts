import prisma from '../libs/prisma.db'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) return []
    try {
        return await prisma.conversation.findMany({
            orderBy: {
                lastMesageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true, seen: true
                    }
                }
            }
        })

    } catch (error) {
        return []
    }
}
export default getConversations