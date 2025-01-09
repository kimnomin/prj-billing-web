import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import router from "./constants/Routes";
import theme from "./styles/theme";

const App = () => {
  return (
    <ConfigProvider theme={theme} locale={koKR}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
