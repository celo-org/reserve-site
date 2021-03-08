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
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>
    )
    }

    const table = css ({
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })

    const headerDiv = css({
        fontFamily: 'EB Garamond',
        backgroundColor: '#D5EBF5',
        fontWeight: 'bold',
    })

    const label = css({
        // padding: 10,
        // display: 'flex',
        // width: 50,
        // height: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    })