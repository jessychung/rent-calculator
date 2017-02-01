const rentData = [
    {
        city: 'Toronto',
        province: 'on',
        avgRent: 1468
    },
    {
        city: 'Vancouver',
        province: 'bc',
        avgRent: 1959
    },
    {
        city: 'Ottawa',
        province: 'on',
        avgRent: 1163
    },
    {
        city: 'Edmonton',
        province: 'al',
        avgRent: 946
    },
    {
        city: 'Regina',
        province: 'sa',
        avgRent: 990
    },
    {
        city: 'Calgary',
        province: 'al',
        avgRent: 1031
    },
    {
        city: 'Montreal',
        province: 'qe',
        avgRent: 1001
    },
    {
        city: 'Winnipeg',
        province: 'mb',
        avgRent: 897
    }
];

const taxRate = [
    {
        province: 'al',
        bracket: {
            low: {
                from: 0,
                to: 125000,
                rate: 10
            },
            med: {
                from: 125001,
                to: 150000,
                rate: 12
            },
            high: {
                from: 150001,
                to: 200000,
                rate: 13
            }
        }
    },
    {
        province: 'on',
        bracket: {
            low: {
                from: 0,
                to: 41536,
                rate: 5.05
            },
            med: {
                from: 41537,
                to: 83075,
                rate: 9.15
            },
            high: {
                from: 83076,
                to: 150000,
                rate: 11.16
            }
        }
    }
];

var province;
var incomeF;
var incomeP;
var aftertaxIncome;
var rentMoney;
var BestCityinfo;
var resultCity;
var RentMonies;
var selectedCity;
var selectedCityText;
var largest = 0;


function getProvince(selectedProvince) {
    province = selectedProvince.value;
}

function limitChar(numbers) {

    if(numbers.value.length >= 6) {
        numbers.value = numbers.value.substr(0, 6);
    }
}

function validateForm() {
    selectedCity = document.getElementById("province");
    selectedCityText = selectedCity.options[selectedCity.selectedIndex].value;

    const nopro = selectedCity.options[selectedCity.selectedIndex].value;
    const noincome = document.getElementById('inputIncome').value;


    if(nopro == 0 || !noincome) {
        $('#myModal').modal('show');
    } else {
        const div = document.getElementById('results');
        const top = document.getElementById('top-div');

        top.style.marginBottom = "500px";
        div.style.display = "block";


        incomeF = parseFloat(document.getElementById('inputIncome').value);
        incomeP = parseFloat(document.getElementById('inputIncome').value);

        for(item in taxRate) {

            var getProvince = taxRate[item].province;

            if(province === getProvince) {

                var lowTo = taxRate[item].bracket.low.to;
                var medFrom = taxRate[item].bracket.med.from;
                var medTo = taxRate[item].bracket.med.to;
                var highFrom = taxRate[item].bracket.high.from;
                var highTo = taxRate[item].bracket.high.to;

                var lowRate = taxRate[item].bracket.low.rate;
                var medRate = taxRate[item].bracket.med.rate;
                var highRate = taxRate[item].bracket.high.rate;

                var fedTax;
                var provincialTax;

                //calc fed tax
                if(incomeF < 45282 ){

                    fedTax = (15/100) * incomeF;

                } else if(incomeF > 45282 && incomeF < 90563) {

                    var lowF = incomeF - 45282;
                    var medF = lowF * (20.5/100);

                    fedTax = (45282 * (15/100)) + medF;

                } else if(incomeF > 90536 && incomeF < 140388) {

                    var medLeftover = incomeF - 90536;
                    var highLeftover = medLeftover * (26/100);

                    fedTax = (45282 * (15/100)) + (45254 * (20.5/100)) + highLeftover;
                } else {
                    console.log('Woah! Why are you bothered to use this calculator?')
                }

                //calc provincial tax
                if(incomeP < lowTo ){

                    provincialTax = incomeP * (lowRate / 100);

                } else if (incomeP > medFrom && incomeP < medTo) {

                    var lowLeftover = incomeP - medFrom;
                    var medLeftover = lowLeftover * (medRate/100);
                    provincialTax = (lowTo * (lowRate/100)) + medLeftover;

                } else if (incomeP > highFrom && incomeP < highTo) {

                    var medLeftover = incomeP - highFrom;
                    var highLeftover = medLeftover * (highRate/100);
                    provincialTax = (lowTo * (lowRate/100)) + ((medTo - medFrom) * (medRate/100)) + highLeftover;
                } else {
                    console.log('Woah! Why are you bothered to use this calculator?')
                }


                aftertaxIncome = Math.round(incomeF - (provincialTax + fedTax));
                rentMoney = (aftertaxIncome / 12) * 0.33;

            }
        }


        for(item in rentData) {

            var getProvince = rentData[item].province;

            if(province === getProvince) {

                console.log(rentData[item].avgRent);

                if(rentMoney > rentData[item].avgRent) {
                    var count = rentMoney - rentData[item].avgRent;
                    if(largest < count) {
                        console.log('jjjjjj')
                    }
                } else {
                    console.log('not good')
                }

            }

        }


        BestCityinfo = document.getElementById('bestCityinfo');
        BestCityinfo.innerHTML = selectedCityText;

        resultCity = document.getElementById('bestCity');
        resultCity.innerHTML = selectedCityText;

        RentMonies = document.getElementById('rentMonies');
        RentMonies.innerHTML = '$' + Math.round(rentMoney);

        console.log(selectedCityText);
    }
}


