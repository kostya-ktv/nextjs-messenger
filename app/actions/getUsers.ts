import prisma from '../libs/prisma.db'
import getSession from './getSessions'

const getUsers = async () => {
    const session = await getSession()
    if (!session?.user?.email) return []
    
    try {
        return await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                
                NOT: {
                    email: session.user.email
                }
            }
        })
    } catch (error) {
        return []
    }
}
export default getUsers