import "./App.css";
import { Router } from "./router";
import { SurveyProvider } from "./context/SurveyContext";

function App() {
  return (
    <SurveyProvider>
      <Router />
    </SurveyProvider>
  );
}

export default App;
