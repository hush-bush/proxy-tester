    function checkProxy() {
        textarea = document.getElementsByTagName('textarea').item(0);
        button = document.getElementsByTagName('button').item(0);
        input = document.getElementsByTagName('input').item(0);

        let url = input.value;
        let form_proxies = textarea.value.split("\n");

        for (i in form_proxies){
            let all_proxies = form_proxies[i];      //i
            let proxy = `${all_proxies}`.split(":");

            let ip = proxy[0];
            let port = proxy[1];

            let request = require('request');
            let options = {
                url: `${url}`,
                proxy: `${"http://" + ip + ":" + port}`, // "http://208.207.241.249:65073"
                time: true
            };

            // проверка прокси на работоспособность
            let start = new Date();
            request.get(options, function tableFill(err, res) {
                let end = new Date() - start;
                if (res.statusCode == 200) {
                    console.log("Рабочая прокси: " + options.host + ":" + options.port + " " + res.statusCode + " " + end);
                    let table = document.getElementById("table").getElementsByTagName("tbody")[0];
                    let line = document.createElement("tr"); // создаем строку

                    let column1 = document.createElement("td");
                    column1.innerHTML = ip;
                    line.appendChild(column1);
            
                    let column2 = document.createElement("td");
                    column2.innerHTML = port;
                    line.appendChild(column2);

                    let column3 = document.createElement("td");
                    column3.innerHTML = res.statusCode;
                    line.appendChild(column3);            //res.statusCode
                    
                    let column4 = document.createElement("td");
                    column4.innerHTML = end + "ms";
                    line.appendChild(column4);

                    table.appendChild(line);  

                    } else {
                        console.log(res.statusCode);
                }
            });
        }
    }