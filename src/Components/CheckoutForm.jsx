import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import "./CheckoutForm.css"

export default function CheckoutForm({ clientSecret, totalPrice, setNextPage, totalQuantity }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setSuccess(null);
    } else {
      // Payment succeeded!
      setSuccess(`Payment succeeded! PaymentIntent ID: ${paymentIntent.id}`);

      const payLoad = {
        paymentIntent: paymentIntent.id,
        paymentStatus: "success"
      }

      axios.post('http://localhost:2000/api/update-payment-status', payLoad , {
        headers: {
          'Authorization': token
        }
      })
        .then((response) => {
          setError(null);
          navigate('/product');
          toast.success("Product Ordered Successfully. Shop More >", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
          return;
        })
        .catch((error) => {
          console.log(error.message);
          return;
        })
    }
  };

  const handlBack = () => {
    setNextPage(false);
  }

  return (
    <Card className="p-4">
      <Card.Body>
        <h3 className="text-center mb-4">Payment</h3>
        <h4 className="text-center mb-4">Total Amount: {totalPrice}</h4>
        <h4 className="text-center mb-4">Total Item: {totalQuantity}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Card Details</Form.Label>
            <CardElement className="form-control" />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={!stripe}
            className="w-100 mb-2"
          >
            Pay
          </Button>
        </Form>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        <Button
          variant="secondary"
          onClick={handlBack}
          className="w-100 mt-3"
        >
          Back
        </Button>
      </Card.Body>
    </Card>


    


// {/* <div id="wrapper">
//   <div id="container3">

//     <div id="info">
      
//       <img id="product" src="http://enwaara.se/codepen/product.png"/>

//       <p>Activity Bracelet Surge</p>
//       <p>Black</p>

//       <div id="price">

//         <h2>$ 2 700</h2>

//       </div>
//     </div>

//     <div id="payment">

//       <form id="checkout">

//         <input class="card" id="visa" type="button" name="card" value=""/>
//         <input class="card" id="mastercard" type="button" name="card" value=""/>

//         <label>Credit Card Number</label>
//         <input id="cardnumber" type="text" pattern="[0-9]{13,16}" name="cardnumber" requierd="true" placeholder="0123-4567-8901-2345"/>

//         <label>Card Holder</label>
//        <input id="cardholder" type="text" name="name" requierd="true" maxlength="50" placeholder="Cardholder"/>

//         <label>Expiration Date</label>
//         <label id="cvc-label">CVC/CVV</label>
//         <div id="left">
//             <select name="month" id="month" onchange="" size="1">
//               <option value="00">MM</option>
//               <option value="01">01</option>
//               <option value="02">02</option>
//               <option value="03">03</option>
//               <option value="04">04</option>
//               <option value="05">05</option>
//               <option value="06">06</option>
//               <option value="07">07</option>
//               <option value="08">08</option>
//               <option value="09">09</option>
//               <option value="10">10</option>
//               <option value="11">11</option>
//               <option value="12">12</option>
//             </select>
//         <p>/</p>
//             <select name="year" id="year" onchange="" size="1">
//               <option value="00">YY</option>
//               <option value="01">16</option>
//               <option value="02">17</option>
//               <option value="03">18</option>
//               <option value="04">19</option>
//               <option value="05">20</option>
//               <option value="06">21</option>
//               <option value="07">22</option>
//               <option value="08">23</option>
//               <option value="09">24</option>
//               <option value="10">25</option>
//             </select>
//         </div>


//         <input id="cvc" type="text" placeholder="Cvc/Cvv" maxlength="3" />

//         <input class="btn" type="button" name="purchase" value="Purchase"/>
//       </form>
//     </div>

//   </div>
// </div> */}



  );
}


