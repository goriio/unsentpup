import clsx from "clsx";
import dayjs from "@/lib/dayjs";
import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { AllHTMLAttributes } from "react";

export type Color =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "violet"
  | "pink";

export interface CardProps extends AllHTMLAttributes<HTMLDivElement> {
  color: Color;
  to: string;
  badge?: string;
  message: string;
  date: Timestamp;
}

export const cardVariants: Record<Color, string> = {
  red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  orange: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
  yellow: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
  green: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  cyan: "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700",
  blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  violet: "bg-violet-500 hover:bg-violet-600 active:bg-violet-700",
  pink: "bg-pink-500 hover:bg-pink-600 active:bg-pink-700",
};

export const badgeVariants: Record<Color, string> = {
  red: "bg-red-200 text-red-500",
  orange: "bg-orange-200 text-orange-500",
  yellow: "bg-yellow-200 text-yellow-500",
  green: "bg-green-200 text-green-500",
  cyan: "bg-cyan-200 text-cyan-500",
  blue: "bg-blue-200 text-blue-500",
  violet: "bg-violet-200 text-violet-500",
  pink: "bg-pink-200 text-pink-500",
};

export function Card({ color, to, badge, message, date, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col fw-full p-4 rounded hover:-translate-y-0.5 transition ease-in-out duration-200 cursor-pointer",
        cardVariants[color]
      )}
      {...rest}
    >
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-gray-50 font-semibold text-sm">To: {to}</h2>
        {badge && (
          <span
            className={clsx(
              "inline-block px-1 py-0.5 rounded-lg text-[10px] font-bold",
              badgeVariants[color]
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-100 text-sm mb-3">
        <pre className="whitespace-pre-wrap font-sans">{message}</pre>
      </p>
      <p className="text-xs text-gray-300 mt-auto">
        {dayjs(date?.toDate()).fromNow()}
      </p>
    </div>
  );
}

interface CardListProps {
  posts: QueryDocumentSnapshot<CardProps>[] | undefined;
}

export function CardList({ posts }: CardListProps) {
  const { push } = useRouter();

  return (
    <>
      {posts?.length ? (
        posts.map((post) => {
          return (
            <Card
              key={post.id}
              onClick={() => push(`/posts/${post.id}`)}
              {...post.data()}
            />
          );
        })
      ) : (
        <p className="text-gray-400">No results</p>
      )}
    </>
  );
}
