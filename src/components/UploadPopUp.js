import React, { useState } from 'react';

function UploadPopUp() {

    const [file, setFile] = useState();

    function onChangeHandler(e) {
         setFile(e.target.files[0])
    }

    function handleUploadSubmit(e) {
        console.log("file to submit",file)
        // Validate the file => correct extension/ headers
        
        // Make fetch/axios call to backend to upload the file 
        // https://cmlgbackend.wdcc.co.nz/api/uploadfile
    }

    return (
        <div className='UploadPopUp '>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal" tabIndex="-1" role="dialog" id="exampleModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Test</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Accepted format: *.xlsx</p>
                            {/* Testing out the form submission */}
                            {/* <form id='fileForm' enctype="multipart/form-data" method="post" action='https://cmlgbackend.wdcc.co.nz/api/uploadfile'> */}
                            <form id='fileForm' action='#'>
                                <input type="file" accept=".xlsx" onChange={onChangeHandler}/>                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" form='fileForm' className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPopUp;