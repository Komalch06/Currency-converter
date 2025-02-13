const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

//Array to populates the select tags with these countries
const countries = [
    {code: "USD", name: "United States Dollar"},
    {code: "INR", name: "Indian Rupee"},
    {code: "KRW", name: "South Korean Won"},
    {code: "MXN", name: "Mexican Peso"},
    {code: "MYR", name: "Malaysian ringgit"},
    {code: "NZD", name: "New zealand Dollar"},
    {code: "PEN", name: "Peruvian Sol"},
    {code: "VND", name: "Vietnames Dong"},
    {code: "TWD", name: "Taiwan New Dollar"},
    {code: "TRY", name: "Turkish Lira"},
    {code: "THB", name: "Thai Bhat"},
    {code: "SGD", name: "Singapore Dollar"},
    {code: "SEK", name: "Swedish Krona"},
    {code: "RUB", name: "Russian Ruble"}

];

//Showing countries from array to select tag
countries.forEach(country =>{
    const option1 =  document.createElement('option');
    const option2 =  document.createElement('option');
    
    option1.value = option2.value = country.code;
    option1.textContent =   option2.textContent= `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    //setting default values
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value ="INR";
});


//function to get exchange rate using API
const getExchangeRate = async () =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching ExchangeRate.....";
    
    try{
    //fetch data from API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate);

    if(typeof conversionRate === 'undefined'){
        resultElement.textContent = "Exchange rate data is not available or selected Countries!!!";
        convertedAmountElement.value = "";
    }
    else{
        convertedAmountElement.value = convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }

    }
    catch(error){
          converterContainer.innerHTML = `<h2>Error while fetching exchange rates!!!</h2>`; 
       }
}

//Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input',getExchangeRate);

//Fetching exchange rate when user change currency

fromCurrencyElement.addEventListener('change',getExchangeRate);
toCurrencyElement.addEventListener('change',getExchangeRate);

window.addEventListener('load',getExchangeRate);