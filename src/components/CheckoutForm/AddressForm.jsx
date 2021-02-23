import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from "react-router-dom";

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';


const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState({});

    const methods = useForm();
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - ${sO.price.raw} Ft` }));
    
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country });
        console.log(country);
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        fetchShippingOptions(checkoutToken.id, shippingCountry);
    }, [shippingCountry]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingOption }))} >
                    <Grid container spacing={3} >
                        <FormInput name='lastName' label='Vezetéknév' />
                        <FormInput name='firstName' label='Keresztnév' />
                        <FormInput name='address1' label='Cím' />
                        <FormInput name='email' label='Email cím' />
                        <FormInput name='city' label='Város' />
                        <FormInput name='zip' label='Irányítószám' />

                        <Grid item xs={12} sm={6} >
                            <InputLabel>Szállítási mód</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}} >
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
