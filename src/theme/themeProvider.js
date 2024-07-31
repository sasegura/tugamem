import { ConfigProvider, theme } from "antd";

export default function ThemeProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "'Urbanist', -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
          colorPrimary: "#4B4EFC",
          borderRadius: "20px",
          colorTextHeading: "#111827",
        },
        components: {
          Layout: {
            colorBgBody: "#E5E5E5",
            // colorBgHeader: "#7dbcea"
          },
        },
      }}
      getPopupContainer={(node) => {
        if (node) {
          return node.parentNode;
        }
        return document.body;
      }}
    >
      {children}
    </ConfigProvider>
  );
}

/**
 * Customize theme available tokens
 * https://ant.design/docs/react/customize-theme#api
 */
