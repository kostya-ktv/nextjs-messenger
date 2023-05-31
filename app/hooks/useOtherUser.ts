import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | {users: User[]}) => {
        const session = useSession()
        return useMemo(() => {
            const currentUserEmail = session?.data?.user?.email
            return conversation.users.filter(user => user.email !== currentUserEmail)[0]
            
        }, [session.data?.user?.email, conversation.users])
    
}
export default useOtherUser