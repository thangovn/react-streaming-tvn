import { LiveStreamScreen } from './lib/index';
import './App.css';

function App() {
  return (
    <div>
      <LiveStreamScreen
        userInfo={{ user_id: '123123', user_name: "Khoa" }}
        giftData={{ value: [], loading: false }}
        configChat={{
          socketURL: "18.138.225.4:5000",
          channelChat: "bacarat-18",
        }}
        configLive={{
          appid: "f73d7f36-5dd0-47c1-a71d-3009b2cb8d33",
          channelLive: "bacarat-18",
        }}
      />
    </div>
  );
}

export default App;
