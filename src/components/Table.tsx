import { css } from '@emotion/core'
export default function Table(){
    
    
    
    const renderBody = () =>{
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
        // border: '3px solid black'
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
        // justifyContent: 'center',
        // alignItems: 'center'
    })