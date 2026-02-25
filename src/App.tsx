import React from 'react';
import { Header } from './components/Header';
import { Sections } from './components/Sections';

const App: React.FC = () => {
    return (
        <div className="relative font-sans antialiased text-gray-900 selection:bg-blue-100">
            <Header />
            <Sections />
        </div>
    );
};

export default App;
