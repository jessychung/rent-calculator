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
            low: 10,
            med: 12,
            high: 13
        }
    },
    {
        province: 'on',
        bracket: {
            low: 5.05,
            med: 9.15,
            high: 11.16
        }
    }
];

var province;
var income;
var tax;


function getProvince(selectedProvince) {
    province = selectedProvince.value;
}


function showResult() {
    const div = document.getElementById('results');
    const top = document.getElementById('top-div');

    top.style.marginBottom = "500px";
    div.style.display = "block";

    const selectedCity = document.getElementById("province");
    const selectedCityText = selectedCity.options[selectedCity.selectedIndex].text;

    const nopro = selectedCity.options[selectedCity.selectedIndex].value;

    income = parseFloat(document.getElementById('inputIncome').value);

    //get low med or high

    if(income < 45282){

    }

    for(item in taxRate) {
        var getProvince = taxRate[item].province;
        if(province === getProvince) {


            //calc fed tax
            var fedTax;
            if(income < 45282){
                fedTax = income * (15/100);
                console.log(fedTax)
            } else if(income > 45282 && income < 90563) {
                fedTax = income * (20.5/100);
                console.log(fedTax)
            } else {

            }

            //calc provincial tax
            tax = taxRate[item].bracket.low;
        }
    }

    var takeoff = income * tax/100;
    var aftertax = income - takeoff;

    console.log(aftertax);


    if( nopro == 0 ) {
        console.log('no province');
    }

    var resultCity = document.getElementById('bestCity');

    resultCity.innerHTML = selectedCityText;

    // document.querySelector('input[name="rate"]:checked').value;

}

