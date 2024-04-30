"use client"
import useTwoStagesAnimation from '@/hooks/useTwoStagesAnimation';
import React, { useEffect, useState } from 'react';

type ArticleWindowProps = {
  id: string;
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  useDrawer?: boolean;
};

export default function ArticleWindow({
  id,
  title,
  children,
  className,
  useDrawer,
}: ArticleWindowProps) {
  const [isActive, setIsActive] = useState(true);
  const { showContent, animateClose, styles } = useTwoStagesAnimation({
    isActive: isActive,
    animStyles: {
      content: {
        inactive: { opacity: 0, maxHeight: 0, marginBottom: '-0.5rem' },
        active: { opacity: 1, maxHeight: 800, marginBottom: 0 },
      },
    },
    durationInMs: 300,
  });

  // Function to toggle the content's visibility
  const toggleVisibility = () => {
    if (showContent) {
      animateClose(() => setIsActive(false));
    } else {
      setIsActive(true);
    }
  };

  return (
    <article id={id} className={`relative profile-article ${className || ''}`}>
      <h2 className="text-3xl font-bold">
        {title}
      </h2>
      {useDrawer && <button
          onClick={toggleVisibility}
          className="absolute top-2 right-2 py-2 px-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-md"
        >
          {showContent ? '➖' : '➕'}
        </button>}
      <div className='profile-div' style={styles.content}>{children}</div>
    </article>
  );
}

