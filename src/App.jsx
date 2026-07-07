import { Helmet } from "react-helmet-async";
import { ENV } from "@/config/env";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Helmet>
        <title>{ENV.APP_NAME}</title>
      </Helmet>
      <AppRoutes />
    </>
  );
}

export default App;