import Foods from "./components/Foods";
import Header from "./components/Header";
import { ModalProvider } from "./components/store/useModalContext";

function App() {
  return (
    <ModalProvider>
      <Header />
      <main>
        <Foods />
      </main>
    </ModalProvider>
  );
}

export default App;
