import prisma from '../libs/prisma.db'

const getMessages = async (conversationId: string) => {
    try {
        return await prisma.message.findMany({
            where: {
                coversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: { createdAt: 'asc' }
        })
    } catch (error) {
        return []
    }
}
export default getMessages