import axios from "axios"
import type { CarType } from ".."
const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3"
export type CarClient = {
    lp: number,
    manufacturer: string,
    model: string,
    dateOfRelease: string,
    year: number
    color: string,
    lastTestDate: string
}
export async function getCarApi(lp: string): Promise<CarClient> {
    const result = await axios.get<{ result: { records: Array<CarType> } }>(`${url}&q=${lp}`)
    const [data] = result?.data?.result?.records
    return {
        lp: data.mispar_rechev,
        manufacturer: data.tozeret_nm,
        model: data.kinuy_mishari,
        dateOfRelease: data.moed_aliya_lakvish,
        year: data.shnat_yitzur,
        color: data.tzeva_rechev,
        lastTestDate: data.mivchan_acharon_dt
    }
}