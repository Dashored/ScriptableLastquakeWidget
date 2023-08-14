
let quakes = await getEarthquakes()

if (config.runsInWidget) {
  let widget = new ListWidget()
  let titleElement = widget.addText("Latest Earthquake:")
  titleElement.font = Font.boldSystemFont(16)
  titleElement.textColor = Color.white()
  titleElement.minimumScaleFactor = 0.75
  
  quakes.split("\\n").forEach(e => widget.addText(e))
  
  Script.setWidget(widget)
  

}

else {
  console.log(  quakes.split("\\n").forEach(e => console.log(e))  );
}


function parseData(data) {
  return `Date: ${data[0]} ${data[1]}\\nMagnitude: ${data[5]}\\nLocation: ${data[data.length - 3]}${data[data.length - 2]}`
} 

async function getEarthquakes() {
  let url = "http://www.koeri.boun.edu.tr/scripts/lst4.asp"
  let req = new Request(url)
  let response = await req.loadString()
  let data = response.split("---------- --------  --------  -------   ----------    ------------    --------------                                  --------------")
  let elementsToRemove = ["", "-.-"];
  let parsed_data = data[1].split("\n").slice(0,20)
  let quakes = [];
  parsed_data.slice(1,30).forEach(element => {
    let quake = element.split(" ").filter(item => !elementsToRemove.includes(item))
    if (parseFloat(quake[5]) >= 3.0) {
      quakes.push( quake );

    }});

  return parseData(quakes[0])



  
}
