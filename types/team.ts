export interface TeamCardProps {
  avatarSrc: string; // 头像图片地址
  name: string; // 姓名
  title: string; // 头衔/职位
  description: string[]; // 简介（多段）
  tag: string; // 底部标签
  isFollowedDefault?: boolean; // 初始关注状态（可选）
}
