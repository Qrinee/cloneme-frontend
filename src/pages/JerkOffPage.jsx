import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthFetch } from "@/utils/authFetch";
import { useLayoutContext } from "@/components/LayoutContext";
import Layout from "@/components/Layout";
import DialogMessageLimit from "@/components/DialogMessageLimit";
import ActionPanel from "./jerkoff/ActionPanel";
import LoginRequiredDialog from "@/components/LoginRequiredDialog";
import { LevelUpNotification, UnlockModal } from "./jerkoff/Modals";
import JerkOffVideo from "./jerkoff/JerkOffVideo";
import ChatOverlay from "./jerkoff/ChatOverlay";

export default function JerkOffPage() {
  const { id } = useParams();
  const authFetch = useAuthFetch();
  const { 
    isLoggedIn,
    isGuest: contextIsGuest,
    setIsGuest: setContextIsGuest,
    messagesRemaining: contextMessagesRemaining,
    setMessagesRemaining: setContextMessagesRemaining,
    messagesUsed,
    updateGuestConversation,
    guestConversations
  } = useLayoutContext();
  
  const [girls, setGirls] = useState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [incomingAiMessages, setIncomingAiMessages] = useState(0);
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [likeAnimation, setLikeAnimation] = useState(false);
  
  // Guest mode state
  const [messagesRemaining, setMessagesRemaining] = useState(contextMessagesRemaining);
  const [isGuest, setIsGuest] = useState(contextIsGuest);
  const [showLimitExceeded, setShowLimitExceeded] = useState(false);
  const [showGuestLimit, setShowGuestLimit] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [limitErrorMessage, setLimitErrorMessage] = useState("You've used all your guest messages. Log in to continue chatting without limits.");
  
  // Relationship progression
  const [relationshipLevel, setRelationshipLevel] = useState(1);
  const [relationshipXP, setRelationshipXP] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [newUnlock, setNewUnlock] = useState(null);
  
  const xpPerLevel = (level) => Math.floor(100 * Math.pow(1.5, level - 1));
  const progressPercent = Math.min((relationshipXP / xpPerLevel(relationshipLevel)) * 100, 100);

  useEffect(() => {
    setIsGuest(contextIsGuest);
    setMessagesRemaining(contextMessagesRemaining);
  }, [contextIsGuest, contextMessagesRemaining]);

  useEffect(() => {
    if (id && guestConversations[id]) {
      setMessages(guestConversations[id]);
    }
  }, [id, guestConversations]);

  useEffect(() => {
    if (id) {
      // Direct use of VITE_API_URL for girlfriend info
      const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
      fetch(`${apiUrl}/girlfriends/${id}`)
        .then(res => res.json())
        .then(data => {
          setGirls(data);
          if ((!isLoggedIn || contextIsGuest) && data.girlfriend?.initialMessage) {
            if (!guestConversations[id] || guestConversations[id].length === 0) {
              const initialMsg = {
                id: 1,
                text: data.girlfriend.initialMessage,
                sender: "girl",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setMessages([initialMsg]);
              updateGuestConversation(id, [initialMsg], contextMessagesRemaining);
            }
          }
        })
        .catch(err => console.error('Error fetching girlfriend:', err));

      fetchChatMessages();
    }
  }, [id]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const originalTitle = document.title;
    const handleBlur = () => { document.title = "Don't leave me alone! 💕"; };
    const handleFocus = () => { document.title = originalTitle; };
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.title = originalTitle;
    };
  }, []);

  const fetchChatMessages = async () => {
    try {
      const baseUrl = import.meta.env.VITE_URL || '';
      const res = await authFetch(`${baseUrl}/api/chats/${id}`);
      
      if (res.status === 401) {
        if (!isLoggedIn) {
          setIsGuest(true);
          setContextIsGuest(true);
          setMessagesRemaining(5);
          setContextMessagesRemaining(5);
        }
        try {
          const data = await res.json();
          if (data.guest) {
            setMessagesRemaining(data.messagesRemaining);
            setContextMessagesRemaining(data.messagesRemaining);
            if (data.messages && Array.isArray(data.messages)) {
              const loadedMessages = data.messages.map((m, index) => ({
                id: m._id || index,
                text: m.content,
                sender: m.role === "user" ? "user" : "girl",
                time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'now'
              }));
              setMessages(loadedMessages);
              updateGuestConversation(id, loadedMessages, data.messagesRemaining);
            }
          }
        } catch (e) { console.log('Could not parse 401 response'); }
        return;
      }
      
      const data = await res.json();
      
      if (!isLoggedIn && data.guest) {
        setIsGuest(true);
        setContextIsGuest(true);
        setMessagesRemaining(data.messagesRemaining);
        setContextMessagesRemaining(data.messagesRemaining);
        if (data.messages && Array.isArray(data.messages)) {
          const loadedMessages = data.messages.map((m, index) => ({
            id: m._id || index,
            text: m.content,
            sender: m.role === "user" ? "user" : "girl",
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'now'
          }));
          setMessages(loadedMessages);
          updateGuestConversation(id, loadedMessages, data.messagesRemaining);
        }
        return;
      }
      
      if (data.type === "success") {
        const rawMessages = data.chat.messages || [];
        const uniqueMessages = [];
        const seenIds = new Set();
        
        rawMessages.forEach((m, index) => {
          const id = m._id || `remote-${index}`;
          if (!seenIds.has(id)) {
            seenIds.add(id);
            uniqueMessages.push({
              id: id,
              text: m.content,
              sender: m.role === "user" ? "user" : "girl",
              time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'now'
            });
          }
        });
        setMessages(uniqueMessages);
      }
      
      // Fetch relationship progress
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
        const progressRes = await authFetch(`${apiUrl}/girlfriends/${id}/progress`);
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          if (progressData.type === "success") {
            setRelationshipLevel(progressData.level);
            setRelationshipXP(progressData.xp);
          }
        }
      } catch (e) { console.error("Error fetching relationship progress:", e); }
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !id) return;

    if (isGuest && !isLoggedIn && messagesRemaining <= 0) {
      setShowLimitExceeded(true);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setIsTyping(true);
    setIncomingAiMessages(0);

    try {
      const baseUrl = import.meta.env.VITE_URL || '';
      const res = await authFetch(
        `${baseUrl}/api/chats/${id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: { content: message } })
        }
      );

      if (res.status === 401) {
        if (!isLoggedIn) {
          setIsGuest(true);
          setContextIsGuest(true);
        }
        try {
          const data = await res.json();
          if (data.guest) {
            setMessagesRemaining(data.messagesRemaining);
            setContextMessagesRemaining(data.messagesRemaining);
            if (data.messages && Array.isArray(data.messages)) {
              const newMessages = data.messages.map((m, index) => ({
                id: m._id || Date.now() + index,
                text: m.content,
                sender: m.role === "user" ? "user" : "girl",
                time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }));
              setMessages(newMessages);
              updateGuestConversation(id, newMessages, data.messagesRemaining);
            }
          }
        } catch (e) { console.log('Could not parse 401 response'); }
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      const data = await res.json();
      
      if (res.status === 403 && data.message?.includes("Limit exceeded")) {
        setLimitErrorMessage(data.message);
        setShowLoginDialog(true);
        setIsLoading(false);
        setIsTyping(false);
        if (data.messagesUsed !== undefined) setMessagesUsed(data.messagesUsed);
        return;
      }

      if (data.type === "error") {
        const errorMsg = data.message || "Message limit reached. Upgrade to premium for unlimited messages.";
        setLimitErrorMessage(errorMsg);
        
        if (!isLoggedIn && (errorMsg.toLowerCase().includes("log in") || errorMsg.toLowerCase().includes("login") || errorMsg.includes("Limit exceeded"))) {
          setShowLoginDialog(true);
        } else {
          setShowLimitExceeded(true);
        }
        
        setIsLoading(false);
        setIsTyping(false);
        if (data.messagesUsed !== undefined) setMessagesUsed(data.messagesUsed);
        return;
      }
      
      if (!isLoggedIn && data.guest) {
        setIsGuest(true);
        setContextIsGuest(true);
        setMessagesRemaining(data.messagesRemaining);
        setContextMessagesRemaining(data.messagesRemaining);
        if (data.messages && Array.isArray(data.messages)) {
          const newMessages = data.messages.map((m, index) => ({
            id: m._id || Date.now() + index,
            text: m.content,
            sender: m.role === "user" ? "user" : "girl",
            time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setMessages(newMessages);
          updateGuestConversation(id, newMessages, data.messagesRemaining);
        }
        setIsTyping(false);
        return;
      }
      
      if (data.type === "success") {
        const previousMessageCount = messages.length;
        const newAiMessages = data.chat.messages.slice(previousMessageCount).filter(m => m.role !== "user");
        const newAiMessagesCount = data.newAiMessagesCount || newAiMessages.length;
        setIncomingAiMessages(newAiMessagesCount);
        
        if (newAiMessages.length > 0) {
          let delay = 0;
          newAiMessages.forEach((msg, index) => {
            setTimeout(() => {
              const aiMessage = {
                id: msg._id || Date.now() + Math.random(),
                text: msg.content,
                sender: "girl",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setMessages(prev => [...prev, aiMessage]);
              setIncomingAiMessages(prev => Math.max(0, prev - 1));
              if (index === newAiMessages.length - 1) {
                setIsTyping(false);
              }
            }, delay);
            const typingSpeed = 3 + Math.random() * 2;
            delay += Math.max(800, (msg.content.length / typingSpeed * 1000));
          });
        } else {
          setIsTyping(false);
        }
        
        if (data.relationshipProgress) {
          const { level, xp } = data.relationshipProgress;
          if (level !== relationshipLevel) {
            setRelationshipLevel(level);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 3000);
          }
          setRelationshipXP(xp);
        }
        
        if (data.newUnlocks && data.newUnlocks.length > 0) {
          setNewUnlock(data.newUnlocks[0]);
          setShowUnlockModal(true);
          setTimeout(() => setShowUnlockModal(false), 4000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/v1';
      await authFetch(`${apiUrl}/users/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ girlfriendId: girls?.girlfriend?._id })
      });
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSendMessage();

  return (
    <Layout>

      <DialogMessageLimit
        open={showLimitExceeded}
        onOpenChange={setShowLimitExceeded}
        messagesUsed={messagesUsed || 0}
        messageLimit={5}
        onUpgrade={() => window.location.href = '/premium'}
      />

      <LoginRequiredDialog 
        open={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
        message={limitErrorMessage}
      />
      
      {girls && (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0f]">
          <div className="flex flex-col md:flex-row w-full max-w-[1400px] h-full md:h-[85vh] justify-center items-center md:items-stretch gap-0">
            {/* Main Content - Video with Chat */}
            <div className="w-full md:w-[550px] relative flex flex-col border-x border-white/5 h-full">

              <JerkOffVideo
                girlfriend={girls.girlfriend}
                videoRef={videoRef}
                likeAnimation={likeAnimation}
                setLikeAnimation={setLikeAnimation}
                onAddFavorite={handleAddFavorite}
              />
              <ChatOverlay
                messages={messages}
                isTyping={isTyping}
                incomingAiMessages={incomingAiMessages}
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                onKeyPress={handleKeyPress}
                isLoggedIn={isLoggedIn}
                isGuest={isGuest}
                messagesRemaining={messagesRemaining}
                isLoading={isLoading}
                chatContainerRef={chatContainerRef}
              />
            </div>

            {/* Action Panel */}
            <ActionPanel
              messages={messages}
              relationshipLevel={relationshipLevel}
              relationshipXP={relationshipXP}
              xpPerLevel={xpPerLevel}
              progressPercent={progressPercent}
            />
          </div>
        </div>
      )}

      <LevelUpNotification show={showLevelUp} level={relationshipLevel} />
      <UnlockModal show={showUnlockModal} unlock={newUnlock} onClose={() => setShowUnlockModal(false)} />
    </Layout>
  );
}