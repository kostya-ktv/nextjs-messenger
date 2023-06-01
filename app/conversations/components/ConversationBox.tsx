"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import Avatar from "@/components/Avatar";

interface IConversationBox {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<IConversationBox> = ({ data, selected }) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;
    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    return lastMessage?.image
      ? "Sent an image"
      : lastMessage?.body
      ? lastMessage?.body
      : "Started a conversation";
  }, [lastMessage]);
  return (
    <div
      className={clsx(
        ` w-full relative flex items-center space-x-3 
        hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p
                className="
                            text-xs
                            text-gray-400
                            font-light
                          "
              >
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              ` truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
