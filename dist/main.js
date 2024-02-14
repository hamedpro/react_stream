import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { Root } from "./Root";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AllItems } from "./AllItems";
import { Item } from "./Item";
createRoot(document.getElementById("root")).render(_jsx(_Fragment, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Root, {}) }), _jsx(Route, { path: "/items", element: _jsx(AllItems, {}) }), _jsx(Route, { path: "/items/:item_id", element: _jsx(Item, {}) })] }) }) }));
