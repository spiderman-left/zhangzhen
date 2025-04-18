import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css'; // 使用 AntD 的现代化样式
import './index.css'; // 你可以自定义科技风样式在这里

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);