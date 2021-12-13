import React, { useState } from "react";
import { baseUrl } from "../../../../redux/actionCreators";
import Varients from "./Varients";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const DishItem = (props) => {
    const [imgExist, setImgExist] = useState(true);
    //console.log(props);
    const loading = props.loading;
    const dishes = props.dishes;
    const price = props.dishes.price[0];
    //let vari = null;

    const checkImage = (imgUrl) => {
        var image = new Image();
        image.onload = function () {
            if (this.width > 0) {
                //console.log("image exists");
                setImgExist(true);
            }
        };
        image.onerror = function () {
            //console.log("image doesn't exist");
            setImgExist(false);
        };
        image.src = imgUrl;
    };

    //console.log(price)
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={
                        imgExist
                            ? dishes.image
                            : "http://placehold.jp/300x300.png"
                    }
                    alt="burger"
                    onError={checkImage(dishes.image)}
                />

                <CardContent sx={{ pb: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={props.DishSelect}
                    >
                        {dishes.name.length > 20
                            ? dishes.name.substring(0, 20) + "..."
                            : dishes.name}
                    </Typography>
                    <Varients
                        varients={dishes.varients}
                        price={price}
                        dishID={dishes.id}
                        dishItem={dishes.name}
                    />
                </CardContent>

                {/* <CardActions>
                    <ReviewIcon rating={dishes.rating} />
                </CardActions> */}
            </Card>
        </Grid>
    );
};

export default DishItem;
