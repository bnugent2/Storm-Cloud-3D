import React from 'react';
import Button from '@material-ui/core/Button';
import FileUpload from './FileUpload'
import './Home.css'
    const Home = () => {
  return (
   <div>
    <div className="Splash">
      <h2 className="topcorner"> STORMCLOUD 3D</h2>
        <div className="Herotext">
          EMPOWERING WITH THE CLOUD
        </div>
        <div className="CTA">
          <h3> 3D ARTIST LOVE THIS!</h3>
          Render all of your Blender files using the power of the cloud, 
          simply upload your file, wait for it to be rendered quickly and view 
          it in the gallery<br/><br/>

          <Button variant="outlined" color="primary">Learn More</Button>
        </div>
        <div className="upload">
        <FileUpload/>
        </div>
      </div>
   </div>
  );
}

export default Home;