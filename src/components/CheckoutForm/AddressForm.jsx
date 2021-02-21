import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';

import FormInput from './CostumTextField';


const AddressForm = ({checkoutToken}) => {
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState({});

    const methods = useForm();

    const fetchShippingOptions = async (checkoutTokenId) => {
        const { options } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingOptions(options)
    }

    useEffect(() => {
        fetchShippingOptions(checkoutToken.id);
    })

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit='' >
                    <Grid container spacing={3} >
                        <FormInput required name='lastName' label='Vezetéknév' />
                        <FormInput required name='firstName' label='Keresztnév' />
                        <FormInput required name='address1' label='Cím' />
                        <FormInput required name='email' label='Email cím' />
                        <FormInput required name='city' label='Város' />
                        <FormInput required name='zip' label='Irányítószám' />
                        <Grid item xs={12} sm={6} >
                            {/*<InputLabel>Szállítási mód</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select 
                                </MenuItem>
                            </Select>*/}
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
