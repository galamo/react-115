import axios from "axios";
import fs from "fs";

const param = process.argv[2]

if(!param){
    throw new Error("Missing param")
}

const resourceMap = {
    "flight": "e83f763b-b7d7-479e-b172-ae981ddc6de5",
    "car": "053cea08-09bc-40ec-8f7a-156f0677aff3",
    "ca": "053cea08-09bc-40ec-8f7a-156f0677aff3"
}

// https://data.gov.il/api/3/action/datastore_search?resource_id=8935c8e5-ec77-421f-af86-d970583195f8&limit=5

updateModel(resourceMap[param])

async function updateModel(resourcePath){
 const getModel = await axios.get(
    `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourcePath}&limit=1`
  );
  console.log(getModel?.data?.result?.records?.[0]);
  writeJsonToFile(getModel?.data?.result?.records?.[0], param)
}


function writeJsonToFile(jsonData,model) {
  const filePath = `./src/types_def/${model}.json`
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      console.log('JSON file was written successfully to', filePath);
    }
  });
}
