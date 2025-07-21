"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";

import { TeamCardProps } from "@/types/team";

interface TeamCardPropsWithModal extends TeamCardProps {
  onCardClick: (member: TeamCardProps) => void;
}

export const TeamCard: React.FC<TeamCardPropsWithModal> = ({
  avatarSrc,
  name,
  title,
  description,
  tag,
  onCardClick,
}) => {
  const handleCardClick = () => {
    onCardClick({ avatarSrc, name, title, description, tag });
  };

  return (
    <Card
      isPressable
      className="max-w-[340px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-default-50 dark:hover:bg-default-100"
      onPress={handleCardClick}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={avatarSrc} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-xs tracking-tight text-default-400">{title}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {description.map((desc, idx) => (
          <p key={idx}>{desc}</p>
        ))}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">{tag}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
