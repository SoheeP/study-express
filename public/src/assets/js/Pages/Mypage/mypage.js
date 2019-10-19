console.log('mypage');


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ['0~4', '4~8', '8~12', '12~16', '16~20', '20~24'],
        datasets: [{
            label: '최근 로그인 기록',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [8, 10, 5, 2, 20, 30]
        }]
    },

    // Configuration options go here
    options: {}
});
var dounut = document.getElementById('dounut').getContext('2d');
var myPieChart = new Chart(dounut, {
  type: 'doughnut',
  data: {
    labels: ['0~4', '4~8', '8~12', '12~16', '16~20', '20~24'],
    datasets: [{
        label: '최근 로그인 기록',
        // backgroundColor: 'rgb(255, 99, 132)',
        // borderColor: 'rgb(255, 99, 132)',
        data: [8, 10, 5, 2, 20, 30]
    }]
},
});
