import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';
import { getDatabase, ref, set, push, child, update, remove } from "firebase/database";

import { Grid } from '@mui/material';

import Container from '@mui/material/Container'



import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import Loading from '../../component/body/Loading';
import MenuItem from './MenuItem/MenuItem';



// accept state as a props from intial state 
const mapStateToProps = state => {

    return {
        //Inside Reducer dishes Pass two things , 1: isLoading Function 2: dishes array
        Dishes: state.dishes.dishes,
        dishLoading: state.dishes.isLoading,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
    }
}

const ManageMenu = props => {

    const [response, setResponse] = useState(false);
    const [responseText, setResponseText] = useState('')
    const [responseType, setResponseType] = useState('success')

    const [fetch, setFetch] = useState(false)

    const updateData = (id, oldData, updateData) => {
        //console.log(id, oldData, updateData)
        const db = getDatabase();
        const postData = oldData;

        update(ref(db, 'menus/' + id), {
            ...postData,
            name: updateData.name,
            price: [
                {
                    "small": updateData.small,
                    "medium": updateData.medium,
                    "large": updateData.large
                }
            ],
            label: updateData.label,
            description: updateData.description
        })
            .then(() => {
                // Data saved successfully!
                setResponse(true);
                setResponseType('success')
                console.log(postData, 'data updated succesfully')
                setResponseText('Data updated successfully')
                setFetch(!fetch);

                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((error) => {
                // The write failed...
                console.log(error)
                setResponse(true);
                setResponseType('error')
                setResponseText('Sorry ! Something Wrong.')

            });
    }

    const deleteData = id => {
        //console.log(id)
        const db = getDatabase();
        remove(ref(db, 'menus/' + id))
            .then(() => {
                setResponse(true);
                setResponseType('success')
                setResponseText('Data Deleted successfully')
                setFetch(!fetch);

                setTimeout(() => {
                    setResponse(false)
                }, 2000)
            })
            .catch((error) => {
                // The write failed...
                console.log(error)
                setResponse(true);
                setResponseType('error')
                setResponseText('Sorry ! Something Wrong.')

            });
    }




    //Runs on the first render
    //And any time any dependency value changes
    useEffect(() => {
        //console.log(fetch)
        //console.log(props)
        props.fetchDishes()
    }, [fetch]);


    if (props.dishLoading) {
        return (
            <Container maxWidth='xl'>
                <Grid container spacing={2} sx={{ my: 5 }}>
                    <Loading />
                </Grid>
            </Container >
        )
    } else {
        //console.log(this.props.Dishes); 
        const menu = props.Dishes.map(item => {
            return (
                <MenuItem
                    key={item.id}
                    item={item}
                    remove={deleteData}
                    update={updateData}
                />
            );
        })
        return (
            <Container maxWidth="xl">
                {/* <Button variant="contained" color="primary" onClick={() => addData()}>
                    Post Data
                </Button> */}
                <Collapse in={response}>
                    <Alert severity={responseType} sx={{ mt: 3 }}>{responseText}</Alert>
                </Collapse>
                <Grid container spacing={2} sx={{ my: 5 }}>
                    {menu}
                </Grid>

            </Container>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMenu)
