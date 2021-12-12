import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { connect } from "react-redux";
import { addImage } from "../../../redux/adminActionCreators";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Typography from '@mui/material/Typography';


const mapStateToProps = (state) => {
    return {
        itemImage: state.adminState.image,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addImage: (imageUrl) => dispatch(addImage(imageUrl)),
    };
};

const storage = getStorage();
// Create the file metadata
/** @type {any} */

const metadata = {
    contentType: "image/jpeg",
};

const Input = styled("input")({
    display: "none",
});

const AddImage = (props) => {
    //console.log(props.itemImage);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                setProgress(progress);
                setLoading(true);
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    // ...

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setUrl(downloadURL);
                    setLoading(false);
                    setSuccess(true);
                    props.addImage(downloadURL);
                });
            }
        );
    };

    const nextStep = () => {
        if (Boolean(props.itemImage)) {
            props.next()
        } else {
            console.log("Please Upload a image")
        }
    };

    const style = {
        mt: 3,
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                <Box sx={{ mr: 3 }}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={handleChange}
                        />
                        <Button
                            size="small"
                            aria-label="upload picture"
                            component="span"
                            startIcon={<PhotoCamera sx={{ mx: 1 }} />}
                            sx={{ fontSize: "12px", textTransform: "capitalize", }}
                            variant="outlined"
                        >
                            
                            {image ? image.name : 'No file chosen' }
                            
                        </Button>
                    </label>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        component="span"
                        disabled={loading}
                        onClick={handleUpload}
                        endIcon={Boolean(props.itemImage) ? <CheckIcon /> : <SendIcon />}
                    >
                        {loading ? (
                            <CircularProgress size="15px" sx={{ color: "#007FFF", mr: 1 }} />
                        ) : null}
                        {success ? "Completed" : "Upload"}
                    </Button>
                    <Typography variant="caption" display="block" >
                        {props.itemImage}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    sx={{ ...style }}
                    endIcon={<SendIcon />}
                    onClick={nextStep}
                >
                    {props.step === 4 ? "Finish" : "Next"}
                </Button>
                <Button
                    disabled={props.step === 0}
                    variant="outlined"
                    color="primary"
                    onClick={props.back}
                    sx={{ ...style, ml: 3 }}
                >
                    Back
                </Button>
            </Box>
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
