'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Eye } from 'lucide-react';

interface Category {
  category: string;
  count: number;
  displayName: string;
}

interface ProfileMenuProps {
  categories: Category[];
}

export default function ProfileMenu({ categories }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // localStorage로 간단한 카운터 구현
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('visit_date');
    const storedTotal = localStorage.getItem('total_visits');
    const storedToday = localStorage.getItem('today_visits');

    // 전체 방문자
    if (storedTotal) {
      setTotalCount(parseInt(storedTotal) + 1);
      localStorage.setItem('total_visits', (parseInt(storedTotal) + 1).toString());
    } else {
      setTotalCount(1);
      localStorage.setItem('total_visits', '1');
    }

    // 오늘 방문자
    if (storedDate === today) {
      const newToday = parseInt(storedToday || '0') + 1;
      setTodayCount(newToday);
      localStorage.setItem('today_visits', newToday.toString());
    } else {
      setTodayCount(1);
      localStorage.setItem('visit_date', today);
      localStorage.setItem('today_visits', '1');
    }
  }, []);

  return (
    <div className="relative">
      {/* 프로필 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-700">
          <img
            src="/profile.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <>
          {/* 배경 클릭 시 닫기 */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* 메뉴 */}
          <div className="absolute left-0 top-14 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
            {/* 프로필 정보 */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-600">
                  <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">pkdje0113</p>
                  <p className="text-sm text-gray-400">CSE 24</p>
                </div>
              </div>

              {/* 방문자 통계 */}
              <div className="flex items-center justify-between text-xs bg-gray-700/30 px-3 py-2 rounded">
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye size={12} />
                  <span>방문자</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-gray-300">
                    전체 <span className="text-blue-400 font-semibold">{totalCount}</span>
                  </span>
                  <span className="text-gray-300">
                    오늘 <span className="text-blue-400 font-semibold">{todayCount}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 카테고리 목록 */}
            <div className="p-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 rounded-lg transition"
              >
                <span className="text-gray-300">전체 글</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {categories.reduce((acc, cat) => acc + cat.count, 0)}
                </span>
              </Link>

              {categories.map(({ category, count, displayName }) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-700 rounded-lg transition"
                >
                  <span className="text-gray-300">{displayName}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}