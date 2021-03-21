function saveWorking() {
    let proxylist = [];
    let table_len = document.getElementById("table").getElementsByTagName("tbody")[0].rows.length-1
    for (let i=1; i<=table_len; i++) {
        cell1 = String(document.getElementById("table").getElementsByTagName("tbody")[0].rows[i].cells[0].innerHTML)
        cell2 = String(document.getElementById("table").getElementsByTagName("tbody")[0].rows[i].cells[1].innerHTML)
        console.log(cell1, cell2);
        
        proxylist[i] = cell1 + ":" + cell2 + "\n";
    }

    //alert(proxylist);
    // let new_str = proxylist.toString().replaceAll(",", "");
    // alert(new_str);

    let uniq_proxylist = Array.from(new Set(proxylist)).toString().replaceAll(",", "");
    //alert(uniq_proxylist);
    const fs = require('fs');
    if (proxylist.length != 0){
        fs.writeFile("./proxylist.txt", uniq_proxylist, (err) => {   //.toString().replace(",", "")
            if(err){
                console.log(err);
            } else{
                console.log("proxy added");
            }
        });
    } else {
        alert("Нет прокси для сохранения")
    }
};