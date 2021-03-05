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
            <table>
                <thead css={headerDiv}>
                    {arrayHeader.map((key, index) =>{
            return (
                    <th css={label}  key={index}>{key.toUpperCase()}</th>
            )
        })}
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
    }

    const headerDiv = css({
        backgroundColor: '#D5EBF5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        // padding: 10,
    })

    const label = css({
        padding: 10,
        border: '1px solid white',
    })