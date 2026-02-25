import React from 'react';

const Hero: React.FC = () => (
    <section id="top" className="scroll-section wave-bg pt-20">
        <div className="absolute inset-0 z-0">
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.4)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.1)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.5)" />
                </g>
            </svg>
        </div>

        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="animate-fade-in">
                <h2 className="text-5xl font-black mb-6 leading-tight text-black">
                    次世代のAIエージェントが、<br />
                    あなたの人生を豊かに
                </h2>
                <p className="text-xl text-black/80 mb-8 leading-relaxed font-medium">
                    最新のAIテクノロジーと直感的なインターフェースで、
                    複雑なタスクをシンプルに。私たちは新しい生活の形を提案します。
                </p>
                <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-gray-800 transition-all hover:scale-105">
                    サービスを体験する
                </button>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img
                    src="/hero-character.jpg"
                    alt="AI Agent"
                    className="rounded-3xl shadow-2xl border-4 border-white/20"
                />
            </div>
        </div>
    </section>
);

const Philosophy: React.FC = () => (
    <section id="service" className="scroll-section bg-white text-left">
        <div className="w-full pl-8 md:pl-24 animate-fade-in">
            <h2 className="text-4xl font-bold text-black mb-8">
                プレイオアライフではなくて、<br />人生を楽しくいきましょう
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                テクノロジーは、私たちが人生の喜びを再発見するために存在します。<br />
                難しいこと、煩わしいことはAIに任せて、<br />
                大切な人と過ごす時間や、新しい体験を、もっと。
            </p>
        </div>
    </section>
);

const Technology: React.FC = () => (
    <section className="scroll-section bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-black">
            <div className="md:col-span-1">
                <h2 className="text-3xl font-bold mb-4">Core Technology</h2>
                <p className="opacity-90">AIと動画生成の融合が、表現の可能性を広げます。</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { title: "AI Agent", desc: "自律的に考え、行動するエージェント" },
                    { title: "Video Generation", desc: "プロンプトから高品質な動画を生成" },
                    { title: "Voice Synthesis", desc: "自然なAIボイスによる対話体験" },
                    { title: "Smart Logic", desc: "高度な意思決定アルゴリズム" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-bold text-lg mb-2 text-black">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const News: React.FC = () => (
    <section id="news" className="scroll-section bg-white">
        <div className="max-w-6xl mx-auto px-8 animate-fade-in w-full">
            <h2 className="text-4xl font-bold text-black mb-12">NEWS</h2>
            <div className="space-y-6">
                {[
                    { date: "2026.02.20", title: "AI音声エージェントの大型アップデートを実施しました。" },
                    { date: "2026.02.15", title: "「Tech Insight」にて弊社代表のインタビューが掲載されました。" },
                    { date: "2026.02.01", title: "新機能「波形アニメーション生成」をリリースしました。" }
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors px-4 rounded-lg">
                        <span className="text-black/50 font-mono text-sm mb-1 md:mb-0 md:w-32">{item.date}</span>
                        <span className="text-black font-bold">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CEO: React.FC = () => (
    <section id="contact" className="scroll-section bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-8 flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-1 bg-white/20 mb-8 rounded-full"></div>
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-white/50">代表取締役</h2>
            <p className="text-2xl font-medium leading-relaxed mb-8">
                「AIは、人間のパートナーです。私たちの使命は、AIを通じてすべての人々が自分らしく、楽しく生きられる社会を創造することです。」
            </p>
            <div>
                <p className="font-bold text-xl text-white">山田 太郎</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Representative Director & CEO</p>
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <section id="footer" className="scroll-section bg-white flex flex-col justify-end pb-6 px-4">
        <div className="footer-container bg-black text-white p-12 md:p-20 relative overflow-hidden flex flex-col justify-between min-h-[500px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                {/* Logo Section */}
                <div className="lg:col-span-1">
                    <div className="w-16 h-16 mb-4">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current">
                            <path d="M20 80C20 80 40 20 80 20C80 20 60 80 20 80Z" fill="white" fillOpacity="0.2" />
                            <path d="M10 80C10 80 30 20 90 20C70 40 40 80 10 80Z" stroke="white" strokeWidth="4" />
                        </svg>
                    </div>
                </div>

                {/* ABOUT US */}
                <div>
                    <h3 className="text-sm font-bold mb-6 opacity-70 underline underline-offset-8 decoration-1">ABOUT US</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><a href="#" className="hover:opacity-70 transition-opacity">企業理念</a></li>
                        <li><a href="#" className="hover:opacity-70 transition-opacity">会社情報</a></li>
                        <li><a href="#" className="hover:opacity-70 transition-opacity">会社拠点</a></li>
                        <li><a href="#" className="hover:opacity-70 transition-opacity">沿革</a></li>
                    </ul>
                </div>

                {/* JOIN US */}
                <div>
                    <h3 className="text-sm font-bold mb-6 opacity-70 underline underline-offset-8 decoration-1">JOIN US</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><a href="#" className="hover:opacity-70 transition-opacity">代表挨拶</a></li>
                        <li><a href="#" className="hover:opacity-70 transition-opacity">働くメンバー</a></li>
                        <li><a href="#" className="hover:opacity-70 transition-opacity">数字でみるアドネス</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs opacity-70 gap-4">
                <p>© 2024 AddNeSS. All Rights Reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:underline">プライバシーポリシー</a>
                    <a href="#" className="hover:underline">サイト利用規約</a>
                    <a href="#" className="hover:underline">特定商取引法による表記</a>
                </div>
            </div>
        </div>
    </section>
);

export const Sections = () => (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
        <Hero />
        <Philosophy />
        <Technology />
        <News />
        <CEO />
        <Footer />
    </main>
);
