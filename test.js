const Chapa = require('chapa');
api='CHASECK_TEST-09aJXdfJy8Jujjxf5oGse9D6YsJRukIX'
let myChapa = new Chapa(api); // Replace with your actual secret key

const customerInfo =  {
    amount: '1000',
    currency: 'ETB',
    email: 'sara@mamo.com',
    first_name: 'sara',
    last_name: 'mamo',
    // tx_ref: 'tx-23456678',
    //  // if autoRef is set in the options we dont't need to provide reference, instead it will generate it for us
    callback_url: 'https://chapa.co', // your callback URL
    // customization: {
    //     title: 'I love e-commerce',
    //     description: 'It is time to pay'
    // }
};

// Wrap your async/await code in an async function
async function processChapaPayment() {
    try {
        // --- Using async/await for initialize ---

        console.log('Initializing payment with async/await...');
        let initializeResponse = await myChapa.initialize(customerInfo, { autoRef: true });
        if (initializeResponse.status === 'success') {
            console.log(initializeResponse.data.checkout_url);
        }
        console.log('Initialize Response:', initializeResponse);

        // You would typically use initializeResponse.data.checkout_url to redirect the user

        // --- Using async/await for verify ---
        // Note: You would verify after the customer has completed the payment,
        // typically in a callback route specified by callback_url
        
        // const transactionReferenceToVerify = initializeResponse.tx_ref || 'txn-reference'; // Use the generated ref or a known one
        // console.log(`Verifying transaction: ${transactionReferenceToVerify}`);


        // let verifyResponse = await myChapa.verify('tx-23456678');
        // console.log('Verify Response:', verifyResponse);

    } catch (e) {
        console.error('An error occurred:', e);
    }
}

// Call the async function to execute the code
processChapaPayment();

// You can still use the Promise-based approach if you prefer, but not alongside
// the top-level await that caused the error.
// myChapa.initialize(customerInfo, { autoRef: true }).then(response => {
//     console.log('Initialize Response (Promise):', response);
// }).catch(e => console.error('Initialize Error (Promise):', e));

// myChapa.verify('another-txn-reference').then(response => {
//     console.log('Verify Response (Promise):', response);
// }).catch(e => console.error('Verify Error (Promise):', e));