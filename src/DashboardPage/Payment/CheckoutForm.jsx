import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import { MdOutlineContentCopy } from "react-icons/md";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './CheckoutForm.css';

const CheckoutForm = ({ price, cart, refetch }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(()=>{
        // if(price > 0){
            axiosSecure.post('/create-payment-intent', {price})
            .then(res => {
            // console.log('payment card',res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
        // }
    },[])

    const handleSubmit = async (event) => {
       event.preventDefault();

       if(!stripe || !elements){
        return
       }

       const card = elements.getElement(CardElement)

        if (card === null) {
        return;
        }
        
        // ** no need paymentMethod here right now
        // const {error, paymentMethod} = await stripe.createPaymentMethod({
        const {error} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if(error){
            console.log('error:', error);
            setCardError(error.message);
        }
        else{
            setCardError('')
            // console.log('PaymentMethod', paymentMethod)
        }


        setProcessing(true);
        // get from **stripe confirm card payment 
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous' 
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message);
            // console.log("confirm error",confirmError);
            setProcessing(false);
          }
          else{
            // console.log('payment intent',paymentIntent);

            setProcessing(false);
        //   recieved payment   
            switch (paymentIntent.status) {
              case "succeeded":
                
                  setTransactionId(paymentIntent.id);
                  //save payment information to the server
                  const payment = {
                    email: user?.email, 
                    transactionId: paymentIntent.id,
                    price,
                    data: new Date(),
                    quantity: cart.length,
                    orderStatus: 'service pending',
                    cardItems: cart.map(item=>item._id),
                    menuItems: cart.map(item=>item.menuItemId),
                    itemNames: cart.map(item=>item.name)
                    }
                   

                    axiosSecure.post('/payments', payment)
                    .then(res=>{
                        
                        console.log(res.data);
                        if(res.data.insertResult.insertedId && res.data.deleteResult.deletedCount){
                            
                            Swal.fire({
                                icon: "success",
                                title: "Payment succeeded!",
                                showConfirmButton: false,
                                timer: 1500
                              });
                              refetch();

                              
                        }
                    })
                break;
              case "processing":
                <Loading></Loading>
                break;
              case "requires_payment_method":
                Swal.fire({
                    icon: "error",
                    title: "Your payment was not successful, please try again.",
                    showConfirmButton: false,
                    timer: 1500
                  });
                break;
              default:
                Swal.fire({
                    icon: "warning",
                    title: "Something went wrong.",
                    showConfirmButton: false,
                    timer: 1500
                  });
                break;
            }
          }

          
        
        
    }
    return (
        <>
        <form className='m-10' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

          {/* card error  */}
        {
            cardError && <p className='text-red-600 pt-2 text-[12px]'>{cardError} Please try again.</p>
        }
        {
            transactionId && <p className='text-green-600 flex gap-2 pt-2 text-[12px]'>Congratulations! Transaction complete with transactionId: {transactionId} <button type="button" className='text-[14px] cursor-pointer'> <CopyToClipboard text={transactionId}>
            <MdOutlineContentCopy/>
        </CopyToClipboard></button>
            
            </p>
        }

        <button type="submit" className='my-3 py-1 px-3 bg-green-500 text-white rounded-sm' disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>

        { processing && <Loading></Loading>}
      </form>

      
      </>
    );
};

export default CheckoutForm;