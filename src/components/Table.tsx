import { css } from '@emotion/core'
import useSWR from 'swr'
import { fetcher } from 'src/utils/fetcher'
import { Rebalancing } from 'src/service/Data'
import DollarDisplay from 'src/components/Amount'
{/* <DollarDisplay loading={isLoading} label="Liquidity" value={sumTotalHoldings(data)} /> */}
// new Intl.NumberFormat("en-US", {
//     style: "percent",
//     signDisplay: "exceptZero"
// }).format(0.55);
// // → '+55%'


export default function Table(){
    const { data }= useSWR<{value:Rebalancing[]}>("/api/history", fetcher);

    
    let arrayHeader = ["Quarter / Period", "BTC Δ", "CELO Δ", "ETH Δ", "DAI Δ", "Dollar Value"]
    
    return(
        <div css={root}>
            <table css={table}>
                <thead css={headerDiv}>
                    {arrayHeader.map((key, index) =>{    
                        return (
                            <th css={label}  key={index}>{key.toUpperCase()}</th>
                            )
                        })}
                </thead>

                <tbody>
                    {data?.value?.map((el) => {
                        if(Object.keys(el).length === 0){
                            return null
                        }else{
                            return (
                                <tr key={el.Period} css={tableBody}>
                                <td css={tableData}>{el['Period']}</td>
                                <td css={tableData}>{el['BTC Delta']}</td>
                                <td css={tableData}>{el['CELO Delta']}</td>
                                <td css={tableData}>{el['ETH Delta']}</td>
                                <td css={tableData}>{el['DAI Delta']}</td>
                                <td css={tableData}>{`$${Math.round(el['Dollar Value Start']).toLocaleString()}`}</td>
                            </tr>
                        )  
                    }
                        
                    })}
                </tbody>

            </table>
        </div>
    )
    }

    const root = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })

    const table = css ({
        borderSpacing: 0,
    })

    const headerDiv = css({
        fontFamily: 'EB Garamond',
        backgroundColor: '#D5EBF5',
        fontWeight: 'bold',
        height: 8
    })

    const tableBody = css({
        textAlign: 'center',
        background: '#F0F0F0'

    })
    
    const tableData = css({
        border: '1px solid white',
        padding: 8
    })

    const label = css({
        border: '1px solid white',
        padding: 8
    })