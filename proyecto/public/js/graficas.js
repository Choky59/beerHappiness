document.addEventListener('DOMContentLoaded', function () {

    var beerData = JSON.parse(dataset);
    console.log(beerData)

    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart', 'bar'] });

    firebase.database().ref('countries').once("value", (snapshot) => {

        google.charts.setOnLoadCallback(happinessChart);
        google.charts.setOnLoadCallback(beerCapita);
        google.charts.setOnLoadCallback(alcoholConsumption);
        google.charts.setOnLoadCallback(scatterChart1);
        google.charts.setOnLoadCallback(scatterChart2);
        // google.charts.setOnLoadCallback(drawChart);


        // google.charts.setOnLoadCallback(pieChart);


        Object.entries(snapshot.val()).forEach(([key, value]) => {
            let currentCountry = [key, value['HappinessScore'] * 100, value['Beer_PerCapita'], value["GDP_PerCapita"] + value["Spirit_PerCapita"] + value["Wine_PerCapita"]]
            structured_data.push(currentCountry)
            structured_scatter1.push([value['Beer_PerCapita'], value['HappinessScore']])
            structured_scatter2.push([value['Spirit_PerCapita'] + value['Wine_PerCapita'] + value['GDP_PerCapita'], value['HappinessScore']])
            if (zonas[value["Region"]]) {
                const promedio = (zonas[value["Region"]].paises * zonas[value["Region"]].promedio + value["HappinessScore"]) / (zonas[value["Region"]].paises + 1)
                zonas[value["Region"]].paises++
                zonas[value["Region"]].promedio = promedio;
            } else {
                zonas[value["Region"]] = {
                    paises: 1,
                    promedio: value["HappinessScore"]
                };
            }
        })


        Object.entries(zonas).forEach(([key, value]) => {
            let aux = [key, parseFloat(value.promedio)]
            structured_zones.push(aux)

        })
    })
    // Set a callback to run when the Google Visualization API is loaded.
    let structured_data = [['Country', 'Happiness Score', "Beer per capita", "Alcohol consumption"]];
    let structured_zones = []
    let structured_scatter1 = [['Beer per capita', 'Happiness']]
    let structured_scatter2 = [["Alcohol consumption", 'Happiness']]
    
    let zonas = {}

    // grafica de Happiness vs. Beer per capita
    function scatterChart1() {
        var data = google.visualization.arrayToDataTable(structured_scatter1);

        var options = {
            title: 'Happiness vs. Beer per capita',
            hAxis: { title: 'Beer per capita', minValue: 2, maxValue: 8 },
            vAxis: { title: 'Happiness', minValue: 0, maxValue: 8 },
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('scatter1'));

        chart.draw(data, options);
    }
    // grafica Happiness vs. alcohol consumption

    function scatterChart2() {
        var data = google.visualization.arrayToDataTable(structured_scatter2);

        var options = {
            title: 'Happiness vs. alcohol consumption',
            hAxis: { title: 'Alcohol consumption', minValue: 2, maxValue: 8 },
            vAxis: { title: 'Happiness', minValue: 0, maxValue: 8 },
            legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('scatter2'));

        chart.draw(data, options);
    }
    // alcohol consumption
    function alcoholConsumption() {
        structured_data.sort((a, b) => {
            return b[3] - a[3]
        })

        var data = google.visualization.arrayToDataTable(structured_data.slice(0, 10));

        var options = {
            chart: {
                title: 'Top 10 countries by alcohol consumption',
                hAxis: {
                    direction: -1,
                    slantedText: true,
                    textPosition: "out",
                    slantedTextAngle: 45 // here you can even use 180
                }
            },

        };
        var chart = new google.charts.Bar(document.getElementById('consumptionChart'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    // Beer per capita
    function beerCapita() {
        structured_data.sort((a, b) => {
            return b[2] - a[2]
        })

        var data = google.visualization.arrayToDataTable(structured_data.slice(0, 10));

        var options = {
            chart: {
                title: 'Top 10 countries by beer per capita',


                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
            legend: { position: 'bottom' }
        };
        var chart = new google.charts.Bar(document.getElementById('beerChart'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    // grafica de barras
    function happinessChart() {
        structured_data.sort((a, b) => {
            return b[1] - a[1]
        })

        var data = google.visualization.arrayToDataTable(structured_data.slice(0, 10));

        var options = {
            chart: {
                title: 'Top 10 countries by happiness level',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            },
            hAxis: { direction: -1, slantedText: true, slantedTextAngle: 90 }

        };
        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
    // grafica de lineas
    function lineChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);

        var options = {
            title: 'Company Performance',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }



    try {
        let app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    } catch (e) {
        console.error(e);
    }




});



