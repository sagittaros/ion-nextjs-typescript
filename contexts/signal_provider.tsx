import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Client } from "ion-sdk-js";

export interface SignalProps {
  children: ReactNode;
  backend: string;
}

const SignalContext = createContext(undefined);

const SignalProvider: React.FC<SignalProps> = ({ children, backend }) => {
  const [client, setClient] = useState<Client | undefined>();
  const [ready, setReady] = useState(false);

  const transportOpen = () => {
    console.log("transport open!");
    setReady(true);
  };

  const transportClosed = () => {
    console.log("transport closed!");
    setReady(false);
  };

  useEffect(() => {
    console.log("using backend:", backend);
    const cl = new Client({ url: backend });
    console.log("Created client:", cl);
    setClient(cl);

    cl.on("transport-open", transportOpen);
    cl.on("transport-closed", transportClosed);

    return () => {
      cl.off("transport-open", transportOpen);
      cl.off("transport-closed", transportClosed);
    };
  }, []);

  return (
    <SignalContext.Provider value={{ client, ready }}>
      {children}
    </SignalContext.Provider>
  );
};

const useSignal = () => useContext(SignalContext);

export { SignalProvider, useSignal };
