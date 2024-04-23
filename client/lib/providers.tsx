// "use client";

// /* Core */
// import { Provider } from "react-redux";

// /* Instruments */
// import { reduxStore } from "@/lib/redux";

// export const Providers = (props: React.PropsWithChildren) => {
//   return <Provider store={reduxStore}>{props.children}</Provider>;
// };

"use client";

/* Core */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/* Instruments */
import { reduxStore, persistor } from "@/lib/redux";  // Make sure the path to your redux setup is correct

export const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
