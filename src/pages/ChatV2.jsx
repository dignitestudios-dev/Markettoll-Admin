import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "../constants/BaseUrl";
import {
    collection,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    onSnapshot,
    orderBy,
    query,
    where,
    arrayUnion,
    serverTimestamp,
} from "firebase/firestore";

import ChatSidebar from "../components/ChatV2/ChatSidebar";
import ChatWindow from "../components/ChatV2/ChatWindow";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";

/**
 * Creates or fetches an existing chat room in "chat-v2" collection.
 * Admin side: adminId is the logged-in admin's ID, userId is the target user.
 *
 * @param {Object} params
 * @param {string} params.userId - Target User ID
 * @param {string} params.adminId - Logged-in Admin ID
 * @param {string} [params.userName] - Display name for the chat room
 * @param {string} [params.orderId] - Optional order ID
 * @param {string} [params.initialMessage] - Optional initial message text
 * @returns {Promise<string>} Returns the chat room Document ID
 */
export const createChatRoom = async ({
    userId,
    adminId = "admin_id",
    userName = "User",
    orderId = "1234567",
    initialMessage = "",
}) => {
    try {
        if (!userId) {
            console.error("userId is required to create a chat room");
            return null;
        }

        const chatRef = collection(db, "chat-v2");

        // 1. If orderId provided, check if a room with same order_id already exists
        if (orderId) {
            const orderQuery = query(
                chatRef,
                where("order_id", "==", orderId),
                where("chat_status", "==", true)
            );
            const orderSnapshot = await getDocs(orderQuery);
            if (!orderSnapshot.empty) {
                const existingByOrder = orderSnapshot.docs[0];
                console.log("Chat room already exists for order_id:", orderId, existingByOrder.id);
                return existingByOrder.id;
            }
        }

        // 2. Fallback: check by userId + adminId match
        const q = query(
            chatRef,
            where("user_id", "array-contains", adminId),
            where("chat_status", "==", true)
        );

        const snapshot = await getDocs(q);
        const existingRoom = snapshot.docs.find((docSnap) => {
            const userIds = docSnap.data()?.user_id || [];
            return userIds.includes(userId);
        });

        if (existingRoom) {
            console.log("Chat room already exists:", existingRoom.id);
            return existingRoom.id;
        }

        // Create new chat room
        const newRoomData = {
            user_id: [userId, adminId],
            user_name: userName,
            order_id: orderId,
            chat_status: true,
            is_online: false,
            created_at: serverTimestamp(),
            last_msg: {
                message: initialMessage || "Chat started",
                seen_by: [adminId],
                created_at: serverTimestamp(),
            },
        };

        const newRoomRef = await addDoc(chatRef, newRoomData);
        

        if (initialMessage) {
            const messagesRef = collection(doc(db, "chat-v2", newRoomRef.id), "messages");
            await addDoc(messagesRef, {
                message: initialMessage,
                sender_id: adminId,
                seen_by: [adminId],
                created_at: serverTimestamp(),
            });
        }

        return newRoomRef.id;
    } catch (error) {
        console.error("Error in createChatRoom:", error);
        throw error;
    }
};

const ChatV2Page = () => {
    const { isUserData } = useContext(AuthContext);
    // Admin's own ID from cookie/context
    const currentUserId = isUserData?._id || isUserData?.id || isUserData?.user?._id || isUserData?.user?.id || "admin_id";
    const [usersList, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileChat, setShowMobileChat] = useState(false);

    const handleSelectUser = async (userItem) => {
        setSelectedUser(userItem);
        setShowMobileChat(true);

        const targetId = userItem?.id || userItem?._id;
        const seenBy = userItem?.last_msg?.seen_by || [];

        // Mark as seen on Firestore when admin opens the chat
        if (currentUserId && targetId && (!Array.isArray(seenBy) || (!seenBy.includes(currentUserId) && !seenBy.includes("admin_id")))) {
            try {
                const userDocRef = doc(db, "chat-v2", String(targetId));
                await updateDoc(userDocRef, {
                    "last_msg.seen_by": arrayUnion(currentUserId),
                });
            } catch (e) {
                console.error("Error updating seen_by:", e);
            }
        }
    };

    // Handler to create chat room from "+ New Chat" button
    const handleCreateChat = async ({ userName, targetUserId, orderId, initialMessage }) => {
        const roomId = await createChatRoom({
            userId: targetUserId || "user_id",
            adminId: currentUserId || "admin_id",
            userName: userName,
            orderId: orderId,
            initialMessage: initialMessage,
        });
        return roomId;
    };

    const getChatTimestamp = (chat) => {
        const lastMsgTime = chat?.last_msg?.created_at || chat?.created_at || chat?.updatedAt;
        if (!lastMsgTime) return 0;
        if (typeof lastMsgTime?.toMillis === "function") {
            return lastMsgTime.toMillis();
        }
        if (typeof lastMsgTime?.seconds === "number") {
            return lastMsgTime.seconds * 1000 + Math.floor((lastMsgTime.nanoseconds || 0) / 1000000);
        }
        if (lastMsgTime instanceof Date) {
            return lastMsgTime.getTime();
        }
        if (typeof lastMsgTime === "number") {
            return lastMsgTime;
        }
        if (typeof lastMsgTime === "string") {
            const parsed = Date.parse(lastMsgTime);
            return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
    };

    // 1. Fetch all chat rooms where chat_status == true for Admin
    useEffect(() => {
        const chatRef = collection(db, "chat-v2");

        const q = query(
            chatRef,
            where("chat_status", "==", true)
        );
        console.log(q, "admin q");
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const chats = snapshot.docs
                    .map((docSnap) => ({
                        ...docSnap.data(),
                        id: docSnap.id,
                    }))
                    .filter((c) => c.chat_status === true);

                chats.sort((a, b) => getChatTimestamp(b) - getChatTimestamp(a));

                setUsersList(chats);

                if (chats.length > 0) {
                    setSelectedUser((prev) => {
                        if (!prev) return chats[0];
                        const found = chats.find(
                            (c) => (c.id || c._id) === (prev.id || prev._id)
                        );
                        return found || chats[0];
                    });
                } else {
                    setSelectedUser(null);
                }
            },
            (error) => {
                console.error("Error listening to chat-v2 collection:", error);
            }
        );

        return () => unsubscribe();
    }, []);


    // 2. Fetch messages inside selectedUser's "messages" subcollection
    useEffect(() => {
        const targetId = selectedUser?.id || selectedUser?._id;
        if (!targetId) {
            setMessages([]);
            return;
        }

        const userDocRef = doc(db, "chat-v2", String(targetId));
        const messagesRef = collection(userDocRef, "messages");

        let q;
        try {
            q = query(messagesRef, orderBy("created_at"));
        } catch (e) {
            q = query(messagesRef);
        }

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const msgs = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));

                msgs.sort((a, b) => {
                    const getSecs = (item) => {
                        if (item.created_at?.seconds) return item.created_at.seconds;
                        if (item.createdAt?.seconds) return item.createdAt.seconds;
                        if (typeof item.created_at?.toDate === "function") return item.created_at.toDate().getTime() / 1000;
                        if (typeof item.createdAt?.toDate === "function") return item.createdAt.toDate().getTime() / 1000;
                        // Pending serverTimestamp → sort at end (Infinity), not start (0)
                        return Infinity;
                    };
                    return getSecs(a) - getSecs(b);
                });

                setMessages(msgs);
            },
            (error) => {
                console.error("Error listening to messages subcollection:", error);
            }
        );

        return () => unsubscribe();
    }, [selectedUser?.id, selectedUser?._id]);

    // 3. Handle sending message (admin sends)
    const handleSendMessage = async (text) => {
        const targetId = selectedUser?.id || selectedUser?._id;
        if (!text.trim() || !targetId) return;

        const senderId = currentUserId || "admin_id";

        try {
            const userDocRef = doc(db, "chat-v2", String(targetId));
            const messagesRef = collection(userDocRef, "messages");

            const newMsgData = {
                message: text,
                created_at: serverTimestamp(),
                sender_id: senderId,
                seen_by: [senderId],
            };

            await addDoc(messagesRef, newMsgData);

            await updateDoc(userDocRef, {
                last_msg: {
                    message: text,
                    seen_by: [senderId],
                    created_at: serverTimestamp(),
                },
            });
        } catch (error) {
            console.error("Error sending message to chat-v2:", error);
        }
    };

    // Handle uploading and sending image attachments for Admin
    const handleSendImage = async (files) => {
        const targetId = selectedUser?.id || selectedUser?._id;
        if (!files || files.length === 0 || !targetId) return;

        const senderId = currentUserId || "admin_id";

        try {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append("attachments", file);
                formData.append("type", 'png');
            });
            const token = Cookies.get("token");

            const response = await axios.post(
                `${BASE_URL}/users/upload-chat-attachments`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                }
            );

            // Extract image URLs from API response
            let imageUrls = [];
            const resData = response?.data;
            if (Array.isArray(resData?.data)) {
                imageUrls = resData.data;
            } else if (typeof resData?.data === "string") {
                imageUrls = [resData.data];
            } else if (Array.isArray(resData?.urls)) {
                imageUrls = resData.urls;
            } else if (Array.isArray(resData)) {
                imageUrls = resData;
            } else if (typeof resData?.url === "string") {
                imageUrls = [resData.url];
            }

            if (!imageUrls || imageUrls.length === 0) {
                console.error("No image URLs returned from upload API:", response.data);
                return;
            }

            const userDocRef = doc(db, "chat-v2", String(targetId));
            const messagesRef = collection(userDocRef, "messages");

            for (const url of imageUrls) {
                await addDoc(messagesRef, {
                    message: url,
                    contentType: "image",
                    created_at: serverTimestamp(),
                    sender_id: senderId,
                    seen_by: [senderId],
                });

                await updateDoc(userDocRef, {
                    last_msg: {
                        message: "Photo",
                        seen_by: [senderId],
                        created_at: serverTimestamp(),
                    },
                });
            }
        } catch (error) {
            console.error("Error uploading & sending image to chat-v2:", error);
        }
    };

    // Filter users by search query
    const filteredUsers = usersList.filter((u) => {
        const name = u?.user_name || u?.name || "";
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    console.log(filteredUsers, "filteredUsers==");
    return (
        <div className="py-4 lg:py-8 px-4 lg:px-8 min-h-screen bg-[#F8F9FB] flex items-center justify-center">
            {/* Outer Card Container */}
            <div className="w-full max-w-[1320px] bg-white rounded-[24px] lg:rounded-[32px] p-4 lg:p-6 shadow-sm border border-gray-100 min-h-[82vh] h-auto lg:h-[82vh] flex flex-col overflow-hidden">
                <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full min-h-0 overflow-hidden">
                    {/* Left Sidebar */}
                    <div
                        className={`lg:col-span-4 h-full min-h-0 flex flex-col overflow-hidden ${showMobileChat ? "hidden lg:flex" : "flex"}`}
                    >
                        <ChatSidebar
                            users={filteredUsers}
                            selectedUser={selectedUser}
                            onSelectUser={handleSelectUser}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onCreateChat={handleCreateChat}
                            currentUserId={currentUserId}
                        />
                    </div>

                    {/* Right Main Chat Window */}
                    <div
                        className={`lg:col-span-8 h-full min-h-0 flex flex-col overflow-hidden ${showMobileChat ? "flex" : "hidden lg:flex"}`}
                    >
                        <ChatWindow
                            selectedUser={selectedUser}
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            onSendImage={handleSendImage}
                            currentUserId={currentUserId}
                            onBackMobile={() => setShowMobileChat(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatV2Page;
