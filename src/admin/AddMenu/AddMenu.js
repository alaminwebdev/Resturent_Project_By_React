import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetMenu } from '../../redux/adminActionCreators';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import AddIntro from './/AddItem/AddIntro';
import AddVarient from './AddItem/AddVarient';
import AddPrice from './AddItem/AddPrice';
import AddImage from './AddItem/AddImage';
import ReviewItem from './AddItem/ReviewItem';





const mapDispatchToProps = dispatch => {
    return {
        resetMenu: () => dispatch(resetMenu())
    }
}


const AddMenu = props => {
    const [activeStep, setActiveStep] = useState(0);

    const [response, setResponse] = useState(false);
    const [responseText, setResponseText] = useState('')
    const [responseType, setResponseType] = useState('success')

    const handleNext = () => {
        if (activeStep < 4) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        //setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepAfterSubmut = (type, message) => {
        setResponse(true);
        setResponseType(type);
        setResponseText(message);

        //this will push to inital step
        setTimeout(() => {
            props.resetMenu()
            setActiveStep(0);
            //this will close alert box
            setTimeout(() => {
                setResponse(false);
            }, 1000)

        }, 2000)
    }


    const stepAfterGettingError = (type, message) => {
        setResponse(true);
        setResponseType(type);
        setResponseText(message);
        //this will close alert box
        setTimeout(() => {
            setResponse(false);
        }, 2000)
    }



    return (
        <Container maxWidth="lg">
            
            <Box>
                <Collapse in={response}>
                    <Alert severity={responseType} sx={{ mt: 3 }}>{responseText}</Alert>
                </Collapse>

                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step >
                        <StepLabel>Item Name</StepLabel>
                        <StepContent>
                            <AddIntro back={handleBack} next={handleNext} step={activeStep} />
                        </StepContent>
                    </Step>
                    <Step >
                        <StepLabel>Item Varients</StepLabel>
                        <StepContent>
                            <AddVarient back={handleBack} next={handleNext} step={activeStep} />
                        </StepContent>
                    </Step>
                    <Step >
                        <StepLabel>Item Price</StepLabel>
                        <StepContent>
                            <AddPrice back={handleBack} next={handleNext} step={activeStep} />
                        </StepContent>
                    </Step>
                    <Step >
                        <StepLabel>Item Image</StepLabel>
                        <StepContent>
                            <AddImage back={handleBack} next={handleNext} step={activeStep} />
                        </StepContent>
                    </Step>
                    <Step >
                        <StepLabel>Review</StepLabel>
                        <StepContent>
                            <ReviewItem back={handleBack} next={handleNext} step={activeStep} initialStep={stepAfterSubmut} getError={stepAfterGettingError} />
                        </StepContent>
                    </Step>
                </Stepper>

                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            </Box>
        </Container>


    )
}

export default connect(null, mapDispatchToProps)(AddMenu)
