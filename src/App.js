import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import Gallery from './component/mainGallery/Gallery';
import './index.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[1000px] h-[1000px] pt-[170px]"> 
          <Gallery />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
