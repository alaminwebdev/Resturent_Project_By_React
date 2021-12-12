import React from 'react'
import { motion } from 'framer-motion';
import { Box } from '@mui/system';


//framer motion effect start
const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -500,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -500,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};
//framer motion effect end


const SlideImage = props => {

    const paginate = props.paginate ;
    const direction = props.custom ;

    return (
        <Box >
            <motion.img
                className="itemImage"
                key={props.src.id}
                width='100%'
                src={props.src.image}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", mass: 0.5 },
                    opacity: { duration: 0.8 }
                }}
                whileHover={{ scale: 1.05 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                    }
                }}

            />
        </Box>
    )
}

export default SlideImage
