"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Sender = "user" | "ai";

type ChatMessage = {
  message_id: string;
  session_id: string;
  sender: Sender;
  content: string;
  timestamp: string;
};

const RESPONSE_MAP: Record<string, string> = {
  hello: "Hello! How can I help you today?",
  hi: "Hi there! Ask me anything from the available prompts.",
  "how are you": "I am just predefined logic, but I am running smoothly.",
  help: "Try: hello, hi, how are you, pricing, support hours.",
  pricing: "Our starter plan begins at $19 per month.",
  "support hours": "Support is available Monday to Friday, 9 AM to 6 PM.",
};

const DEFAULT_REPLY =
  "I do not have a predefined answer for that yet. Try 'help'.";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

function getReply(input: string): string {
  const normalized = input.trim().toLowerCase();
  return RESPONSE_MAP[normalized] ?? DEFAULT_REPLY;
}

function createMessage(sessionId: string, sender: Sender, content: string): ChatMessage {
  return {
    message_id: crypto.randomUUID(),
    session_id: sessionId,
    sender,
    content,
    timestamp: new Date().toISOString(),
  };
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  useEffect(() => {
    const existing = window.localStorage.getItem("chat_session_id");
    const resolved = existing ?? crypto.randomUUID();

    if (!existing) {
      window.localStorage.setItem("chat_session_id", resolved);
    }

    setSessionId(resolved);

    const loadHistory = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/chat/history?session_id=${encodeURIComponent(resolved)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to load history");
        }

        const history = (await response.json()) as ChatMessage[];
        setMessages(history);
      } catch {
        setMessages([]);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    void loadHistory();
  }, []);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSend || !sessionId) {
      return;
    }

    const userText = input.trim();
    const userMessage = createMessage(sessionId, "user", userText);
    const aiMessage = createMessage(sessionId, "ai", getReply(userText));

    setInput("");
    setIsSending(true);
    setMessages((prev) => [...prev, userMessage, aiMessage]);

    try {
      const payloads = [userMessage, aiMessage];

      await Promise.all(
        payloads.map((message) =>
          fetch(`${API_BASE_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message),
          }),
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900 sm:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-sky-700">Chat with AI</p>
            <h1 className="text-2xl font-bold">Predefined Chat Demo</h1>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back Home
          </Link>
        </div>

        <p className="text-xs text-slate-500">Session ID: {sessionId || "loading..."}</p>

        <section className="h-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
          {isLoadingHistory ? (
            <p className="text-sm text-slate-500">Loading chat history...</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-slate-500">No messages yet. Start the conversation.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.message_id}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "ml-auto bg-sky-600 text-white"
                      : "bg-white text-slate-800 ring-1 ring-slate-200"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      message.sender === "user" ? "text-sky-100" : "text-slate-500"
                    }`}
                  >
                    {message.sender} · {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-200 transition focus:ring"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
