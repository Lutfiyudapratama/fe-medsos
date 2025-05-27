import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Favorite,
  Share,
  ExpandMore,
  MoreVert,
  PushPin,
  Add,
} from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const [expanded, setExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "surya",
      date: "September 14, 2016",
      content:
        "MyName is Surya, I am a student at SMK Negeri 1 Cikarang Barat. I am learning to create a web application using ReactJS and Tailwind CSS. This is my first project using these technologies.",
    },
    {
      id: 2,
      name: "surya",
      date: "September 14, 2016",
      content:
        "MyName is Surya, I am a student at SMK Negeri 1 Cikarang Barat. I am learning to create a web application using ReactJS and Tailwind CSS. This is my first project using these technologies.",
    },
  ]);

  const [chats, setChats] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Hanya file JPG dan PNG yang diperbolehkan!');
      e.target.value = "";
      return;
    }
    const imageUrl = URL.createObjectURL(file);

    const duplicate = posts.some((post) => post.image === imageUrl);
    if (duplicate) {
      const confirmPost = window.confirm("Gambar ini sudah digunakan sebelumnya. Tetap posting?");
      if (!confirmPost) return;
    }

    setPostImage(imageUrl);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (postText.trim() === "") return;
    if (!postImage) {
      const confirmPost = window.confirm("Anda tidak menyertakan gambar. Lanjutkan posting?");
      if (!confirmPost) return;
    }
    setPosts([
      {
        id: Date.now(),
        name: "You",
        date: new Date().toLocaleDateString(),
        content: postText,
        image: postImage,
      },
      ...posts,
    ]);
    setPostText("");
    setPostImage(null);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (chatInput.trim() === "") return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChats([
      ...chats,
      {
        id: Date.now(),
        sender: "You",
        text: chatInput,
        time,
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex font-sans">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-48 bg-white flex flex-col z-20 shadow-sm">
        <div className="h-16 flex items-center justify-center font-black text-xl tracking-tight border-b">
          <span className="tracking-tight">FiChatting</span>
        </div>
        <nav className="flex-1 flex flex-col justify-center items-center">
          <ul className="space-y-8 flex flex-col items-center">
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><HomeIcon className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><SearchIcon className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><Add className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><Favorite className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><PersonIcon className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
            <li><button className="rounded-full p-3 hover:bg-neutral-200 transition"><PushPin className="text-neutral-800 text-5xl" fontSize="large" /></button></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen ml-48">
        <header className="fixed top-0 left-48 right-0 h-16 bg-white flex items-center px-8 z-10 shadow-sm"></header>

        <main className="flex-1 flex flex-col pt-24 px-4 sm:px-0 overflow-y-auto items-center">
          <div className="flex flex-col items-center space-y-6 w-full max-w-lg">
            {/* Post Form */}
            <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col border border-neutral-200">
              <form onSubmit={handlePost}>
                <div className="flex items-end gap-3">
                  <img alt="avatar" className="w-10 h-10 rounded-full object-cover border border-neutral-200" src="/default-avatar.png" />
                  <textarea
                    className="flex-1 bg-neutral-100 border-none rounded-xl p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900"
                    rows={3}
                    placeholder="Start a fichatting..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
                <div className="flex items-center mt-2 gap-2">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="block text-sm text-neutral-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 file:text-neutral-700 hover:file:bg-neutral-300"
                  />
                  {postImage && <img alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-neutral-200" src={postImage} />}
                  <button type="submit" className="ml-auto bg-neutral-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-neutral-800 transition">Post</button>
                </div>
              </form>
            </div>

            {/* Post List */}
            {posts.map((post) => (
              <div key={post.id} className="w-full bg-white rounded-2xl shadow border border-neutral-200">
                <div className="flex items-end justify-between p-4 pb-2">
                  <div className="flex items-end">
                    <img src="/default-avatar.png" alt="avatar" className="w-10 h-10 rounded-full object-cover border border-neutral-200" />
                    <div className="ml-3">
                      <div className="font-semibold text-neutral-900">{post.name}</div>
                      <div className="text-xs text-neutral-400">{post.date}</div>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-neutral-700"><MoreVert /></button>
                </div>
                {post.image && <img className="w-full max-h-96 object-cover rounded-xl border-b border-neutral-100" src={post.image} alt="Post" />}
                <div className="px-4 py-3">
                  <p className="text-neutral-800 text-base">{post.content}</p>
                </div>
                <div className="flex items-center px-4 pb-4 gap-2">
                  <button className="rounded-full p-2 text-neutral-500 hover:bg-neutral-200 hover:text-red-500 transition"><Favorite /></button>
                  <button className="rounded-full p-2 text-neutral-500 hover:bg-neutral-200 hover:text-blue-500 transition"><Share /></button>
                  <button className={`ml-auto rounded-full p-2 text-neutral-500 hover:bg-neutral-200 transition ${expanded ? "rotate-180" : ""}`} onClick={() => setExpanded((prev) => !prev)} aria-expanded={expanded} aria-label="show more"><ExpandMore /></button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Chat Sidebar */}
        <aside className="fixed top-24 right-8 w-80 bg-white rounded-2xl shadow-lg border border-neutral-200 flex flex-col z-30 h-[70vh]">
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-semibold text-neutral-800">Chat</span>
            <button className="text-neutral-400 hover:text-neutral-700"><MoreVert /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chats.map((chat) => (
              <div key={chat.id} className={`flex flex-col ${chat.sender === "You" ? "items-end" : "items-start"}`}>
                <div className={`${chat.sender === "You" ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-800"} px-4 py-2 rounded-2xl ${chat.sender === "You" ? "rounded-br-sm" : "rounded-bl-sm"} max-w-[70%]`}>
                  {chat.text}
                </div>
                <span className="text-xs text-neutral-400 mt-1">{chat.sender} • {chat.time}</span>
              </div>
            ))}
          </div>
          <form className="p-3 border-t flex gap-2" onSubmit={handleSendChat}>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-neutral-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-900"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit" className="bg-neutral-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-neutral-800 transition">Send</button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default Home;
