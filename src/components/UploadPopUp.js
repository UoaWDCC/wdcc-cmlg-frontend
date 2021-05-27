import { SaveRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import "../css/UploadPopUp.css";

function UploadPopUp() {

    const [file, setFile] = useState();
    const [error, setError] = useState(false);

    const isShown = true;

    function onChangeHandler(e) {
         setFile(e.target.files[0])
    }

    // I don't know how you can print something in the footer when the button of the Save changes is clicked ㅠㅠ

    function handleUploadSubmit(e) { // what is e?
        console.log("file to submit",file)

        // Validate the file => correct extension/ headers
        const valid = false;
        //setError(!valid);
        if (valid) {
            setError(false);
            // Make fetch/axios call to backend to upload the file 
            // https://cmlgbackend.wdcc.co.nz/api/uploadfile

        } else {
            setError(true);
        }
        
    }

    // would I need a function for the different error messages

    return (
        <div className='UploadPopUp '>

            {/* <form action="/action_page.php" method="get">
                <button name="subject" type="submit" value="HTML">hi</button>
                <button name="subject" type="submit" value="CSS">bye</button>
            </form>
            <form action="/action_page.php" method="get">
                Choose your favorite subject:
                <button name="subject" type="submit" value="fav_HTML">HTML</button>
                <button name="subject" type="submit" value="fav_CSS">CSS</button>
            </form> */}

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal" tabindex="-1" role="dialog" id="exampleModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Upload Translations</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                            {/* { error ? <p>Error</p> : <p></p> } */}
                            { error && <p id = "error-msg">Upload Error</p>}
                            <button type="submit" form='fileForm' className="btn btn-primary" onClick={handleUploadSubmit} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UploadPopUp;