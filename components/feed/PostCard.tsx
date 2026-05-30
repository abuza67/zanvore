"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark, Building2, User } from "lucide-react";
import { motion } from "framer-motion";

interface PostAuthor {
  name: string;
  handle: string;
  type: "user" | "company";
  tagline: string;
  initials: string;
}

interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  tags: string[];
}

export default function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  function toggleLike() {
    setLiked((v) => !v);
    setLikesCount((c) => (liked ? c - 1 : c + 1));
  }

  const profileHref =
    post.author.type === "company"
      ? `/company/${post.author.handle}`
      : `/profile/${post.author.handle}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[12px] border border-[#E5E5E5] overflow-hidden"
    >
      {/* Author */}
      <div className="px-5 pt-5 pb-4 flex items-start gap-3">
        <Link href={profileHref} className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-semibold">
            {post.author.initials}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href={profileHref}
              className="text-[#0A0A0A] text-sm font-semibold hover:underline"
              style={{ fontFamily: "var(--font-satoshi), var(--font-inter), system-ui" }}
            >
              {post.author.name}
            </Link>
            {post.author.type === "company" ? (
              <Building2 size={12} className="text-[#A3A3A3]" />
            ) : (
              <User size={12} className="text-[#A3A3A3]" />
            )}
          </div>
          <p className="text-[#737373] text-xs mt-0.5 truncate">{post.author.tagline}</p>
          <p className="text-[#A3A3A3] text-[11px] mt-0.5">{post.time}</p>
        </div>
        <button className="text-xs text-[#0A0A0A] border border-[#0A0A0A] rounded-full px-3 py-1 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200 shrink-0">
          + Suivre
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        <p className="text-[#0A0A0A] text-sm leading-relaxed">{post.content}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-[#737373] bg-[#F5F5F5] rounded-full px-2.5 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 py-2 border-t border-[#F5F5F5] flex items-center justify-between text-[11px] text-[#A3A3A3]">
        <span>{formatCount(likesCount)} réaction{likesCount > 1 ? "s" : ""}</span>
        <span>{formatCount(post.comments)} commentaire{post.comments > 1 ? "s" : ""} · {formatCount(post.shares)} partage{post.shares > 1 ? "s" : ""}</span>
      </div>

      {/* Actions */}
      <div className="px-3 py-2 border-t border-[#F5F5F5] flex items-center gap-1">
        <ActionButton
          icon={<Heart size={15} fill={liked ? "#0A0A0A" : "none"} />}
          label="J'aime"
          active={liked}
          onClick={toggleLike}
        />
        <ActionButton icon={<MessageCircle size={15} />} label="Commenter" />
        <ActionButton icon={<Share2 size={15} />} label="Partager" />
        <div className="flex-1" />
        <ActionButton
          icon={<Bookmark size={15} fill={saved ? "#0A0A0A" : "none"} />}
          label="Enregistrer"
          active={saved}
          onClick={() => setSaved((v) => !v)}
        />
      </div>
    </motion.article>
  );
}

function ActionButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-xs font-medium transition-colors duration-200 ${
        active
          ? "text-[#0A0A0A] bg-[#F5F5F5]"
          : "text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return n.toString();
}
