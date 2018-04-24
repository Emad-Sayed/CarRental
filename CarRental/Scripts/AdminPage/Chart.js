function ChartDraw()
{
    var parent = document.getElementById("container");
    parent.innerHTML = "<canvas id=pieChart width=200 height=100></canvas>";
    var ctxP = document.getElementById("pieChart").getContext('2d');
        $.ajax({
        type: 'POST',
        url: '/Chart',
        success: function (data) {
            var myPieChart = new Chart(ctxP, {
                type: 'pie',
                data: {
                    labels: ["Avialble Cars "+data[0], "Rented Cars "+data[1], "Unavailable Cars "+data[2]],
                    datasets: [
                        {
                            data: [data[0], data[1], data[2]],
                            backgroundColor: ["#F7464A", "#46BFBD", "#4D5360"],
                            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1"]
                        }
                    ]

        }
    });
        },
        options: {
            responsive: true
        }
    });
}