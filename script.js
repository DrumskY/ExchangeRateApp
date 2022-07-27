const currencyOne = document.querySelector('#currency-one')
const amountOne = document.querySelector('.amount-one')
const currencyTwo = document.querySelector('#currency-two')
const amountTwo = document.querySelector('.amount-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

const calculate = () => {
    fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
    .then(res => res.json())
    .then(data => {
        const currencyNumOne = currencyOne.value;
        const currencyNumTwo = currencyTwo.value;

        const rate = data.rates[currencyNumTwo];
        rateInfo.textContent = `1 ${currencyNumOne} = ${rate.toFixed(4)} ${currencyNumTwo}`;

        amountTwo.value = (amountOne.value * rate).toFixed(2);
    }) 
}
const changeValue = () => {
    const oldValue = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = oldValue;
    calculate();
}
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', changeValue);
calculate();