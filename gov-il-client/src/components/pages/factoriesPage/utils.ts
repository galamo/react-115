import type { FactoryClient } from "./service/getFactoriesApi";

type PieChartData = Array<{ id: number, label: string, value: number }>

export function getFactoriesReport(factories: Array<Partial<FactoryClient>>): PieChartData {
    const result = factories.reduce((acc, currentFactory) => {
        if (!currentFactory.localAuthority) return acc;
        if (acc[currentFactory.localAuthority]) {
            acc[currentFactory.localAuthority] += 1;
        } else {
            acc[currentFactory.localAuthority] = 1
        }

        return acc;
    }, {} as { [key: string]: number })

    return Object.entries(result).map(([key, value], index) => {
        return { id: index, value, label: key }
    })

}

