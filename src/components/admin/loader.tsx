import { Spinner } from 'react-bootstrap';
import './Loader.css'; // Create a separate CSS file for the loader styles

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-overlay"></div>
      <div className="loader-content">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default Loader;