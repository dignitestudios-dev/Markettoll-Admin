import React, { useContext, useEffect, useState } from "react";
import { MdSend} from "react-icons/md";
import { addDoc, collection, db, getDocs, query } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";

function ChatUIComponent() {
  const {isUserData}=useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId,setChatId]=useState("");

  const handleMessage = async () => {
    if (message.trim() === "") return;
    const chat_id =chatId?.chatId;
    const messageData = {
      senderId: isUserData?._id,
      text: message,
      timestamp: new Date().toISOString(),
    };

    try {
      const messagesRef = collection(db, "Adminchats",chat_id, "messages");
      await addDoc(messagesRef, messageData);
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
   
  const fetchMessages = async () => {
    const messagesRef = collection(db, "Adminchats", chatId?.chatId, "messages");

    try {
      const messagesQuery = query(messagesRef);
      const querySnapshot = await getDocs(messagesQuery);

      const messagesList = querySnapshot.docs.map((doc) => doc.data());
      console.log(messagesList, "messageList");

      setMessages(messagesList);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };
   
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, "userChats"));
        const querySnapshot = await getDocs(usersQuery);
        
        const usersList = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }; 
        });
        setUsers(usersList); 
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(()=>{
    fetchMessages();
  },[chatId])
  

  return (
    <div className="grid grid-cols-[400px_1fr] h-[100%]">
    <div className="flex flex-col w-[400px] max-h-[600px] border-r-2 overflow-y-auto">
      {/* search compt */}
      <div className="border-b-2 py-4 px-2">
        <input
          type="text"
          placeholder="search chatting"
         className="flex-1 p-2 border-2 w-full rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50"
        />
      </div>
      {/* end search compt */}
      {/* user list */}
      {
        users?.map((item)=>(
          <div onClick={()=>{
            setChatId(item);            
            }} className="flex gap-2 flex-row py-4 px-2 justify-center items-center border-b-2">
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{item?.user?.name}</div>
          <span className="text-gray-500">{item?.lastMessage}</span>
        </div>
      </div>
        ))
      }
      
      {/* end user list */}
    </div>
  
    <div className="flex flex-col w-full mx-auto border rounded-lg">
      {
        chatId&&(
          <>     
          <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
                alt="Avatar"
                className="w-10 object-cover rounded-full"
              />
              <span className="ml-2 font-semibold">{chatId?.user?.name}</span>
            </div>
          </header>
      
          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 description-scroll max-h-[450px]">
            {messages.map((item,i) => (
              <div
                key={i}
                className={`flex ${item?.senderId == isUserData?._id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    item?.senderId != isUserData?._id ? "bg-blue-200" : "bg-green-200"
                  } max-w-[80%]`}
                >
                  <p>{item?.text}</p>
                </div>
              </div>
            ))}
          </div>
      
          {/* Input Area */}
          <div className="p-4 flex items-center bg-gray-100 border-t border-gray-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50"
            />
            <button onClick={handleMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
              <MdSend />
            </button>
          </div>
         </>
        )
      }
    
    </div>
  </div>
  
  );
}

export default ChatUIComponent;
