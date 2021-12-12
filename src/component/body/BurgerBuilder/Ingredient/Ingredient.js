import React from 'react';
import { Box } from '@mui/system';

const firebaseImgUrl = process.env.REACT_APP_FIREBASE_STORAGE_LINK;
const firebaseStorageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

const BurgerTop = `${firebaseImgUrl}/v0/b/${firebaseStorageBucket}/o/ingredients%2Fburger-top.png?alt=media&token=e1bc063b-3b3e-4454-a7ca-c9ea13bf7061`;

const Salad = `${firebaseImgUrl}/v0/b/${firebaseStorageBucket}/o/ingredients%2Fburger-salad.png?alt=media&token=fd80ebb9-8dd7-4dc2-9b1f-e581cdfd7cd1`;

const Cheeese = `${firebaseImgUrl}/v0/b/${firebaseStorageBucket}/o/ingredients%2Fburger-cheese.png?alt=media&token=d53d027f-49a5-44fa-9e76-4f79a60ea14e`;

const Meat = `${firebaseImgUrl}/v0/b/${firebaseStorageBucket}/o/ingredients%2Fburger-meat.png?alt=media&token=b7da01cb-c5a4-4876-ad9b-8a05a545fdfd`;

const BurgerBottom = `${firebaseImgUrl}/v0/b/${firebaseStorageBucket}/o/ingredients%2Fburger-bottom.png?alt=media&token=a9495994-9c2f-489b-8fc8-6dbde4841a53`;

const Ingredient = props => {
    let ingredient = null;
    switch (props.type) {
        case 'burger-top':
            ingredient = <img src={BurgerTop} alt="BurgerTop" width='100%' />
            break;

        case 'burger-bottom':
            ingredient = <img src={BurgerBottom} alt="BurgerBottom" width='100%' />
            break;


        case 'salad':
            ingredient = <img src={Salad} alt="Salad" width='100%' />
            break;


        case 'cheese':
            ingredient = <img src={Cheeese} alt="Cheeese" width='100%' />
            break;


        case 'meat':
            ingredient = <img src={Meat} alt="Meat" width='100%' />
            break;

        default:
            ingredient = null
    }
    //console.log(baseUrl)

    return (
        <Box>
            {ingredient}
        </Box>

    )
}

export default Ingredient
