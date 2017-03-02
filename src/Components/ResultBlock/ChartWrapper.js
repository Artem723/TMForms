import Chart from 'chart.js'
/**
* Function takes incoming data and returns Chart instance of pie or bar
* @param  {Object} ctx    {canvas element}
* @param  {string} type   {type of chart(bar or pie)}
* @param  {Array} labels {labels of chart}
* @param  {Array} data   {data of chart}
* @return {Object} {instance of chart}
*/
export default function (ctx, type, labels, data) {
    const COLORS = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ];
    let options;
    if (type === "bar") {
        options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
    else options = {};
    const colors = labels.map((el, ind) => {
        const len = COLORS.length;
        return COLORS[ ind % len ];
    })
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor:colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: options
    });
}