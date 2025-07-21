"use client";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import React, { useState, useRef, useEffect } from "react";

import { callChatApi, systemPrompt } from "@/components/chatApi";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { BackgroundWords } from "@/components/BackgroundWords";
import { projectList } from "@/components/list/ProjectList";

function ProjectCarousel() {
  const [idx, setIdx] = useState(0);
  const cur = projectList[idx];
  const prev = () => setIdx((i) => (i === 0 ? projectList.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === projectList.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full max-w-5xl flex items-center justify-center gap-6 mt-8">
      {/* 左按钮 */}
      <button
        aria-label="上一个案例"
        className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-2xl bg-white hover:bg-gray-100 transition"
        onClick={prev}
      >
        &#8592;
      </button>
      {/* 内容卡片 */}
      <div className="flex-1 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center overflow-hidden min-h-[340px]">
        {/* 媒体区 */}
        <div className="w-full md:w-1/2 aspect-video flex items-center justify-center bg-black/10 relative">
          {cur.type === "video" ? (
            <video
              controls
              className="w-full h-full object-cover rounded-none md:rounded-l-3xl"
              poster="/images/garbage.png"
              src={cur.src}
            >
              <track kind="captions" label="无字幕" />
            </video>
          ) : (
            <img
              alt={cur.title}
              className="w-full h-full object-contain bg-white rounded-none md:rounded-l-3xl"
              src={cur.src}
            />
          )}
        </div>
        {/* 文本区 */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="font-black text-2xl mb-4">{cur.title}</div>
          <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
            {cur.desc}
          </div>
        </div>
      </div>
      {/* 右按钮 */}
      <button
        aria-label="下一个案例"
        className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-2xl bg-white hover:bg-gray-100 transition"
        onClick={next}
      >
        &#8594;
      </button>
    </div>
  );
}

export default function Home() {
  // 通用平滑滚动方法
  const handleScrollToNext = (id: string) => (e?: React.MouseEvent | Event) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const el = document.getElementById(id);

    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // 聊天相关状态
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "您好！我是Simple Way AI的智能助手，很高兴为您服务。",
      type: "assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [typing, setTyping] = useState(""); // 打字机效果内容
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0); // 轮播索引
  const cur = projectList[carouselIdx];
  const prev = () =>
    setCarouselIdx((i) => (i === 0 ? projectList.length - 1 : i - 1));
  const next = () =>
    setCarouselIdx((i) => (i === projectList.length - 1 ? 0 : i + 1));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showChat && inputRef.current) inputRef.current.focus();
  }, [showChat]);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // 打字机效果函数
  const typeWriter = (text: string, onFinish: () => void) => {
    let i = 0;

    function type() {
      setTyping(text.slice(0, i + 1));
      if (i < text.length - 1) {
        i++;
        typingTimeout.current = setTimeout(type, 18 + Math.random() * 40);
      } else {
        onFinish();
      }
    }
    type();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputValue.trim(),
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setTyping("");

    const apiMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((m) => ({
        role: m.type === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
      { role: "user" as const, content: userMessage.content },
    ];

    try {
      const aiReply = await callChatApi(apiMessages);

      typeWriter(aiReply, () => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, content: aiReply, type: "assistant" },
        ]);
        setTyping("");
        setIsLoading(false);
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          content: "抱歉，AI服务暂时不可用。",
          type: "assistant",
        },
      ]);
      setIsLoading(false);
      setTyping("");
    }
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  return (
    <>
      <BackgroundWords />
      <section className="relative z-10 flex flex-col items-center justify-around gap-8 min-h-screen py-12 md:py-20">
        {/* 主标题区域 */}
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className={title()}>化繁为简 · &nbsp;</span>
            <span className={title({ color: "violet" })}>Simple Way&nbsp;</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            <span className={title()}>为商业提供便捷</span>
          </h2>
          <div className={subtitle({ class: "mt-6 text-xl" })}>
            直达命脉 · 让技术更简单
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            onClick={handleScrollToNext("about")}
          >
            了解我们
          </button>
          <Link
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href="/team"
          >
            团队介绍
          </Link>
          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </section>

      {/* 关于我们区块 */}
      <section
        className="relative z-10 flex flex-col items-center justify-around py-32 px-4 md:px-12 overflow-hidden"
        id="about"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-6xl font-bold mb-12 w-full text-center relative">
          <span className={title()}>关于我们</span>
        </h2>
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto relative transform hover:scale-102 transition-transform duration-300">
          <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">
            我们是一群追逐AI浪潮的梦想家和实干家。
          </div>
          <div className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 px-4 md:px-0">
            汇聚自世界顶尖学府的技术团队，我们不仅精通前沿算法，更懂得如何将创新转化为价值。
            从语言模型到计算机视觉，从全栈开发到系统架构，我们的专业广度与技术深度让每个项目都能得到最优解决方案。
          </div>
        </div>
        <div className="flex flex-col items-center mt-12 md:mt-0 md:items-center relative">
          <Link
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
            href="/team"
          >
            了解我们的团队
            <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* 我们能做什么区块锚点 */}
      <section
        className="relative z-10 flex flex-col items-center justify-around py-32 px-4 md:px-12 bg-gradient-to-b from-white to-gray-50"
        id="capabilities-section"
      >
        <h2 className="text-4xl font-bold mb-16 w-full text-center relative">
          <span className={title()}>我们能做什么？</span>
          <div className="mt-6">
            <span className={subtitle({ class: "text-xl md:text-2xl" })}>
              用AI的力量，为企业插上数字化转型的翅膀
            </span>
          </div>
        </h2>

        {/* 三栏服务内容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {/* AI 服务 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-primary/20">
            <div className="text-blue-600 bg-blue-100 rounded-xl px-6 py-3 font-semibold text-lg inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              AI
            </div>
            <h3 className="font-black text-2xl mb-2 group-hover:text-blue-600 transition-colors">
              AI模型定制
            </h3>
            <p className="text-gray-600 mb-6">大语言模型微调与部署</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                  —
                </span>
                企业知识库构建
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                  —
                </span>
                场景化模型训练
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                  —
                </span>
                私有化部署方案
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-blue-400">
                  —
                </span>
                成本效益优化
              </li>
            </ul>
            <div className="pt-6 border-t border-gray-100">
              <p className="text-gray-800 group-hover:text-blue-600 transition-colors">
                让AI真正理解您的业务，成为企业的智慧大脑
              </p>
            </div>
          </div>

          {/* Dev 服务 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-purple-500/20">
            <div className="text-purple-700 bg-purple-100 rounded-xl px-6 py-3 font-semibold text-lg inline-block mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              Dev
            </div>
            <h3 className="font-black text-2xl mb-2 group-hover:text-purple-600 transition-colors">
              全栈开发服务
            </h3>
            <p className="text-gray-600 mb-6">一站式软件解决方案</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-purple-400">
                  —
                </span>
                Web应用开发
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-purple-400">
                  —
                </span>
                移动端开发
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-purple-400">
                  —
                </span>
                系统架构设计
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-purple-400">
                  —
                </span>
                数据管道搭建
              </li>
            </ul>
            <div className="pt-6 border-t border-gray-100">
              <p className="text-gray-800 group-hover:text-purple-600 transition-colors">
                将创新理念转化为实用工具，提升业务效率
              </p>
            </div>
          </div>

          {/* DX 服务 */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-green-500/20">
            <div className="text-green-700 bg-green-100 rounded-xl px-6 py-3 font-semibold text-lg inline-block mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              DX
            </div>
            <h3 className="font-black text-2xl mb-2 group-hover:text-green-600 transition-colors">
              数字化转型咨询
            </h3>
            <p className="text-gray-600 mb-6">AI赋能业务</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-green-400">
                  —
                </span>
                业务流程优化
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-green-400">
                  —
                </span>
                AI集成方案
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-green-400">
                  —
                </span>
                数据价值挖掘
              </li>
              <li className="flex items-center text-gray-700 group-hover:translate-x-1 transition-transform">
                <span className="mr-2 text-gray-400 group-hover:text-green-400">
                  —
                </span>
                智能化改造
              </li>
            </ul>
            <div className="pt-6 border-t border-gray-100">
              <p className="text-gray-800 group-hover:text-green-600 transition-colors">
                用科技创新推动传统业务升级，开创增长新机遇
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们做过什么区块 */}
      <section
        className="relative z-10 flex flex-col items-center justify-around py-32 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white"
        id="project-highlights-section"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 w-full text-center relative tracking-tight">
          <span className={title()}>我们做过什么？</span>
          <div className="absolute w-24 h-1 bg-gradient-to-r from-primary to-violet-500 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 mt-4" />
        </h2>
        <div className="w-full max-w-5xl flex items-center justify-center gap-6 mt-8">
          {/* 左按钮 */}
          <button
            aria-label="上一个案例"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black/30 bg-white/70 hover:bg-primary/80 hover:text-white shadow-lg flex items-center justify-center text-2xl transition-all duration-200 backdrop-blur-md"
            style={{ zIndex: 2 }}
            type="button"
            onClick={prev}
          >
            &#8592;
          </button>
          {/* 内容卡片 */}
          <div className="flex-1 bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center overflow-hidden min-h-[340px] transition-transform duration-300 hover:scale-[1.02] group">
            {/* 媒体区 */}
            <div className="w-full md:w-1/2 aspect-video flex items-center justify-center bg-black/10 relative group-hover:scale-105 transition-transform duration-300">
              {cur.type === "video" ? (
                <video
                  controls
                  className="w-full h-full object-cover rounded-none md:rounded-l-3xl"
                  poster="/images/garbage.png"
                  src={cur.src}
                >
                  <track kind="captions" label="无字幕" />
                </video>
              ) : (
                <img
                  alt={cur.title}
                  className="w-full h-full object-contain bg-white rounded-none md:rounded-l-3xl"
                  src={cur.src}
                />
              )}
            </div>
            {/* 文本区 */}
            <div className="flex-1 p-8 flex flex-col justify-center items-start md:items-start gap-4">
              <div className="font-black text-2xl md:text-3xl mb-2 text-primary group-hover:text-violet-600 transition-colors">
                {cur.title}
              </div>
              <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line mb-2">
                {cur.desc}
              </div>
            </div>
          </div>
          {/* 右按钮 */}
          <button
            aria-label="下一个案例"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black/30 bg-white/70 hover:bg-primary/80 hover:text-white shadow-lg flex items-center justify-center text-2xl transition-all duration-200 backdrop-blur-md"
            style={{ zIndex: 2 }}
            type="button"
            onClick={next}
          >
            &#8594;
          </button>
        </div>
      </section>

      {/* 与AI聊聊区块 */}
      <section
        className="relative z-10 flex flex-col items-center justify-around py-32 px-4 md:px-12 bg-gradient-to-b from-white to-gray-50"
        id="aichat-section"
      >
        <h2 className="text-4xl font-bold mb-16 w-full text-center relative">
          <span className={title()}>与AI聊聊</span>
          <div className="absolute w-20 h-1 bg-primary rounded-full bottom-0 left-1/2 transform -translate-x-1/2 mt-4" />
        </h2>
        <div className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl bg-white overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-black text-white px-6 py-4 text-lg font-semibold flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse" />
            在线咨询
          </div>
          <div className="p-8 min-h-[240px] max-h-[480px] flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-6 py-4 text-gray-800 max-w-[80%] ${
                    message.type === "user"
                      ? "bg-black text-white"
                      : "bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {/* 打字机效果显示 */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-6 py-4 text-gray-800 shadow-md border border-gray-100 whitespace-pre-line">
                  {typing}
                  <span className="inline-block w-2 h-5 align-middle bg-gray-300 animate-pulse ml-1" />
                </div>
              </div>
            )}
            {isLoading && !typing && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-6 py-4 text-gray-800 shadow-md border border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="flex items-center gap-4 border-t p-6 bg-white"
            onSubmit={handleSend}
          >
            <input
              className="flex-1 rounded-full px-6 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-base bg-gray-50 hover:bg-white transition-colors"
              placeholder="请输入您的问题..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="bg-black text-white rounded-full px-8 py-3 font-semibold text-base hover:bg-gray-800 transition-all hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim() || isLoading}
              type="submit"
            >
              发送
            </button>
          </form>
        </div>
      </section>

      {/* 悬浮聊天按钮 */}
      <button
        aria-label="AI在线咨询"
        className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-xl hover:scale-105 transition-all group"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)" }}
        onClick={() => setShowChat(true)}
      >
        💬
      </button>

      {/* AI对话弹窗 */}
      {showChat && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
          <button
            className="absolute inset-0"
            onClick={() => setShowChat(false)}
          />
          <div
            className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeInUp flex flex-col"
            style={{ minHeight: 480, maxHeight: "90vh" }}
          >
            {/* 顶部栏 */}
            <div className="bg-black text-white px-6 py-4 text-lg font-semibold flex items-center justify-between">
              <span>在线咨询</span>
              <button
                aria-label="关闭"
                className="text-2xl leading-none hover:text-gray-300 transition"
                onClick={() => setShowChat(false)}
              >
                ×
              </button>
            </div>
            {/* 聊天内容区 */}
            <div className="flex-1 p-6 flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-white overflow-y-auto min-h-[200px] max-h-[60vh]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-6 py-4 text-gray-800 max-w-[80%] ${
                      message.type === "user"
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {/* 打字机效果显示 */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-6 py-4 text-gray-800 whitespace-pre-line">
                    {typing}
                    <span className="inline-block w-2 h-5 align-middle bg-gray-300 animate-pulse ml-1" />
                  </div>
                </div>
              )}
              {isLoading && !typing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-6 py-4 text-gray-800">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* 输入区 */}
            <form
              className="flex items-center gap-4 border-t p-4 bg-white"
              onSubmit={handleSend}
            >
              <input
                ref={inputRef}
                className="flex-1 rounded-full px-6 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-base bg-gray-50 hover:bg-white transition-colors"
                placeholder="请输入您的问题..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                // autoFocus 移除
              />
              <button
                className="bg-black text-white rounded-full px-8 py-3 font-semibold text-base hover:bg-gray-800 transition-all hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputValue.trim() || isLoading}
                type="submit"
              >
                发送
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
