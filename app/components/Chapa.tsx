import React from 'react'

interface CustomerInfo {
  email: string;
  fname: string;
  lname: string;
  totalPriceFromStore: number;
}

function Chapa({ fname, lname, email, totalPriceFromStore }: CustomerInfo) {
  // Ensure customerInfo is passed correctly and contains the required fields
  const public_key = process.env.NEXT_PUBLIC_CHAPA_KEY;
  const homeUrl = "http://localhost:3000/";  
  return (
    <div><form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value={public_key} />
    <input type="hidden" name="tx_ref" value={Date.now()} />
    <input type="hidden" name="amount" value={totalPriceFromStore} />
    <input type="hidden" name="currency" value='ETB' />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value={fname} />
    <input type="hidden" name="last_name" value={lname} />
    <input type="hidden" name="title" value="Thanks for Booking with Chapa" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    {/* <input type="hidden" name="callback_url" value="http://localhost:3000/" /> */}
    {/* <input type="hidden" name="return_url" value={homeUrl} /> */}
    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit">Pay Now</button>
</form></div>
  )
}

export default Chapa