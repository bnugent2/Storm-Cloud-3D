import React, {useState, useMemo} from 'react';
import Dropzone, {useDropzone} from 'react-dropzone'
import Button from '@material-ui/core/Button';


const FileUpload = () => {

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    let data = new FormData();
    data.append('file', acceptedFiles[0]);

    fetch('http://localhost:4500/upload', {
       method: 'POST',
       body: data
  });
  }

  const baseStyle = {
    width: '20rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(46, 49, 49, .4)',
    color: 'lightgrey',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  const {
    isDragAccept,
    isDragActive,
    isDragReject
  } = useDropzone({accept: '.blend'})

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

    return (
      <div>
        <Dropzone 
        onDrop={onDrop}
        multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <b>Click or Drag to upload a file!</b>
            </div>
          )}
        </Dropzone>
        <Button variant="contained">Upload</Button>
      </div>
    );
}
export default FileUpload;