import Foods from "./components/Foods";
import Header from "./components/Header";
import { DataProvider } from "./components/store/useDataContext";
import { ModalProvider } from "./components/store/useModalContext";

function App() {
  return (
    <DataProvider>
      <ModalProvider>
        <Header />
        <main>
          <Foods />
        </main>
      </ModalProvider>
    </DataProvider>
  );
}

export default App;
