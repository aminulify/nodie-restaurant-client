import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../Componenets/SectionTItle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import UseCarts from '../../CustomHook/UseCarts';

//  TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_STRIPE_PK);

const Payment = () => {
    //***  get data from passing state inside Link tag 
    // const location = useLocation();
    // const total = location.state;

    const [cart, refetch] = UseCarts(); 
    const total = cart.reduce((sum,item)=> sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    

    return (
        <div className='w-[90%] bg-white py-20 h-screen'>

            <Helmet>
                <title>Nodie Cods | Pay</title>
            </Helmet>

            <SectionTitle heading="Payment" subHeading="-- Please Process --"></SectionTitle>

            {/* used from stripe github example documentation  */}
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} cart={cart} refetch={refetch}></CheckoutForm>
            </Elements>
            
        </div>
    );
};

export default Payment;