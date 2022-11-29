import { Forum } from "./lib";

function App() {
  return (
    <div className="bg-gray-800 h-screen w-screen flex items-center justify-center text-white font-semibold">
      <Forum
        closedText="Having second thoughts?"
        headerText="Ask the Forum3 community"
      />
    </div>
  );
}

export default App;
