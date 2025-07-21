"use client";

import React from "react";

import styles from "./team.module.css";

import { subtitle, title } from "@/components/primitives";
import { TeamCard } from "@/components/TeamCard";
import { TeamMemberModal } from "@/components/TeamMemberModal";
import { teamMembers } from "@/components/list/TeamList";
import { TeamCardProps } from "@/types/team";

export default function TeamPage() {
  const [selectedMember, setSelectedMember] =
    React.useState<TeamCardProps | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCardClick = (member: TeamCardProps) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className={styles.container}>
      {/* 页面标题 */}
      <div className={styles.titleSection}>
        <h1 className={title()}>我们的团队</h1>
        <p className={subtitle()}>认识我们优秀的团队成员</p>
      </div>

      {/* 团队成员卡片网格 */}
      <div className={styles.teamGrid}>
        {teamMembers.map((member, idx) => (
          <div key={idx} className={styles.cardWrapper}>
            <TeamCard {...member} onCardClick={handleCardClick} />
          </div>
        ))}
      </div>

      {/* 如果没有团队成员数据时的占位 */}
      {teamMembers.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>暂无团队成员信息</p>
        </div>
      )}

      {/* 团队成员详情对话框 */}
      <TeamMemberModal
        isOpen={isModalOpen}
        member={selectedMember}
        onClose={handleCloseModal}
      />
    </div>
  );
}
