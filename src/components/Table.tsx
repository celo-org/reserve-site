import { css } from '@emotion/core'
import useSWR from 'swr'
import { fetcher } from 'src/utils/fetcher'
import { HoldingsApi } from 'src/service/holdings'
export default function Table(){
    const holdings = useSWR<HoldingsApi>("/api/holdings", fetcher);

    function renderBody(){

        return (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    }
    
    let arrayHeader = ["Quarter / Period", "BTC Δ", "CELO Δ", "ETH Δ", "DAI Δ", "Dollar Value"]
    
    return(
        <div>
            <table css={table}>
                <thead css={headerDiv}>
                    {arrayHeader.map((key, index) =>{    
                return (
                    <th css={label}  key={index}>{key.toUpperCase()}</th>
                )
                })}
                </thead>

                <tbody css={bodyDiv}>
                    {renderBody()}
                </tbody>

            </table>
        </div>
    )
    }

    const table = css ({
        borderSpacing: 0
    })

    const headerDiv = css({
        fontFamily: 'EB Garamond',
        backgroundColor: '#D5EBF5',
        fontWeight: 'bold',
        height: 10
    })
    
    const bodyDiv = css({
    })
    
    const label = css({
        border: '1px solid white',
        padding: 10
    })