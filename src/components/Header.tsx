import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="text-xl font-bold tracking-tighter text-white">
                <span className="bg-[#0ea5e9] px-3 py-1 rounded">チームラボ</span>
            </div>

            <div className="px-6 py-2 hidden lg:block">
                <h1 className="text-gray-800 font-medium text-lg tracking-wide">
                    プレイオアライフ 人生を旅しよう 人生を楽しもう
                </h1>
            </div>

            <nav className="flex items-center space-x-6 text-sm font-semibold text-gray-600">
                <a href="#top" className="hover:text-blue-500 transition-colors">トップ</a>
                <a href="#service" className="hover:text-blue-500 transition-colors">サービス</a>
                <a href="#news" className="hover:text-blue-500 transition-colors">ニュース</a>
                <a href="#contact" className="hover:text-blue-500 transition-colors">代表挨拶</a>
                <button className="bg-[#0ea5e9] text-white px-4 py-2 rounded-full font-bold hover:bg-[#0284c7] transition-all shadow-md ml-4">
                    お問い合わせ
                </button>
            </nav>
        </header>
    );
};
