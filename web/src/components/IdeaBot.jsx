import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";

const CbtAi = () => {
    const [userInput, setUserInput] = useState("");
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        setLoading(true);
        const timestamp = new Date().toLocaleTimeString();
        const newResponse = { user: userInput, time: timestamp };
        setResponses((prev) => [...prev, newResponse]);
        setUserInput("");

        const apiUrl = "http://192.168.41.209:3000/chat";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = { ai: data.response || "Sorry, I couldn't process that.", time: timestamp };
            setResponses((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error("Error:", error);
            setResponses((prev) => [...prev, { ai: "⚠️ Error: Unable to fetch response.", time: timestamp }]);
        }

        setLoading(false);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [responses]);

    return (
        <>
            <Navbar /><br /><br />
            <div className="ideabot">
            <div className="cbt-ai-container neon-theme">
                <h2 className="cbt-ai-title neon-text neon-glow">💬 AI-Powered Idea-Bot Chat</h2>
                <div className="cbt-ai-chatbox neon-box">
                    {responses.map((res, index) => (
                        <div key={index} className="cbt-ai-message">
                            {res.user && (
                                <p className="cbt-ai-user neon-text">
                                    <strong>🧑 You:</strong> {res.user}
                                    <span className="timestamp"> ⏳... </span>
                                </p>
                            )}
                            {res.ai && (
                                <p className="cbt-ai-ai neon-text">
                                    <strong>🤖 AI:</strong> <ReactMarkdown>{res.ai}</ReactMarkdown>
                                    <span className="timestamp"> </span>
                                </p>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="cbt-ai-loading">
                            <span className="dot neon-glow"></span>
                            <span className="dot neon-glow"></span>
                            <span className="dot neon-glow"></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <form className="cbt-ai-form" onSubmit={handleSubmit}>
                    <div className="cbt-ai-input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Type your thoughts here..."
                            className="cbt-ai-input neon-input"
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                            disabled={loading}
                        />
                        <button type="submit" className="cbt-ai-button neon-button" disabled={loading}>Send</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default CbtAi;