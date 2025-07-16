import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { SendHorizonal, ArrowLeft } from "lucide-react";

const messagesData = [
  { id: 1, sender: "user", text: "Hi! Is this artwork still available?" },
  { id: 2, sender: "artist", text: "Yes! It's still up for bidding." },
];

const contacts = [
  { id: 1, name: "Emma White", lastMessage: "Sure! It's oil on canvas." },
  { id: 2, name: "Leo Waters", lastMessage: "Thanks for your bid!" },
  { id: 3, name: "Mira Blue", lastMessage: "Let me check and get back." },
];

const Messages = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [showChatList, setShowChatList] = useState(false); // mobile toggle

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "user", text: input }]);
    setInput("");
  };

  return (
    <main className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-20 px-4 md:px-8 lg:px-24 overflow-hidden mb-4">
        <div className="flex h-[75vh] border dark:border-gray-700 rounded-lg overflow-hidden dark:bg-gray-800">
          {/* Sidebar (Desktop & Mobile Toggle) */}
          <aside
            className={`w-full md:w-1/3 bg-white dark:bg-gray-900 p-4 overflow-y-auto border-r dark:border-gray-700 z-10 absolute md:static top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
              showChatList ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            {/* Mobile Back Button */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowChatList(false)}
                className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="inline-block w-4 h-4 mr-1" />
                Back to chat
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-4">Chats</h2>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  setShowChatList(false);
                }}
                className="mb-3 p-3 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {contact.lastMessage}
                </p>
              </div>
            ))}
          </aside>

          {/* Chat Window */}
          <div className="flex flex-col flex-1 relative">
            {/* Header */}
            <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{selectedContact.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
              </div>

              {/* Mobile Chat List Toggle */}
              <button
                onClick={() => setShowChatList(true)}
                className="md:hidden text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                Chats
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
                    msg.sender === "user"
                      ? "ml-auto bg-primary text-white"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-gray-800 dark:bg-gray-800 text-black dark:text-white rounded-full px-4 py-2 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition"
              >
                <SendHorizonal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Messages;
