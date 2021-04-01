const storeVisitor = () => {
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then(res => res.text())
        .then((visitorData: String) => {
            fetch(`https://world-atlas-webgl-default-rtdb.firebaseio.com/${new Date().getTime()}.json`, {
                method: "POST",
                headers: {
                    "Application": "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({visitorData: visitorData, date: new Date()})
            })
                .then(res => res)
        });
};



export default storeVisitor;