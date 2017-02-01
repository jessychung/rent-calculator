const rentData = [
    {
        city: 'Toronto',
        rent: {
            bachelor: '$1,120',
            oneBed: '$1,468',
            twoBed: '$1,877'
        }
    },
    {
        city: 'Vancouver',
        rent: {
            bachelor: '$1,669',
            oneBed: '$1,959',
            twoBed: '$2,887'
        }
    },
    {
        city: 'Ottawa',
        rent: {
            bachelor: '$969',
            oneBed: '$1,163',
            twoBed: '$1,323'
        }
    },
    {
        city: 'Edmonton',
        rent: {
            bachelor: '$859',
            oneBed: '$946',
            twoBed: '$1,166'
        }
    },
    {
        city: 'Regina',
        rent: {
            bachelor: '$805',
            oneBed: '$990',
            twoBed: '$1,183'
        }
    },
    {
        city: 'Calgary',
        rent: {
            bachelor: '$1,047',
            oneBed: '$1,031',
            twoBed: '$1,194'
        }
    },
    {
        city: 'Montreal',
        rent: {
            bachelor: '$855',
            oneBed: '$1,001',
            twoBed: '$1,391'
        }
    },
    {
        city: 'Winnipeg',
        rent: {
            bachelor: '$701',
            oneBed: '$897',
            twoBed: '$1,095'
        }
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

function getProvince(selectedProvince) {
    province = selectedProvince.value;
}

function limitChar(numbers) {

    if(numbers.value.length >= 6) {
        numbers.value = numbers.value.substr(0, 6);
    }
}

function showResult() {
    const div = document.getElementById('results');
    const top = document.getElementById('top-div');

    top.style.marginBottom = "500px";
    div.style.display = "block";

    const selectedCity = document.getElementById("province");
    const selectedCityText = selectedCity.options[selectedCity.selectedIndex].text;

    const nopro = selectedCity.options[selectedCity.selectedIndex].value;

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
                console.log('low:' + fedTax)

            } else if(incomeF > 45282 && incomeF < 90563) {

                var lowF = incomeF - 45282;
                var medF = lowF * (20.5/100);

                fedTax = (45282 * (15/100)) + medF;
                console.log('med:' + fedTax)

            } else if(incomeF > 90536 && incomeF < 140388) {

                var medLeftover = incomeF - 90536;
                var highLeftover = medLeftover * (26/100);

                fedTax = (45282 * (15/100)) + (45254 * (20.5/100)) + highLeftover;
                console.log('high:' + fedTax);

            } else {
                console.log('Woah! Why are you bothered to use this calculator?')
            }

            //calc provincial tax
            if(incomeP < lowTo ){

                provincialTax = incomeP * (lowRate / 100);
                console.log('low:' + provincialTax);

            } else if (incomeP > medFrom && incomeP < medTo) {

                var lowLeftover = incomeP - medFrom;
                var medLeftover = lowLeftover * (medRate/100);
                provincialTax = (lowTo * (lowRate/100)) + medLeftover;

                console.log('med:' + provincialTax);

            } else if (incomeP > highFrom && incomeP < highTo) {

                var medLeftover = incomeP - highFrom;
                var highLeftover = medLeftover * (highRate/100);
                provincialTax = (lowTo * (lowRate/100)) + ((medTo - medFrom) * (medRate/100)) + highLeftover;
                console.log('high:' + provincialTax);
            } else {
                console.log('Woah! Why are you bothered to use this calculator?')
            }


            aftertaxIncome = Math.round(incomeF - (provincialTax + fedTax));
            console.log('you after tax income:' + aftertaxIncome);

            rentMoney = (aftertaxIncome / 12) * 0.33;

            console.log('you should spend: $' + Math.round(rentMoney) + ' per month on rent');


        }
    }


    if( nopro == 0 ) {
        console.log('no province');
    }

    var resultCity = document.getElementById('bestCity');

    resultCity.innerHTML = selectedCityText;

    // document.querySelector('input[name="rate"]:checked').value;

}

