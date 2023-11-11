"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
const Footer_1 = __importDefault(require("./components/Footer/Footer"));
const App_1 = __importDefault(require("./App"));
require("react-toastify/dist/ReactToastify.css");
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
const root = (0, client_1.createRoot)(rootElement);
root.render(<react_1.default.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <App_1.default />
      <Footer_1.default />
    </react_router_dom_1.BrowserRouter>
  </react_1.default.StrictMode>);
