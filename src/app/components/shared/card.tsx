import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FC, ReactNode } from "react";

interface CardProps {
  title: ReactNode;
  content: ReactNode;
  class: string;
  cardAction?: ReactNode;
  showCardDescription?: boolean;
  footer?: ReactNode;
}

const CardPreview: FC<CardProps> = (props) => {
  return (
    <Card
      className={`w-full 
    bg-white/30 dark:bg-slate-900/15 
    border border-gray-200 dark:border-slate-600/25 
    dark:shadow-xl 
    rounded-xl 
    hover:shadow-xl hover:dark:shadow-4xl
    hover:-translate-y-1
    transition-all duration-200 ease-out
    backdrop-blur-lg border border-white/20 shadow-xl
    ${props.class ?? ""}`}
    >
      <div className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          {props.showCardDescription && (
            <CardDescription>
              This is a description of the card content.
            </CardDescription>
          )}
          {props.cardAction != null && (
            <CardAction>{props.cardAction}</CardAction>
          )}
        </CardHeader>

        <div className="flex-1 px-6 relative">{props.content}</div>

        {props.footer && (
          <CardFooter className="flex p-0 mt-auto">{props.footer}</CardFooter>
        )}
      </div>
    </Card>
  );
};

export default CardPreview;
