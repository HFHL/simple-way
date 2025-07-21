"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";

import { TeamCardProps } from "@/types/team";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamCardProps | null;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        role="button"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] overflow-hidden">
        {/* 关闭按钮 */}
        <Button
          isIconOnly
          className="absolute top-4 right-4 z-10"
          size="sm"
          variant="light"
          onPress={onClose}
        >
          ✕
        </Button>

        {/* 主要内容区域 */}
        <div className="flex flex-col md:flex-row h-full">
          {/* 左侧图片区域 - 移动端显示Avatar，桌面端显示全屏图片 */}
          <div className="w-full md:w-1/2 h-48 md:h-full relative">
            {/* 移动端：Avatar组件 */}
            <div className="md:hidden w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Avatar
                isBordered
                className="w-32 h-32"
                radius="full"
                size="lg"
                src={member.avatarSrc}
              />
            </div>

            {/* 桌面端：全屏图片 */}
            <div className="hidden md:block w-full h-full">
              <img
                alt={member.name}
                className="w-full h-full object-cover"
                src={member.avatarSrc}
              />
              {/* 图片上的渐变遮罩，让文字更清晰 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* 右侧信息区域 */}
          <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-between overflow-y-auto">
            {/* 头部信息 */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-default-900 dark:text-white mb-2">
                  {member.name}
                </h2>
                <p className="text-base md:text-lg text-default-500 dark:text-gray-400">
                  {member.title}
                </p>
              </div>

              {/* 个人简介 */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-default-900 dark:text-white mb-3">
                  个人简介
                </h3>
                <div className="space-y-3">
                  {member.description.map((desc, idx) => (
                    <p
                      key={idx}
                      className="text-sm md:text-base text-default-600 dark:text-gray-300 leading-relaxed"
                    >
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* 专业领域 */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-default-900 dark:text-white mb-2">
                  专业领域
                </h3>
                <p className="text-sm md:text-lg text-default-600 dark:text-gray-300">
                  {member.tag}
                </p>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex justify-end pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 mt-4">
              <Button color="primary" onPress={onClose}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
