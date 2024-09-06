import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import Title from './components/Title';
import Home from './components/Home';
import AddVehicle from './components/AddVehicle';
import LogMaintenance from './components/LogMaintenance';
import ViewMaintenance from './components/ViewMaintenance';
import ViewVehicles from './components/ViewVehicles';

function App() {
  let screen
  switch (window.location.pathname){
    case "/":
      screen = <Home />
      break;
    case "/add-vehicles":
      screen = <AddVehicle />
      break;
    case "/view-vehicles":
      screen = <ViewVehicles />
      break;
    case "/log-maintenance":
      screen = <LogMaintenance />
      break;
    case "/view-maintenance-log":
      screen = <ViewMaintenance />
      break;
    default:
      break;
  }
  return (
    <>
      <SideBar />
      <Title />
      {screen}
    </>
  );
}

export default App;
