import React from 'react';
import { Typography, Button, Card, CardActions, CardCOntent, CardMedia, CardContent} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({item, handleRemoveFromCart /*, handleUpdateCartQty */}) => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.raw} Ft</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons} >
                    {/*<Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>    PLUSZ MINUSZ GOMB*/} 
                    <Typography>Kosárban: {item.quantity}</Typography>
                    {/*<Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>    PLUSZ MINUSZ GOMB*/}
                </div>
                <Button bariant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
