const electron = require('electron');
const {ipcRenderer} = electron;

ipcRenderer.on('Graphic:metadata', (event, proxylist) => {
        //console.log(proxylist, "RECIEVED");
        //ipcRenderer.createAddWindow();
        // if (proxylist.length - 1 == 0){
            console.log(proxylist.length-1)

            let proxy = [];
            let proxy_label = [];
            let proxy_data = [];

            for (let i = 0; i<proxylist.length-1; i++){
                proxy[i] = proxylist[i+1].split(":");   // spliting proxylist to ip port && ping
            }
            console.log(proxy);

            for (let i = 0; i<proxy.length; i++){       // getting only ping of proxy to proxy_label
                proxy_label[i] = proxy[i][2].slice(0,-2);   // removing MS
                proxy_data[i] = proxy[i][0]
            }

            console.log(proxy_label, proxy_data)

            var ctx = document.getElementById('myChart').getContext('2d');

            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: proxy_data,
                    datasets: [{
                        label: 'Скорость в мс',
                        backgroundColor: 'rgb(170,223,250)',
                        borderColor: 'rgb(103,103,103)',
                        data: proxy_label
                    }]
                },

                // Configuration options go here
                options: {}
            });
        // } else {
        //     alert("Отсутствуют прокси для построения графика");
        // }
    })

    //alert(proxylist)
