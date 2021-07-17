import { SideBar } from "./components/SideBar/SideBar";
import { Content } from "./components/Content/Content";
import "./styles/global.scss";
import { MenuTypes, MenuTypesProvider } from "./context/MenuType";

export function App() {
  return (
    <MenuTypesProvider index={1}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar  />
        <Content  />
      </div>
    </MenuTypesProvider>
  );
}
