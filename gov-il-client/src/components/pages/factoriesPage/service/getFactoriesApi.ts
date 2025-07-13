import axios from "axios"
import factory from "../../../../types_def/factory.json"

const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=88d1883c-3b7a-4580-9be9-6d54659666c3"
type FactoryApi = typeof factory
export type FactoryClient = {
    id: number,
    "siteName": string,
    "siteNumber": number,
    "businessId": number,
    "district": string,
    "municipality": string,
    "siteCategory": string,
    "localAuthority": string,
    locationX: string,
    locationY: string,
}

export async function getFactoriesApi(limit: number): Promise<Array<Partial<FactoryClient>>> {
    const result = await axios.get<{ result: { records: Array<FactoryApi> } }>(`${url}&limit=${limit}`)
    const data = result?.data?.result?.records
    return data.map(f => {
        return {
            id: f._id,
            "siteName": f.Shem_Atar_Svivati,
            "siteNumber": f.Mispar_Atar,
            "businessId": f.Mispar_Mezahe,
            "localAuthority": f.Rashut_Mekomit,
        }
    })

}