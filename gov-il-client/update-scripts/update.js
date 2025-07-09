import axios from "axios";
import fs from "fs";

const param = process.argv[2]

if(!param){
    throw new Error("Missing param")
}

const resourceMap = {
    "flight": "e83f763b-b7d7-479e-b172-ae981ddc6de5",
    "car": "053cea08-09bc-40ec-8f7a-156f0677aff3",
    "factory": "88d1883c-3b7a-4580-9be9-6d54659666c3"
}


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
