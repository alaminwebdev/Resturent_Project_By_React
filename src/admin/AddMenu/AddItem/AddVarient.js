import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import FormControl from '@mui/material/FormControl';

import { addVarient } from '../../../redux/adminActionCreators';
import { connect } from 'react-redux';



const mapDispatchToProps = dispatch => {
    return {
        addVarient: (varients) => dispatch(addVarient(varients))
    }
}


const AddVarient = props => {
    const [varients, setVarients] = useState([]);

    const [state, setState] = useState({
        small: false,
        medium: false,
        large: false,
    });
    const { small, medium, large } = state;


    const getValue = e => {
        // console.log(e.target.value)
        //set the varient checked true or false
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });

        //fetch the varient name which are matched from varient name array 
        let selectdVarient = varients.filter(item => item === e.target.name);
        //console.log(selectdVarient[0]);

        let varient = varients;
        if (e.target.checked === true) {
            if (e.target.name === selectdVarient[0]) {
                console.log('item exist')
            } else {
                varient.push(e.target.value);
                setVarients(varient);
            }

        } else {
            if (e.target.name === selectdVarient[0]) {
                let newVarient = varients.filter(item => item !== selectdVarient[0])
                setVarients(newVarient);
            } else {
                console.log('nothing')
            }
        }

    }


    const style = {
        mt: 3
    }

    const handleSubmit = e => {
        if (varients.length > 0 ) {
            //console.log(variants)
            props.addVarient(varients);
            props.next();
        }
        e.preventDefault();
    }


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log(state)
    });

    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel component="legend">Varients: </FormLabel>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={small} name="small" value="small" onChange={(e) => getValue(e)} />} label="Small" />
                        <FormControlLabel control={<Checkbox checked={medium} name="medium" value="medium" onChange={(e) => getValue(e)} />} label="Medium" />
                        <FormControlLabel control={<Checkbox checked={large} name="large" value="large" onChange={(e) => getValue(e)} />} label="Large" />
                    </FormGroup>
                </FormControl>

                <Box sx={{ mb: 2 }}>
                    <div>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            sx={{ ...style }}
                            endIcon={<SendIcon />}
                        >
                            {props.step === 2 ? 'Finish' : 'Next'}
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
                    </div>
                </Box>
            </form>
        </Container>
    )
}

export default connect(null, mapDispatchToProps) (AddVarient)
