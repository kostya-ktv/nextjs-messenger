import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()
        const { message, image, conversationId } = body
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 400})
        }
        const newMessage = await prisma?.message.create({
            data: {
                body: message,
                image: image,
                coversation: {
                    connect: {
                       id: conversationId
                   }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        })
        const updatedConversation = await prisma?.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMesageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage!.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })
        return NextResponse.json(newMessage)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Internal error', {status: 500})
    }
}