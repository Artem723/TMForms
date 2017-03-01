import React, { Component } from "react"
import Chart from 'chart.js'

export default class ResultBlock extends Component {
    componentDidMount() {
        //TODO initialize chart
        const ctx = document.getElementById("myChart"+ this.props.id);
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: false
            }
        });
    }
    render() {
        const {question, numOfAns, answers, data} = this.props;
        return (
            <div className="ResultBlock">
                <h1>
                    {question}{" "}
                    <span>Number of answers: {numOfAns}</span>
                </h1>
                <canvas id={"myChart"+ this.props.id} width="600" height="600"></canvas>
            </div>
        )
    }
}
ResultBlock.propTypes = {
    question: React.PropTypes.string.isRequired,
    numOfAns: React.PropTypes.number,
    answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    type: React.PropTypes.oneOf(["radio", "string", "check"]).isRequired 
} 