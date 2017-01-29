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


function getValue(value) {
    console.log(value);
}

function addAnother() {
    document.getElementById('wrapper').innerHTML += '<span>Label: <input type="text"><small>(ft)</small></span>\r\n';
}



function showDiv() {
    const div = document.getElementById('results');
    const top = document.getElementById('top-div');

    top.style.marginBottom = "500px";
    div.style.display = "block";
}