let dropdown = document.querySelectorAll(".dropdown-box select");
let getBtn = document.querySelector("#bttn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let mssg = document.querySelector("#mssg")




// for(codes in countryList ){
//     console.log(codes,countryList[codes]);
// }
setInitialrate =async () => {
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json`;
    let rate = await fetch(URL);
    let data = await rate.json();
    let FinalRate = data[toCurr.value.toLowerCase()];
    mssg.innerText = `1 USD = ${FinalRate} INR`;
};

for(let select of dropdown){
    for(codes in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = codes ;
        newOption.value = codes;
        

        if(select.name === "from" && codes === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && codes === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })

    setInitialrate();
}

const updateFlag = (event) => {
    let currency = event.value;
    let country = countryList[currency];

    let img = event.parentElement.querySelector("img");
    console.log(currency,country);
    img.src = `https://flagsapi.com/${country}/flat/64.png`;
}


getBtn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".input-Amount input");
    let amt = amount.value;
    if(amt < 0 || amt === ""){
        amt = 1;
        amount.value = 1;
    }


    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let rate = await fetch(URL);
    let data = await rate.json();
    let FinalRate = data[toCurr.value.toLowerCase()];
    console.log(data[toCurr.value.toLowerCase()]);

    let finalAmt = amt*FinalRate;
    mssg.innerText = `${amt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

})
